import { askLine, askYesNo, askSelectOne, askForUrl, show, html } from "../main/standard_slides.js"

const convertLink = (link)=> {
    // "https://cdn.jsdelivr.net/gh/jeff-hykin/tutorializer@master/virkshop/tutorialize.js"
    const urlObject = new URL(window.location.origin)
    urlObject.searchParams.append('_', JSON.stringify({url: link}))
    return `${urlObject}`
}

// Tutorials to create:
    // How to add images to a tutorial (github hack)
    // Downloading a repo
    // Installing WSL
        // Windows 10
        // Windows 11
    // Installing Ubuntu for WSL
    // Running command inside WSL
    // Running a command line command
    // Running a powershell script
    // Installing git
    // Cloning a repo
    // Installing Deno
    // Running a Fornix project
    // Connecting SSH

export const Tutorial = async ({Tutorializer, slide}) => {
    
    const firstChoice = await slide(
        askSelectOne({
            question: html`
                <title>Howdy!</title>
                <text>
                    So I don't see a URL to another tutorial, so this is a tutorial on how to set one up
                    <br>
                    All I need is a link to a JavaScript file
                </text>
                <br>
            `,
            options: [
                "I haven't made a JavaScript file yet",
                "I made the JavaScript file, but not a link",
                "I have a link",
            ]
        })
    )
    
    // 
    // has a link
    // 
    if (firstChoice == "I have a link") {

        const theLink = await slide(
            askForUrl({
                question: html`
                    <title>Great!</title>
                    <text>What's the link?</text>
                `,
            })
        )
        
        const convertedUrl = convertLink(theLink)

        const slideWasShown = await slide(
            show(html`
                <title>${`Here's your URL!`}</title>
                
                <code>
                    ${convertedUrl}
                </code>

                <text>
                    ${`If it doesn't work, its probably because of CORS.`}
                    <br>
                    ${`When I get a chance, I'll write about some options of how to get around that problem.`}
                </text>
            ` )
        )
    // 
    // has File
    // 
    } else if (firstChoice == "I made the JavaScript file, but not a link") {
        const slideWasShown = await slide(
            show(html`
                <text>
                    Sorry! Haven't finished this tutorial yet
                </text>
            ` )
        )
    
    // 
    // Needs full tutorial
    // 
    } else { // "I haven't made a JavaScript file yet"
        
    }
    
    // const confirmed = await slide(
    //     askYesNo({
    //         question: html`
    //             <span>So is this the url to your profile?</span>
    //             <br>
    //             <a href=${`https://github.com/${githubUsername}`}>
    //                 https://github.com/${githubUsername}
    //             </a>
    //             <br>
    //             <br>
    //         `,
    //     })
    // )

    // const osChoice = await slide(
    //     askSelectOne({
    //         question: html`
    //             <title>What OS are you using?</title>
    //         `,
    //         options: [
    //             "Linux",
    //             "MacOS",
    //             "Android",
    //             "iOS",
    //             "Redox",
    //             "ChromeOS",
    //             "OpenBSD",
    //             "Ubuntu Mobile",
    //             "Fuchsia",
    //             "Solaris",
    //             "Temple OS",
    //             "Samsung Tizen",
    //             "Windows",
    //         ]
    //     })
    // )

}

export const theme = {
    
}