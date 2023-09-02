const {JSDOM} = require('jsdom')


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
    getUrlsFromHTML
}