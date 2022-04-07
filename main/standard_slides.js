import { html } from "https://cdn.skypack.dev/@!!!!!/elemental@0.0.13"
import { text, title, container, input } from "./element_helpers.js"
import { Tutorializer } from "./tutorialize.js"

const html = pureHtml.extend({ text, title, container, input })

// 
// actual tutorializer components
// 
export async function showText({title, body}) {
    Tutorializer.content = html`<container>
        <title>
            ${title}
        </title>
        <text>
            ${body}
        </text>
    </container>`
}

export async function askLine({question}) {
    console.debug(`this.id is:`,this.id)
    Tutorializer.content = html`<container>
        <text>
            ${question}
        </text>
        <input
            oninput=${({target})=>Tutorializer.add(this.id, target.value)}
            />
    </container>`
}