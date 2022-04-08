import { html } from "https://cdn.skypack.dev/@!!!!!/elemental@0.0.13"
import { allKeys, merge } from "https://deno.land/x/good@0.5.4/object.js"
import { toRepresentation } from "https://deno.land/x/good@0.5.4/string.js"
import { Event, trigger, everyTime, once } from "https://deno.land/x/good@0.5.4/events.js"

import { Tutorial as defaultTutorial } from "../tutorials/get_tutorializer_url.js"
import { theme as defaultTheme } from "./default_theme.js"

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
        return this.main.children
    }
    set content(element) {
        console.log(`start:set content`)
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
        console.log(`start:slide`)
        console.debug(`this is:`,this)
        console.debug(`Tutorializer is:`,Tutorializer)
        if (this.has(id)) { return this.data[id] }
        let realValue = undefined
        const value = {
            get: ()=>realValue,
            set: (value)=>{
                realValue=value
                this.add(id, realValue)
            },
        }
        const { loadSlide, valueIsValid, ifValueInvalid } = await func({value, Tutorializer: this})
        await loadSlide()
        while (true) {
            console.debug(`slide, this.events is:`,this.events)
            await once(this.events.attemptGoingToNext)
            console.debug(`valueIsValid(realValue) is:`,valueIsValid(realValue))
            if (await valueIsValid(realValue)) {
                break
            } else {
                await ifValueInvalid(realValue)
            }
        }
        this.add(id, realValue)
        this.savePendingData() // TODO: this can be simplified, since originally it was designed for multiple id's
        return realValue
    }
    async intializeWholeWebpage() {
        console.log(`start:intializeWholeWebpage()`)
        document.head.innerHTML += `<link rel="stylesheet" href="https://unpkg.com/css-baseline/css/3.css">`
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
        console.log(`start:runTutorial()`)
        try {
            console.log(`start:tutorial()`)
            await this.tutorial({Tutorializer: this, slide: this.slide.bind(this)})
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
        console.debug(`this is:`,this)
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
        if (Object.keys(this.pendingData).length) {
            this.progressData.push(Object.entries(this.pendingData))
            this.pendingData = {}
        }
    }
    async goNext() {
        trigger(this.events.attemptGoingToNext)
    }
    async goBack() {
        if (this.progressData.length > 0) {
            const previous = this.progressData.pop()
        }
        this.pendingData = {}
        // cancel all the previous ones
        trigger(this.events.goingBack)
        await this.runTutorial()
    }
}

export const Tutorializer = globalThis[tutorializerSymbol] = new TutorializerClass()