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
            publishDate: new Date(publishDate),
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

    async searchBooks(title: string, publishBefore: string, publishAfter: string) {

        const searchBook = new RegExp(title, "i")

        console.log(publishBefore)

        let foundBooks: unknown

        if (publishBefore && publishBefore !== '' && publishAfter === '') {
            console.log('PUBLISH_BEFORE')
            foundBooks = await Book.find({
                publishDate: {
                    $lte: new Date(publishBefore)
                }
            })
                .populate('authorBook', ['fistName', 'lastName'])
                .populate('imageBook', ['fileName', 'filePath'])
        } else if (publishAfter && publishAfter !== '' && publishBefore === '') {
            console.log('PUBLISH_AFTER')
            foundBooks = await Book.find({
                publishDate: {
                    $gte: new Date(publishAfter)
                }
            })
                .populate('authorBook', ['fistName', 'lastName'])
                .populate('imageBook', ['fileName', 'filePath'])
        } else if (title && title !== '') {
            foundBooks = await Book.find({title: searchBook})
                .populate('authorBook', ['fistName', 'lastName'])
                .populate('imageBook', ['fileName', 'filePath'])
        } else if (publishBefore !== '' && publishAfter !== '') {
            console.log('BETWEEN_TWO_DATE')
            foundBooks = await Book.find({publishDate: {
                    $lte: new Date(publishBefore),
                    $gte: new Date(publishAfter)
                }})
                .populate('authorBook', ['fistName', 'lastName'])
                .populate('imageBook', ['fileName', 'filePath'])
        }

        return foundBooks
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