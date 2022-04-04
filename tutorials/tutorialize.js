export const tutorializerSymbol = Symbol.for("tutorializer")
export const Tutorializer = window[tutorializerSymbol] = {
    get data() {
        return Object.fromEntries([...Tutorializer.progressData, Tutorializer.pendingData ].flat(1))
    },
    has(id) {
        return id in Tutorializer.data
    },
    add(id, value) {
        Tutorializer.pendingData.push([id, value])
    },
    pendingData: [],
    progressData: [],
    eventTypes: {
        next: "tutorializer:next",
    },
    show(...elements) {
        document.body.children = elements
    }
}
async function nextClicked() {
    return new Promise((resolve, reject)=>{
        let listener = ()=>{
            resolve()
            window.removeEventListener(Tutorializer.eventTypes.next, listener)
        }
        window.addEventListener(Tutorializer.eventTypes.next, listener)
    })
}

const createTitle = (text)=>{
    const header = document.createElement("h1")
    header.style = {
        fontSize: "45px",
        padding: "1rem",
    }
    return header
}

async function askLine({id, question}) {
    if (Tutorializer.has(id)) { return Tutorializer.data[id] }
    Tutorializer.show()
}



export const onLoad = (progressData) => {
    await askLine({ id: "githubUsername", "Whats the github username for the repository?" })
}