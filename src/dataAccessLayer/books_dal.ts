import Book from "../models/book";

class Books {
    async getAllBooks() {
        const books = await Book.find().populate('authorName', ['fistName', 'lastName'])
        return books
    }

    async findExistBook(titleBook: string) {
        const foundBook = await Book.findOne({titleBook}).exec()

        return foundBook
    }

    async createNewBook(newBookData: IBookData) {

        const {title, pageCount, publishDate, author, description, bookImg} = newBookData

        const newBook = new Book({
            title: title,
            description: description,
            publishDate: publishDate,
            authorName: author,
            pageCount: pageCount,
            coverImageName: bookImg
        })

        const savedBook = await newBook.save()

        return savedBook
    }

    async deleteBook(bookId: string) {
        const deletedBook = await Book.findByIdAndDelete({_id: bookId})

        return deletedBook
    }
}

const BooksDAL = new Books()
export default BooksDAL

//Types
export interface IBookData {
    title: string
    description: string
    publishDate: string
    author: string //authorName
    pageCount: number
    bookImg: string
}