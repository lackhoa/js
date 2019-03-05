let main = () => {
    let posts = document.getElementsByClassName("forumpost")
    return Array.from(posts).map(processPost)
}

function processPost (post) {
    // Returns: the msg content, date, the author's name and the original date
    let parent    = getParent(post)
    let hasParent = (parent != undefined)
    let parentDOM = hasParent ? stringToHTML(getHTML(parent)) : undefined
    return {
        content : getContent(post),
        author  : getAuthor(post),
        date    : getDate(post),
        pContent: hasParent ? getContent(parentDOM) : undefined,
        pAuthor : hasParent ? getAuthor(parentDOM)  : undefined,
        pDate   : hasParent ? getDate(parentDOM)    : undefined,
    }
}

function getHTML(url) {
    // Use caching for requests, otherwise it's kinda illegal
    if (getHTML[url]) {return getHTML[url];}

    // Returns the HTML as string
    let xhr = new XMLHttpRequest()
    xhr.open('GET', url, false)  // 'false' = request synchronous
    xhr.send(null)
    let res = xhr.responseText
    getHTML[url] = res
    return res
}

function stringToHTML(s) {
    // Use caching for requests, for performance
    if (stringToHTML[s]) {return stringToHTML[s];}

    // Returns: the author, and date of the post
    // A dummy html object to store the file
    var dummyObject = document.createElement('div')
    dummyObject.innerHTML = s
    stringToHTML[s] = dummyObject
    return dummyObject
}

function getParent(post) {
    // Returns the HTML to the parent
    let commands = post.getElementsByClassName("commands")[0]
    let as       = commands.getElementsByTagName("a")
    return (as.length === 1) ? undefined : as[1].getAttribute("href")
}

function getAuthor(post) {
    let author = post.getElementsByClassName("author")[0]  // Holds name and date
    return author.getElementsByTagName("a")[0].innerText
}

function getDate(post) {
    let author = post.getElementsByClassName("author")[0]  // Holds name and date
    let name = getAuthor(post)
    return author.innerText.substring(name.length + 6)
}

function getContent(post) {
    return post.getElementsByClassName("content")[0].innerText
}

// How to run the code
// Use the "date" fields in advanced search (don't fill out anything)
// set "&perpage=1000" in the url
// to inspect as table
// console.table(main())
// To copy
// copy(main())
