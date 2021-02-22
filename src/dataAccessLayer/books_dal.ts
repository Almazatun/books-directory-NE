import Book from "../models/book_model";

class Books {
    async getAllBooks() {
        const books = await Book.find()
            .populate('authorBook', ['fistName', 'lastName'])
            .populate('imageBook', ['fileName', 'filePath'])
        return books
    }

    async findExistBook(titleBook: string) {
        const foundBook = await Book.findOne({titleBook}).exec()

        return foundBook
    }

    async createNewBook(newBookData: IBookData) {

        const {title, pageCount, publishDate, authorBook, description, imageBook} = newBookData

        const newBook = new Book({
            title,
            description: description !== undefined && description !== null ? description : '',
            publishDate,
            authorBook,
            pageCount,
            imageBook
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
    authorBook: string
    pageCount: number
    imageBook: string
}