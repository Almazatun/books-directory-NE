import Book from "../models/book_model";
import {searchStatements} from "../utils/searchStatements";

export class BooksDataAccessLayer {
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

        let foundBooks: unknown

        console.log(title, publishBefore, publishAfter)

        const searchState:SEARCH | null  = searchStatements(title, publishBefore, publishAfter)

        switch(searchState) {
            case SEARCH.PUBLISH_BEFORE: {
                console.log(SEARCH.PUBLISH_BEFORE)
                foundBooks = await Book.find({
                    publishDate: {
                        $lte: new Date(publishBefore)
                    }
                })
                    .populate('authorBook', ['fistName', 'lastName'])
                    .populate('imageBook', ['fileName', 'filePath'])
                break;
            }
            case SEARCH.PUBLISH_AFTER:
                console.log(SEARCH.PUBLISH_AFTER)
                foundBooks = await Book.find({
                    publishDate: {
                        $gte: new Date(publishAfter)
                    }
                })
                    .populate('authorBook', ['fistName', 'lastName'])
                    .populate('imageBook', ['fileName', 'filePath'])
                break;
            case SEARCH.PUBLISH_AFTER_AND_TITLE:
                console.log(SEARCH.PUBLISH_AFTER_AND_TITLE)
                foundBooks = await Book.find({
                    publishDate: {
                        $gte: new Date(publishAfter)
                    },
                    title: searchBook
                })
                    .populate('authorBook', ['fistName', 'lastName'])
                    .populate('imageBook', ['fileName', 'filePath'])
                break;
            case SEARCH.PUBLISH_BEFORE_AND_TITLE:
                console.log(SEARCH.PUBLISH_BEFORE_AND_TITLE)
                foundBooks = await Book.find({
                    publishDate: {
                        $lte: new Date(publishAfter)
                    },
                    title: searchBook
                })
                    .populate('authorBook', ['fistName', 'lastName'])
                    .populate('imageBook', ['fileName', 'filePath'])
                break;
            case SEARCH.BY_TITLE:
                console.log(SEARCH.BY_TITLE)
                foundBooks = await Book.find({title: searchBook})
                    .populate('authorBook', ['fistName', 'lastName'])
                    .populate('imageBook', ['fileName', 'filePath'])
                break;
            case SEARCH.FILED_ALL:
                console.log(SEARCH.FILED_ALL)
                foundBooks = await Book.find({
                    publishDate: {
                        $lte: new Date(publishBefore),
                        $gte: new Date(publishAfter)
                    },
                    title: searchBook
                })
                    .populate('authorBook', ['fistName', 'lastName'])
                    .populate('imageBook', ['fileName', 'filePath'])
                break;
            case SEARCH.PUBLISH_BEFORE_AND_PUBLISH_AFTER:
                console.log(SEARCH.PUBLISH_BEFORE_AND_PUBLISH_AFTER)
                foundBooks = await Book.find({publishDate: {
                        $lte: new Date(publishBefore),
                        $gte: new Date(publishAfter)
                    }})
                    .populate('authorBook', ['fistName', 'lastName'])
                    .populate('imageBook', ['fileName', 'filePath'])
                break;
            default:
                break;
        }

        return foundBooks
    }

    async findBookById (bookId: string) {
        const foundBook = await Book.findById({_id: bookId})
            .populate('authorBook', ['fistName', 'lastName'])
            .populate('imageBook', ['fileName', 'filePath'])

        return foundBook
    }
}

//Types
export interface IBookData {
    title: string
    description: string
    publishDate: string
    authorBook: string
    pageCount: number
    imageBook: string
}

//Enum
export enum SEARCH {
    PUBLISH_BEFORE = "PUBLISH_BEFORE",
    PUBLISH_AFTER = "PUBLISH_AFTER",
    PUBLISH_BEFORE_AND_TITLE = "PUBLISH_BEFORE_AND_TITLE",
    PUBLISH_AFTER_AND_TITLE = "PUBLISH_AFTER_AND_TITLE",
    PUBLISH_BEFORE_AND_PUBLISH_AFTER = "PUBLISH_BEFORE_AND_PUBLISH_AFTER",
    FILED_ALL = 'FILED_ALL',
    BY_TITLE = "BY_TITLE"
}