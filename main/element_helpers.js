// this jank is because I'm using an old version of Parcel.js that can't handle URL imports
import { html } from "./elemental.js"

// 
// all of theses should be theme-able (or thats the idea)
// 

export const title = ({style, children, ...props})=>html`<h1 class="tutorialize-title">
    ${children}
</h1>`

export const text = ({style, children, ...props})=>html`<span class="tutorialize-text">
    ${children}
</span>`

export const errorText = ({children, ...props})=>html`<span class="tutorialize-text tutorialize-error-text" ...${props}>
    ${children}
</span>`

export const container = ({style, children, ...props})=>html`<div
    style=${{display: "flex",flexDirection: "column", ...style}}
    ...${props}
    >
        ${children}
</div>`

export const input = ({style, children, ...props})=>html`<input class="tutorialize-input" ...${props} />`

// TODO: error