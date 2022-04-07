import { askLine, showText } from "../main/standard_slides.js"

export const Tutorial = async ({Tutorializer, slide}) => {
    await slide("githubUsername", askLine({ question: "Whats the github username for the repository?" }))
    await slide("didReadSummary", showText({ title: `What This Does`, body: `Testing testing` }))
}

export const theme = {
    
}