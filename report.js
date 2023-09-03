function printReport(pages){
    console.log('==========')
    console.log('REPORT')
    console.log('==========')
    const sortedPages = sortPages(pages)
    for (const sortedPage of sortedPages){
        const url = sortedPage[0]
        const count = sortedPage[1]
        console.log(`Found ${count} internal links to ${url}`)
        }
  }




function sortPages(pages){
    const pagesArray = Object.entries(pages)
    pagesArray.sort((a,b)=>{
        aHits=a[1]
        bHits=b[1]
        return b[1]-a[1]
    })
    return pagesArray
}


module.exports = {
    sortPages
}