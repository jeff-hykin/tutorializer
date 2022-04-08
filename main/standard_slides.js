// import { html as pureHtml } from "https://cdn.skypack.dev/@!!!!!/elemental@0.0.13"
import { html as pureHtml } from "./elemental.js"
import { text, title, container, input } from "./element_helpers.js"
import { Tutorializer } from "./tutorialize.js"

export const html = pureHtml.extend({ text, title, container, input })

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
    ifValueInvalid: ()=> {}, // change GUI if there is a problem
})

export const askLine = ({question})=>({value, Tutorializer})=>({
    loadSlide: ()=>{
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
        </container>`
    },
    valueIsValid: (value)=>{
        console.debug(`value is:`,value)
        console.debug(`typeof value == 'string' is:`,typeof value == 'string')
        console.debug(`value.length > 0 is:`,value.length > 0)
        return typeof value == 'string' && value.length > 0
    },
    ifValueInvalid: ()=> {
        // change GUI if there is a problem
    },
})