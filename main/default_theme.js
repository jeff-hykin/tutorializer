export const theme = {
    name: "DefaultTheme",
    settings: {
        slideFadeInMiliseconds: 600,
    },
    styles: `
        :root {
            --off-white: whitesmoke;
            --blue: cornflowerblue;
            --light-gray: lightgray;
            
            --background: var(--off-white);
            --arrow-button-accent: var(--blue);
            --title-size: 32px;
            --text-size: 22px;
            --text-default-color: gray;
            --bottom-row-height: 7rem;
        }

        .tutorialize-root {
            display: flex; 
            flex-direction: column;
            align-items: flex-start; 
            justify-content: flex-start;
            overflow: hidden;
            font-family: sans-serif;
            height: 100%;
            width: 100%;
            font-size: var(--text-size);
            color: var(--text-default-color);
            background: var(--background);
        }

        .tutorialize-title {
            font-size: var(--title-size);
            padding: 1rem;
            text-decoration: underline;
        }

        .tutorialize-text {
            padding: 2rem;
        }

        .tutorialize-input {
            color: gray;
            background: transparent;
            border-radius: 0;
            border: none;
            border-bottom: 1px solid gray;
            transition: all 0.5s ease-in-out 0s;
            outline: none;
        }
        
        .tutorialize-arrow-buttons {
            display: flex; 
            align-items: center; 
            justify-content: center;
            font-size: 25px; 
            height: 100%;
            flex-grow: 1;
            transition: all 0.5s ease-in-out 0s;
            color: var(--arrow-button-accent);
            text-decoration: underline;
            background: white;
            --border-size: 2px;
            margin-left: -var(--border-size);
        }
        .tutorialize-arrow-buttons:not(:hover) {
            border: var(--border-size) var(--light-gray) solid;
        }
        .tutorialize-arrow-buttons:hover {
            border: var(--border-size) var(--arrow-button-accent) solid;
            z-index: 1;
        }

        .tutorialize-main {
            display: flex; 
            align-items: center; 
            justify-content: center;
            transition: all 0.5s ease-in-out 0s;
            height: 100%;
            width: 100%;
            padding: 2rem;
            flex-direction: column;
            overflow: auto;
            max-height: calc(100vh - var(--bottom-row-height));
        }

        .tutorialize-container-of-arrow-buttons {
            height: var(--bottom-row-height);
            display: inline-flex; 
            flex-wrap: wrap;
            align-items: flex-start; 
            justify-content: flext-start;
            flex-direction: row;
            width: 100%;
        }
    `
}