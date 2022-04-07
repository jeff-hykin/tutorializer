import { html } from "https://cdn.skypack.dev/@!!!!!/elemental@0.0.13"
import { recursivelyAllKeysOf, get, set, remove, merge } from "https://deno.land/x/good@0.5.1/object.js"
import { Tutorial as defaultTutorial } from "../tutorials/get_tutorializer_url.js"
import { theme as defaultTheme } from "./default_theme.js"

export const tutorializerSymbol = Symbol.for("tutorializer")
export const GoingBackDontMindMeException = class extends Exception {}
export const Tutorializer = globalThis[tutorializerSymbol] = {
    pendingData: {},
    progressData: [],
    loadTutorial: defaultTutorial,
    main: html`
        <main class="tutorialize-main" >
            Howdy!
        </main>
    `,
    element: null,
    eventTypes: {
        next: "tutorializer:next",
        back: "tutorializer:back",
    },
    _style: document.createElement("style"),
    _theme: defaultTheme,
    defaultTheme,
    get data() {
        return Object.fromEntries([...Tutorializer.progressData, Object.entries(Tutorializer.pendingData) ].flat(1))
    },
    has(id) {
        return id in Tutorializer.data
    },
    add(id, value) {
        Tutorializer.pendingData[id] = value
    },
    get content() {
        return Tutorializer.main.children
    },
    set content(element) {
        Tutorializer.main.style.opacity = 0
        // there's a better way to do this using Tutorializer.main.animate()... I should do that later
        setTimeout(()=>{
            Tutorializer.main.children = [ element ]
            Tutorializer.main.style.opacity = 1
        }, Tutorializer.theme.settings.slideFadeInMiliseconds)
    },
    get theme() {
        return this._theme
    },
    set theme(newTheme) {
        // sanity check
        if (!(newTheme instanceof Object) || typeof newTheme.name !== 'string' || typeof newTheme.style !== 'string') {
            throw Error(`was creating a theme, I expected an object like {name:"blah", styles: ".thing { color: red: }" }\nHowever, instead I got this: ${newTheme}`)
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
    },
    async slide(id, func, ...args) {
        if (Tutorializer.has(id)) { return Tutorializer.data[id] }
        await func.apply({id}, args)
        await Tutorializer.nextWasClicked()
        Tutorializer.data[id] = true // data was shown
        return Tutorializer.data[id]
    },
    async intializeWholeWebpage() {
        document.head.innerHTML += `<link rel="stylesheet" href="https://unpkg.com/css-baseline/css/3.css">`
        // attach the styles (part of theme)
        document.head.appendChild(Tutorializer._style)
        // TODO; add a loader/spinner here
        // parse the URL to figure out what tutorial/theme to load
        const { default: router } = await import("https://cdn.skypack.dev/quik-router")
        const givenUrl = router.pageInfo.url
        if (givenUrl) {
            await Tutorializer.loadFromUrl(givenUrl)
        }
        // load the webpage
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
                ${Tutorializer.createElement()}
        </body>`
    },
    async loadFromUrl(url) {
        try {
            var { Tutorial, theme } = await import(url)
        } catch (err) {
            var error = err
        }
        
        // 
        // try setting the theme (asap)
        // 
        if (theme) {
            Tutorializer.theme = theme
        } else {
            Tutorializer.theme = Tutorializer.defaultTheme
        }

        // 
        // setup the tutorial
        // 
        if (Tutorial instanceof Function) {
            // Connect the tutorial (needed for re-running and going-back)
            Tutorializer.loadTutorial = Tutorial
            // Run the 
            try {
                await Tutorializer.loadTutorial({Tutorializer, slide: Tutorializer.slide})
            } catch (error) {
                // if not just going back
                if (!(error instanceof GoingBackDontMindMeException)) {
                    // FIXME: add graphical error message
                    throw error
                }
            }
        } else {
            // FIXME: add graphical error message
        }
    },
    createElement() {
        return Tutorializer.element = html`<div class="tutorialize-root">
            ${Tutorializer.main}
            <div class="tutorialize-container-of-arrow-buttons">
                <a class="tutorialize-arrow-buttons" onclick=${Tutorializer.goBack}>
                    Back
                </a>
                <a class="tutorialize-arrow-buttons" onclick=${Tutorializer.goNext}>
                    Next
                </a>
            </div>
        </div>`
    },
    async goNext() {
        if (Object.keys(Tutorializer.pendingData).length) {
            Tutorializer.progressData.push(Object.entries(Tutorializer.pendingData))
            Tutorializer.pendingData = {}
        }
        window.dispatchEvent(new CustomEvent(Tutorializer.eventTypes.next))
    },
    async goBack() {
        const previous = Tutorializer.progressData.pop()
        Tutorializer.pendingData = {}
        // cancel all the previous ones
        window.dispatchEvent(new CustomEvent(Tutorializer.eventTypes.back))
        try {
            await Tutorializer.loadTutorial({Tutorializer, slide: Tutorial.slide})
        } catch (error) {
            // if its a "real" error message
            if (!(error instanceof GoingBackDontMindMeException)) {
                // FIXME: create a graphical error
                throw error
            }
        }
    },
    async nextWasClicked() {
        return new Promise((resolve, reject)=>{
            let resolved = false
            let rejected = false
            let cleanup
            const resolveListener = ()=>{
                if (rejected) {
                    return
                } else {
                    resolved = true
                    resolve()
                    cleanup()
                }
            }
            const rejectListener = ()=>{
                if (resolved) {
                    return
                } else {
                    rejected = true
                    reject(new GoingBackDontMindMeException())
                    cleanup()
                }
            }
            cleanup = ()=>{
                window.removeEventListener(Tutorializer.eventTypes.next, resolveListener)
                window.removeEventListener(Tutorializer.eventTypes.back, rejectListener)
            }
            window.addEventListener(Tutorializer.eventTypes.next, resolveListener)
            window.addEventListener(Tutorializer.eventTypes.back, rejectListener)
        })
    },
}