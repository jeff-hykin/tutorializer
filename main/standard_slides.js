import { html } from "./element_helpers.js"

export {
    html as html
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
                <button onclick=${()=>(value.set(true),Tutorializer.goNext())} style=${`--button-accent: var(--button-no-color)`}>
                    no
                </button>
            </container>
            <hint>
                (you can type "y" or "n" to answer faster)
            </hint>
        </container>`
        var listener
        window.addEventListener("keydown", listener=({key})=>{
            if (key == "y" || key === "Y") {
                value.set(true)
                Tutorializer.goNext()
                window.removeEventListener("keydown", listener)
            }
            if (key == "n" || key === "N") {
                value.set(false)
                Tutorializer.goNext()
                window.removeEventListener("keydown", listener)
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
                autofocus
                onkeyup=${({key, target})=>{
                    value.set(target.value)
                    if (key=="Enter") {
                        Tutorializer.goNext()
                    }
                }}
                />
        `
        setTimeout(()=>input.focus(), 0) // autofocus on the input

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