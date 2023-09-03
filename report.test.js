const {sortPages} = require('./report')
const {test,expect} = require('@jest/globals')
test('sortPages 2 pages',()=>{
    const input={
        'blog.boot.dev':3,
        'blog.boot.dev/path':1,

}
    const actual = sortPages(input)
    const expected = [['blog.boot.dev',3],['blog.boot.dev/path',1]]
    expect(actual).toEqual(expected)
})


test('sortPages 5 pages',()=>{
    const input={
        'blog.boot.dev':10,
        'blog.boot.dev/path2':4,
        'blog.boot.dev/path3':3,
        'blog.boot.dev/path4':2,
        'blog.boot.dev/path':1,

}
    const actual = sortPages(input)
    const expected = [['blog.boot.dev',10],['blog.boot.dev/path2',4],['blog.boot.dev/path3',3],['blog.boot.dev/path4',2],['blog.boot.dev/path',1],]
    expect(actual).toEqual(expected)
})

test('sortPages null case', () => {
    const input = {}
    const actual = sortPages(input)
    const expected = []
    expect(actual).toEqual(expected)
  })