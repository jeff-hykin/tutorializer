import { askLine, askYesNo, showText, html } from "../main/standard_slides.js"


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
    console.debug(`githubUsername is:`,githubUsername)
    
    const confirmed = await slide("confirmedGithub",
        askYesNo({
            question: html`
                <span>So is this the url to your profile?</span>
                <br>
                <a href=${`https://github.com/${githubUsername}`}>
                    https://github.com/${githubUsername}
                </a>
                <br>
                <br>
            `,
        })
    )
    console.debug(`confirmed is:`,confirmed)

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
    console.debug(`slide1WasRead is:`,slide1WasRead)
    
    const slide2WasRead = await slide("didReadSummary2",
        showText({ title: `What This Does`, body: `Testing testing` })
    )
    console.debug(`slide2WasRead is:`,slide2WasRead)
}

export const theme = {
    
}