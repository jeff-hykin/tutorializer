import { html } from "https://cdn.skypack.dev/@!!!!!/elemental@0.0.13"

// 
// all of theses should be theme-able (or thats the idea)
// 

const title = ({style, children, ...props})=>html`<h1 class="tutorialize-title">
    ${children}
</h1>`

const text = ({style, children, ...props})=>html`<span class="tutorializer-text">
    ${children}
</span>`

const container = ({style, children, ...props})=>html`<div
    style=${{display: "flex",flexDirection: "column"}}
    >
        ${children}
</div>`

const input = ({style, children, ...props})=>html`<div class="tutorialize-input" ...${props}>
</div>`


// TODO: slide
// TODO: error