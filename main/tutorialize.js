import { html } from "https://cdn.skypack.dev/@!!!!!/elemental@0.0.13"
import { allKeys, merge } from "https://deno.land/x/good@0.5.4/object.js"
import { toRepresentation } from "https://deno.land/x/good@0.5.4/string.js"
import { Event, trigger, everyTime, once } from "https://deno.land/x/good@0.5.4/events.js"

import { Tutorial as defaultTutorial } from "../tutorials/get_tutorializer_url.js"
import { theme as defaultTheme } from "./default_theme.js"

// future features maybe/probably
    // "I know how to do X" saved to local storage
    // saving/editing settings
    //   - letting the user pick their own theme for all tutorials
    // bug reporting link that is always present
    // Error GUI

globalThis.allKeys = allKeys

export const tutorializerSymbol = Symbol.for("tutorializer")
export const GoingBackDontMindMeException = class extends Error {}

export class TutorializerClass {
    constructor() {
        this.pendingData = {}
        this.progressData = []
        this.tutorial = defaultTutorial
        this.main = html`
            <div class="tutorialize-main" >
                Howdy!
            </div>
        `
        this.element = null
        this.events = {
            attemptGoingToNext: new Event(),
            goingBack: new Event(),
        }
        this._style = document.createElement("style")
        this._theme = defaultTheme
    }
    get data() {
        return Object.fromEntries([...this.progressData, Object.entries(this.pendingData) ].flat(1))
    }
    has(id) {
        console.log(`start:has()`)
        return id in this.data
    }
    add(id, value) {
        this.pendingData[id] = value
    }
    get content() {
        return this.main
    }
    set content(element) {
        console.log(`start:set content`)
        console.debug(`this.progressData is:`,toRepresentation(this.progressData))
        console.debug(`this.pendingData is:`,this.pendingData)
        this.main.style.opacity = 0
        // there's a better way to do this using this.main.animate()... I should do that later
        setTimeout(()=>{
            this.main.children = [ element ]
            this.main.style.opacity = 1
        }, this.theme.settings.slideFadeInMiliseconds)
    }
    get theme() {
        return this._theme
    }
    set theme(newTheme) {
        // sanity check
        if (!(newTheme instanceof Object) || typeof newTheme.name !== 'string' || typeof newTheme.styles !== 'string') {
            throw Error(`I was creating a theme, I expected an object like {name:"blah", styles: ".thing { color: red: }" }\nHowever, instead I got this: ${toRepresentation(newTheme)}`)
        }
        const { name, styles, settings } = newTheme
        this._theme = newTheme
        this._style.innerHTML = styles
        // encase any of the settings were not set, recursively overwrite default settings with any that are mentioned
        if (settings instanceof Object) {
            this._theme.settings = merge({
                oldData: defaultTheme.settings,
                newData: settings,
            })
        }
    }
    async slide(id, func) {
        console.log(`start:slide(id=${id})`)
        if (this.has(id)) { return this.data[id] }
        let realValue = undefined
        const value = {
            get: ()=>realValue,
            set: (value)=>{
                realValue=value
                this.add(id, realValue)
            },
        }
        const slide = await func({value, Tutorializer: this})
        console.debug(`slide is:`,slide)
        console.debug(`slide.loadSlide is:`,slide.loadSlide)
        await slide.loadSlide()
        while (true) {
            // TODO: add error handling here
            await once(this.events.attemptGoingToNext)
            if (await slide.valueIsValid(realValue)) {
                break
            }
        }
        this.add(id, realValue)
        this.savePendingData() // TODO: this can be simplified, since originally it was designed for multiple id's
        return realValue
    }
    listenOnce(eventType, listener) {
        const realListener = async (eventObject)=>{
            if (await listener(eventObject)) {
                this.content.removeEventListener(eventType, realListener)
            }
        }
        once(this.events.goingBack).then(()=>{
            this.content.removeEventListener(eventType, realListener)
        })
        this.content.addEventListener(eventType, realListener)
    }
    async intializeWholeWebpage() {
        console.log(`start:intializeWholeWebpage()`)
        document.head.innerHTML += `
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <link rel="stylesheet" href="https://unpkg.com/css-baseline/css/3.css">
        `
        // attach the styles (part of theme)
        document.head.appendChild(this._style)
        // TODO; add a loader/spinner here
        // parse the URL to figure out what tutorial/theme to load
        const { default: router } = await import("https://cdn.skypack.dev/quik-router")
        const givenUrl = router.pageInfo.url
        if (givenUrl) {
            await this.getDataFromUrl(givenUrl)
        }
        // set theme (will either init the default theme or the one from the URL)
        this.theme = this._theme
        this.runTutorial()
        // then load the webpage
        document.body = html`<body
            style=${{
                display:        "flex", 
                alignItems:     "flex-start", 
                justifyContent: "flex-start",
                overflow:       "hidden",
                fontFamily:     "sans-serif",
                flexDirection:  "column",
                height:         "100%",
            }}>
                ${this.createElement()}
        </body>`
    }
    async getDataFromUrl(url) {
        try {
            var { Tutorial, theme } = await import(url)
        } catch (err) {
            var error = err
        }
        
        // 
        // try setting the theme (asap)
        // 
        if (theme) {
            this._theme = theme
        }

        // 
        // setup the tutorial
        // 
        if (Tutorial instanceof Function) {
            // Connect the tutorial (needed for re-running and going-back)
            this.tutorial = Tutorial
        } else {
            console.error(`The Tutorial wasnt a function: ${Tutorial}`)
            // FIXME: add graphical error message
        }
    }
    async runTutorial() {
        // reset events
        this.events = {
            attemptGoingToNext: new Event(),
            goingBack: new Event(),
        }
        console.log(`start:runTutorial()`)
        try {
            console.log(`start:tutorial()`)
            let counter = 0
            await this.tutorial({Tutorializer: this, slide: (slideFunction)=>this.slide(`${++counter}`, slideFunction)})
            return this.data
        } catch (error) {
            // if not just going back
            if (!(error instanceof GoingBackDontMindMeException)) {
                // FIXME: add graphical error message
                throw error
            }
        }
    }
    createElement() {
        console.log(`start:createElement()`)
        return this.element = html`<div class="tutorialize-root">
            ${this.main}
            <div class="tutorialize-container-of-arrow-buttons">
                <a class="tutorialize-arrow-buttons" onclick=${(...args)=>this.goBack(...args)}>
                    Back
                </a>
                <a class="tutorialize-arrow-buttons" onclick=${(...args)=>this.goNext(...args)}>
                    Next
                </a>
            </div>
        </div>`
    }
    savePendingData() {
        console.log("savePendingData")
        console.debug(`this.pendingData is:`,this.pendingData)
        if (Object.keys(this.pendingData).length) {
            this.progressData.push(Object.entries(this.pendingData))
            this.pendingData = {}
        }
    }
    async goNext() {
        console.log("goNext")
        trigger(this.events.attemptGoingToNext)
    }
    async goBack() {
        console.log(`going back`)
        console.debug(`   progressData Before:`, toRepresentation(this.progressData))
        console.debug(`   pendingData  Before:`, toRepresentation(this.pendingData))
        if (this.progressData.length > 0) {
            const previous = this.progressData.pop()
        }
        this.pendingData = {}
        console.debug(`   progressData After:`, toRepresentation(this.progressData))
        console.debug(`   pendingData  After:`, toRepresentation(this.pendingData))
        // cancel all the previous ones
        trigger(this.events.goingBack)
        await this.runTutorial()
    }
}

export const Tutorializer = globalThis[tutorializerSymbol] = new TutorializerClass()