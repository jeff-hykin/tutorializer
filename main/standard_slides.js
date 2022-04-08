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
export const showText = ({title, body})=>({value, Tutorializer})=>({
    loadSlide: ()=>{
        Tutorializer.content = html`<container>
            <title>
                ${title}
            </title>
            <text>
                ${body}
            </text>
        </container>`
    },
    valueIsValid: (value)=>true,
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

export const askLine = ({question, createErrorMessage})=>({value, Tutorializer})=>({
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
            <text>
                ${question}
            </text>
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