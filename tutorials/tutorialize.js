export const tutorializerSymbol = Symbol.for("tutorializer")
export const Tutorializer = window[tutorializerSymbol] = {
    get data() {
        return Object.fromEntries([...Tutorializer.progressData, Object.entries(Tutorializer.pendingData) ].flat(1))
    },
    has(id) {
        return id in Tutorializer.data
    },
    add(id, value) {
        Tutorializer.pendingData[id] = value
    },
    pendingData: {},
    progressData: [],
    eventTypes: {
        next: "tutorializer:next",
        back: "tutorializer:back",
    },
    main: null,
    show(...elements) {
        Tutorializer.main.style.opacity = 0
        setTimeout(()=>{
            Tutorializer.main.children = elements
            Tutorializer.main.style.opacity = 1
        }, 600)
    },
    loadTutorial: null,
    nextClicked() {
        if (Object.keys(Tutorializer.pendingData).length) {
            Tutorializer.progressData.push(Object.entries(Tutorializer.pendingData))
            Tutorializer.pendingData = {}
        }
        window.dispatchEvent(new CustomEvent(Tutorializer.eventTypes.next))
    },
    backClicked() {
        const previous = Tutorializer.progressData.pop()
        Tutorializer.pendingData = {}
        // cancel all the previous ones
        window.dispatchEvent(new CustomEvent(Tutorializer.eventTypes.back))
        Tutorializer.loadTutorial()
    },
    async nextWasClicked() {
        return new Promise((resolve, reject)=>{
            let resolved = false
            let rejected = false
            let cleanup
            const resolveListener = ()=>{
                if (rejected) {
                    return
                } else {
                    resolved = true
                    resolve()
                    cleanup()
                }
            }
            const rejectListener = ()=>{
                if (resolved) {
                    return
                } else {
                    rejected = true
                    reject()
                    cleanup()
                }
            }
            cleanup = ()=>{
                window.removeEventListener(Tutorializer.eventTypes.next, resolveListener)
                window.removeEventListener(Tutorializer.eventTypes.back, rejectListener)
            }
            window.addEventListener(Tutorializer.eventTypes.next, resolveListener)
            window.addEventListener(Tutorializer.eventTypes.back, rejectListener)
        })
    }
}

const createTitle = (text)=>{
    const header = document.createElement("h1")
    header.style = `
        font-size: 32px;
        padding: 1rem;
        text-decoration: underline;
    `
    header.innerHTML = text;
    return header
}
const createBody = (text)=>{
    const textElement = document.createElement("span")
    textElement.style = `
        padding: 2rem;
    `
    textElement.innerHTML = text
    return textElement
}

async function showText({id, title, body}) {
    if (Tutorializer.has(id)) { return Tutorializer.data[id] }
    Tutorializer.show(createTitle(title), createBody(body))
    await Tutorializer.nextWasClicked()
    Tutorializer.data[id] = true // data was shown
    return Tutorializer.data[id]
}

async function askLine({id, question}) {
    if (Tutorializer.has(id)) { return Tutorializer.data[id] }
    const container = document.createElement("div")
    container.style = `
        display: flex;
        flex-direction: column;
    `
    const inputElement = document.createElement("input")
    inputElement.oninput = ()=>{
        Tutorializer.add(id, inputElement.value)
    }
    container.appendChild(createBody(question))
    container.appendChild(inputElement)
    Tutorializer.show(container)
    await Tutorializer.nextWasClicked()
    return Tutorializer.data[id]
}

export const onLoad = async (progressData) => {
    await askLine({ id: "githubUsername", question: "Whats the github username for the repository?" })
    await showText({ id: "readSummary", title: `What This Does`, body: `Testing testing` })
}