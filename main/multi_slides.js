import { html } from "./element_helpers.js"

// 
// actual tutorializer components
// 
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
}