// import { html as pureHtml } from "https://cdn.skypack.dev/@!!!!!/elemental@0.0.13"
import { html as pureHtml } from "./elemental.js"
import { text, title, container, input, errorText } from "./element_helpers.js"
import { Tutorializer } from "./tutorialize.js"

export const html = pureHtml.extend({ text, title, container, input, errorText })

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

export const askLine = ({question, createErrorMessage})=>({value, Tutorializer})=>({
    loadSlide() {
        this.errorMessageElement = html`<errorText style=${{textAlign: "center"}}/>`
        
        Tutorializer.content = html`<container>
            <text>
                ${question}
            </text>
            <input
                onkeyup=${({key, target})=>{
                    value.set(target.value)
                    if (key=="Enter") {
                        Tutorializer.goNext()
                    }
                }}
                />
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