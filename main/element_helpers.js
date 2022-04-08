import { html } from "https://cdn.skypack.dev/@!!!!!/elemental@0.0.13"

// 
// all of theses should be theme-able (or thats the idea)
// 

export const br = ()=>html`<br style="height: 1rem;" />`

export const title = ({children, ...props})=>html`<h1 class="tutorialize-title" ...${props}>
    ${children}
</h1>`

export const text = ({children, ...props})=>html`<span class="tutorialize-text" ...${props}>
    ${children}
</span>`

export const errorText = ({children, ...props})=>html`<span class="tutorialize-text tutorialize-error-text" ...${props}>
    ${children}
</span>`

export const hint = ({children, ...props})=>html`<span class="tutorialize-hint" ...${props}>
    ${children}
</span>`

export const button = ({children, ...props})=>html`<button class="tutorialize-button" ...${props}>
    ${children}
</button>`

export const container = ({style, children, ...props})=>html`<div
    style=${{display: "flex", flexDirection: "column", width: "100%", ...style}}
    ...${props}
    >
        ${children}
</div>`

export const input = ({style, children, ...props})=>html`<input class="tutorialize-input" ...${props} />`

// TODO: error

const newHtml = html.extend({ text, button, br, title, container, input, errorText, hint })
export {
    newHtml as html
}