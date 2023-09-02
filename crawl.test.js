const {normalizeUrl,getUrlsFromHTML} = require('./crawl')
const {test,expect} = require('@jest/globals')
test('normalizeUrl strip protocol',()=>{
    const input='https://blog.boot.dev/path'
    const actual = normalizeUrl(input)
    const expected = 'blog.boot.dev/path'
    expect(actual).toEqual(expected)
})

test('normalizeUrl strip trailling shlash ',()=>{
    const input='https://blog.boot.dev/path/'
    const actual = normalizeUrl(input)
    const expected = 'blog.boot.dev/path'
    expect(actual).toEqual(expected)
})

test('normalizeUrl capital ',()=>{
    const input='https://BlOG.boot.dev/path/'
    const actual = normalizeUrl(input)
    const expected = 'blog.boot.dev/path'
    expect(actual).toEqual(expected)
})

test('normalizeUrl strip http ',()=>{
    const input='http://blog.boot.dev/path/'
    const actual = normalizeUrl(input)
    const expected = 'blog.boot.dev/path'
    expect(actual).toEqual(expected)
})

test('getUrlsFromHttps absolute url ',()=>{
    const inputHTMLBody=
    `<html> 
        <body> 
            <a href="http://blog.boot.dev/path/">
            Boot.dev Blog
            </a>
        </body>
    </html>
    `
    const inputBaseURL = "http://blog.boot.dev/path/"
    const actual = getUrlsFromHTML(inputHTMLBody,inputBaseURL)
    const expected = ["http://blog.boot.dev/path/"]
    expect(actual).toEqual(expected)
})
test('getUrlsFromHttps relative url ',()=>{
    const inputHTMLBody=
    `<html> 
        <body> 
            <a href="/path/">
            Boot.dev Blog
            </a>
        </body>
    </html>
    `
    const inputBaseURL = "http://blog.boot.dev"
    const actual = getUrlsFromHTML(inputHTMLBody,inputBaseURL)
    const expected = ["http://blog.boot.dev/path/"]
    expect(actual).toEqual(expected)
})

test('getUrlsFromHttps mutiple url both ',()=>{
    const inputHTMLBody=
    `<html> 
        <body> 
            <a href="http://blog.boot.dev/path1/">
            Boot.dev Blog
            </a>
            <a href="/path2/">
            Boot.dev Blog
            </a>
        </body>
    </html>
    `
    const inputBaseURL = "http://blog.boot.dev"
    const actual = getUrlsFromHTML(inputHTMLBody,inputBaseURL)
    const expected = ["http://blog.boot.dev/path1/","http://blog.boot.dev/path2/"]
    expect(actual).toEqual(expected)
})

test('getUrlsFromHttps invalid Url ',()=>{
    const inputHTMLBody=
    `<html> 
        <body> 
            <a href="invalid">
            Boot.dev Blog
            </a>
            
        </body>
    </html>
    `
    const inputBaseURL = "http://blog.boot.dev"
    const actual = getUrlsFromHTML(inputHTMLBody,inputBaseURL)
    const expected = []
    expect(actual).toEqual(expected)
})


