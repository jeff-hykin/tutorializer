;((async ()=>{
    const { default: router } = await import('https://cdn.skypack.dev/quik-router')
    window.router = router // debugging
    
    if (router.pageInfo.url) {
        try {
            var {onLoad} = await import(router.pageInfo.url)
        } catch (error) {

        }
    }
    if (onLoad) {
        console.log("running onload")
        onLoad()
    }
    // router.pageInfo.page
    // router.pageInfo.url = "https://cdn.jsdelivr.net/gh/jeff-hykin/tutorialize@master/virkshop/tutorialize.js"
    

    document.head.innerHTML += `<link rel="stylesheet" href="https://unpkg.com/css-baseline/css/3.css">`

    document.body.style = `
        display: flex; 
        align-items: center; 
        justify-content: center;
        font-size: 45px; 
        font-family: sans-serif;
        height: 100%;
    `
    document.body.innerHTML = `
        Hello World!
    `


    
    
})())
