import {deleteKey, getOne, getTable, hasKey, initData, saveOne} from "@/utils/db";

const name = 'book'

// 判断书名是否重复
export function hasBook(bookName){
    return hasKey(name, bookName)
}

// 添加新书
export function saveBook(book) {
    saveOne(name, book.name, book)
}

// 新书入柜
export function bookPush(bookName) {
    const book = getOne(name, bookName)
    book.status='1'
    book.dateTime=new Date()
    saveBook(book)
}

export function getBook(bookName) {
    return getOne(name,bookName)
}

export function bookList() {
    const books=[]
    const bookTable=getTable(name)
    if (bookTable) {
        for (const bookName of Object.keys(bookTable)) {
            const book=bookTable[bookName]
            if (book.status==='1') {
                books.push(book)
            }
        }
    }

    return books.sort((a, b) => {
        const dateA=new Date(a.dateTime)
        const dateB=new Date(b.dateTime)
        return dateB.getTime()-dateA.getTime()
    })
}

export function searchBook(word) {
    const result = []
    const bookS = bookList()
    for (const book of bookS) {
        if (book.name.includes(word)) {
            result.push(book)
        }
    }
    return result
}

export function deleteBook(bookName) {
    deleteKey(name, bookName)
}

export function myBooks(usernname) {
    return bookList().filter(value => value.username === usernname)
}

export function initBook(books) {
    initData(name, books)
}
