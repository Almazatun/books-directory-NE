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

        const {title, pageCount, publishDate, authorId, description} = newBookData

        const newBook = new Book({
            title: title,
            authorName: authorId,
            description: description,
            pageCount: pageCount,
            publishDate: publishDate,
            coverImageName: 'sadasdsa'
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
    authorId: string //authorName
    pageCount: number
}