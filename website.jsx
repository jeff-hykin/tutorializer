import {Tutorializer, onLoad} from "./tutorials/tutorialize.js"

// TODO: create a tutorial (using tutorialize) that generates the tutorialize URL for someone's repo
    // DONE: next functionality
    // DONE: back functionality
    // DONE: create an askLine() function
    // DONE: create an showText() function

;((async ()=>{
    document.head.innerHTML += `<link rel="stylesheet" href="https://unpkg.com/css-baseline/css/3.css">`
    const { default: router } = await import('https://cdn.skypack.dev/quik-router')
    window.router = router // debugging

    // await router.goTo({ url: "https://cdn.jsdelivr.net/gh/jeff-hykin/tutorializer@master/virkshop/tutorialize.js" })
    
    Tutorializer.loadTutorial = onLoad // debugging, normally it'll come from a url
    if (router.pageInfo.url) {
        try {
            // var {onLoad} = await import(router.pageInfo.url)
        } catch (error) {
            // FIXME: add error message
        }
    }
    
    const bottomRowHeight = "7rem"
    document.body = <body
        style={`
            display: flex; 
            align-items: flex-start; 
            justify-content: flex-start;
            overflow: hidden;
            font-family: sans-serif;
            font-size: 22px;
            color: gray;
            flex-direction: column;
            height: 100%;
            background: whitesmoke;
        `}
        >
        <style>{`
            :root {
                --blue: cornflowerblue;
            }
            input {
                background: transparent;
                border-radius: 0;
                border: none;
                border-bottom: 1px solid gray;
                color: gray;
                outline: none;
                transition: all 0.5s ease-in-out 0s;
            }
            .tutorialize-directional-buttons {
                display: flex; 
                align-items: center; 
                justify-content: center;
                font-size: 25px; 
                height: 100%;
                flex-grow: 1;
                transition: all 0.5s ease-in-out 0s;
                color: var(--blue);
                text-decoration: underline;
                background: white;
                border: 2px lightgray solid;
                margin-left: -2px;
            }
            .tutorialize-directional-buttons:hover {
                border: 2px var(--blue) solid;
                z-index: 1;
            }
        `}</style>
        {Tutorializer.main = <main
            style={`
                display: flex; 
                align-items: center; 
                justify-content: center;
                transition: all 0.5s ease-in-out 0s;
                height: 100%;
                width: 100%;
                padding: 2rem;
                flex-direction: column;
                overflow: auto;
                max-height: calc(100vh - ${bottomRowHeight});
            `}
            >
            Howdy!
        </main>}
        <div
            style={`
                height: ${bottomRowHeight};
                display: inline-flex; 
                flex-wrap: wrap;
                align-items: flex-start; 
                justify-content: flext-start;
                flex-direction: row;
                width: 100%;
            `}
            >
            <a class="tutorialize-directional-buttons" onclick={Tutorializer.backClicked}>
                Back
            </a>
            <a class="tutorialize-directional-buttons" onclick={Tutorializer.nextClicked}>
                Next
            </a>
        </div>
    </body>
    
    
    try {
        await Tutorializer.loadTutorial()
    } catch (error) {
        
    }
    
})())
