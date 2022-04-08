import { askLine, showText, html } from "../main/standard_slides.js"


export const Tutorial = async ({Tutorializer, slide}) => {
    
    const githubUsername = await slide("githubUsername",
        askLine({
            question: "Whats the github username for the repository?",
            createErrorMessage: (value)=>{
                if (value.match(/ /)) {
                    return `Sorry, github usernames can't have spaces`
                }
            }
        })
    )
    
    const slide1WasRead = await slide("didReadSummary1",
        showText({
            title: `Confirmation Check`,
            body: html`
                <span>So is this the url to your profile?</span>
                <a href=${`https://github.com/${githubUsername}`}>
                    https://github.com/${githubUsername}
                </a>
            ` 
        })
    )
    
    const slide2WasRead = await slide("didReadSummary2",
        showText({ title: `What This Does`, body: `Testing testing` })
    )
}

export const theme = {
    
}