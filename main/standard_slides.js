import { html, input } from "./element_helpers.js"
import { Event, trigger, everyTime, once } from "https://deno.land/x/good@0.5.4/events.js"

export {
    html as html
}

const autoFocus  = (element) => {
    window.focused = element
    element.setAttribute("tabindex", "-1")
    setTimeout(()=>element.focus(), 0)
    setTimeout(()=>element.focus(), 100)
    setTimeout(()=>element.focus(), 200)
}

// 
// actual tutorializer components
// 
export const show = (stringOrElement)=>({value, Tutorializer})=>({
    loadSlide: ()=>{
        value.set(true) // mark as read immediately
        console.debug(`stringOrElement is:`,stringOrElement)
        if (typeof stringOrElement == 'string') {
            Tutorializer.content = html`${string}`
        } else {
            Tutorializer.content = stringOrElement
        }
    },
    valueIsValid: (value)=>true,
})

export const askLine = ({question, createErrorMessage=()=>null})=>({value, Tutorializer})=>({
    loadSlide() {
        this.errorMessageElement = html`<errorText style=${{textAlign: "center"}}/>`
        const input = html`
            <input
                onkeyup=${({key, target})=>{
                    value.set(target.value)
                    if (key=="Enter") {
                        Tutorializer.goNext()
                    }
                }}
                />
        `
        autoFocus(input)

        Tutorializer.content = html`<container>
            ${question}
            ${input}
            <container style=${{height: "3rem", overflow:"visible"}}>
                ${this.errorMessageElement}
            </container>
        </container>`
    },
    async valueIsValid(value) {
        const errorMessage = await createErrorMessage(value||"")
        if (!errorMessage) {
            return true
        } else {
            this.errorMessageElement.innerHTML = errorMessage
            return false
        }
    },
})

export const askYesNo = ({question})=>({value, Tutorializer})=>({
    loadSlide() {
        Tutorializer.content = html`<container>
            ${question}
            
            <container style=${{gap:"1rem"}}>
                <button onclick=${()=>(value.set(true),Tutorializer.goNext())} style=${`--button-accent: var(--button-yes-color)`}>
                    yes
                </button>
                <button onclick=${()=>(value.set(false),Tutorializer.goNext())} style=${`--button-accent: var(--button-no-color)`}>
                    no
                </button>
            </container>
            <hint>
                (you can type "y" or "n" to answer faster)
            </hint>
        </container>`
        autoFocus(Tutorializer.content)
        // if keydown yes/no
        Tutorializer.listenOnce("keydown", (eventObject)=>{
            const { key } = eventObject
            if (key == "y" || key === "Y") {
                event.stopPropagation()
                value.set(true)
                Tutorializer.goNext()
                return true // done
            }
            if (key == "n" || key === "N") {
                event.stopPropagation()
                value.set(false)
                Tutorializer.goNext()
                return true // done
            }
        })
    },
    valueIsValid(value) {
        return value === true || value === false
    },
})

export const askSelectOne = ({question, options})=>({value, Tutorializer})=>({
    loadSlide() {

        Tutorializer.content = html`<container>
            ${question}
            
            <container style=${{gap:"1rem"}}>
                ${options.map(eachOption=>(
                    html`
                        <button onclick=${()=>(value.set(eachOption),Tutorializer.goNext())}>
                            ${eachOption}
                        </button>
                    `
                ))}
            </container>
            
        </container>`
        // TODO: allow using arrow keys to select
        autoFocus(Tutorializer.content)
        // if keydown yes/no
        Tutorializer.listenOnce("keydown", (eventObject)=>{
            // const { key } = eventObject
            // if (key == "y" || key === "Y") {
            //     event.stopPropagation()
            //     value.set(true)
            //     Tutorializer.goNext()
            //     return true // done
            // }
            // if (key == "n" || key === "N") {
            //     event.stopPropagation()
            //     value.set(false)
            //     Tutorializer.goNext()
            //     return true // done
            // }
        })
    },
    valueIsValid(value) {
        return value
    },
})

export const askForUrl = ({question})=>(...args)=>{
    console.debug(`question is:`,question)
    function isValidHttpUrl(string) {
        try {
            const url = new URL(string);
            return url.protocol === "http:" || url.protocol === "https:"
        } catch (_) {}
        return false
    }
    // just asking for a line that needs to be a valid URL
    return askLine({
        question,
        createErrorMessage:(value)=>{
            if (isValidHttpUrl(value)) {
                return // no error message
            } else {
                return `Input needs to be a valid URL to work`
            }
        },
    })(...args)
}