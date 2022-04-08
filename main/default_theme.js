export const theme = {
    name: "DefaultTheme",
    settings: {
        slideFadeInMiliseconds: 600,
    },
    styles: `
        :root {
            --white     : 255, 255, 255;
            --off-white : 238, 238, 238;
            --gray      : 84 , 110, 122;
            --light-gray: 199, 203, 205;
            --black     : 36 , 41 ,  56;
            --red       : 240, 113, 120;
            --blue      : 130, 170, 255;
            --green     : 128, 203, 171;
            --yellow    : 254, 195,  85;
            --orange    : 247, 140, 108;
            --pink      : 229, 126, 179;
            --purple    : 199, 146, 234;
            --cyan      : 137, 221, 255;
            
            --background: var(--off-white);
            --text-default-color: var(--gray);
            --button-accent: var(--blue);
            --button-background: rgb(var(--white));
            --title-size: 32px;
            --text-size: 22px;
            --bottom-row-height: 7rem;
            
            --error-text-color: var(--red);
            --button-yes-color: var(--green);
            --button-no-color: var(--red);
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
            color: rgb(var(--text-default-color));
            background: rgb(var(--background));
        }

        .tutorialize-title {
            font-size: var(--title-size);
            padding: 1rem;
            text-decoration: underline;
        }

        .tutorialize-text {
            padding: 2rem;
        }
        
        .tutorialize-button {
            padding: 1rem;
            --border-size: 2px;
            transition: all 0.5s ease-in-out 0s;
        }
        .tutorialize-button:not(:hover) {
            background: var(--button-background);
            color: rgb(var(--button-accent));
            border: rgb(var(--button-accent)) solid var(--border-size);
        }
        .tutorialize-button:hover {
            background: rgba(var(--button-accent), 0.6);
            color: var(--button-background);
            border: var(--button-background) solid var(--border-size);
        }

        .tutorialize-error-text {
            color: rgb(var(--error-text-color));
        }
        
        .tutorialize-hint {
            font-size: 0.7em;
            opacity: 0.7;
            text-align: center;
            padding: 2rem;
        }

        .tutorialize-input {
            color: rgb(var(--text-default-color));
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
            color: rgb(var(--button-accent));
            text-decoration: underline;
            background: rgb(var(--white)));
            --border-size: 2px;
            margin-left: -var(--border-size);
        }
        .tutorialize-arrow-buttons:not(:hover) {
            border: var(--border-size) var(--light-gray) solid;
        }
        .tutorialize-arrow-buttons:hover {
            border: var(--border-size) rgb(var(--button-accent)) solid;
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