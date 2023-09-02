const {JSDOM} = require('jsdom')

async function crawlPage(currentURL){
    console.log(`actively crawling ${currentURL}`)
    try {
        const resp = await fetch(currentURL)
        if(resp.status>399){
            console.log(`error in fetch with status code of ${resp.status} on page:${currentURL}`)
            return
        }
        const contentType=  resp.headers.get("content-type")
        if(contentType.includes('text/html')){
            console.log(`non html response, content type : ${contentType}, on page ${currentURL}`)
            return 
        }
        console.log(resp.text())
    } catch (error) {
        console.error(`error during the fetch ${error.message} on the page ${currentURL}`)
    }
}
function getUrlsFromHTML(htmlBody,baseURL){
    const urls  = []
    const dom = new JSDOM(htmlBody)
    const linkElement = dom.window.document.querySelectorAll('a')
    for (const link of linkElement){
        if (link.href.slice(0,1)=== '/'){
            // relative url 
            try {
                const urlObj = new URL(`${baseURL}${link.href}`)
                urls.push(urlObj.href)
            } catch (error) {
                console.log(`there is error ${error.message}`)
            }
            
        }
        else{
            // absolute url 
            try {
                const urlObj = new URL(link.href)
                urls.push(urlObj.href)
            } catch (error) {
                console.log(`there is error ${error.message}`)
            }
            
        }
        
    }
    return urls
}

function normalizeUrl(urlString){
    const urlObj = new URL(urlString)
    const hostPath=  `${urlObj.hostname}${urlObj.pathname}`

    if( hostPath.length > 0 && hostPath.slice(-1)==='/'){
        return hostPath.slice(0,-1)
    }
    return hostPath

}

module.exports = {
    normalizeUrl,
    getUrlsFromHTML,
    crawlPage
}