import { html } from "https://cdn.skypack.dev/@!!!!!/elemental@0.0.13"
import { text, title, container, input } from "./element_helpers.js"
import { Tutorializer } from "./tutorialize.js"

const html = pureHtml.extend({ text, title, container, input })

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
                oninput=${({target})=>value.set(target.value)}
                />
        </container>`
    },
    valueIsValid: (value)=>typeof value == 'string' && value.length > 0,
    ifValueInvalid: ()=> {
        // change GUI if there is a problem
    },
})