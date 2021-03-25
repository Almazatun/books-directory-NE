import Book from "../models/book_model";
import {searchStatements} from "../utils/searchStatements";
import {IBookData, IBookDataAccessLayer, SEARCH} from "./types";

export class BookDataAccessLayer implements IBookDataAccessLayer{
    public async getAllBooks() {
        const books = Book.find()
            .populate('authorBook', ['firstName', 'lastName'])
            .populate('imageBook', ['fileName', 'filePath'])
        return books
    }

    public async findExistBook(titleBook: string) {
        const foundBook = Book.findOne({titleBook}).exec()

        return foundBook
    }

    public async createNewBook(newBookData: IBookData) {

        const {title, pageCount, publishDate, authorBook, description, imageBook} = newBookData

        const newBook = new Book({
            title,
            description: description !== undefined && description !== null ? description : '',
            publishDate: new Date(publishDate),
            authorBook,
            pageCount,
            imageBook
        })

        const savedBook = newBook.save()

        return savedBook
    }

    public async deleteBook(bookId: string) {
        const deletedBook = Book.findByIdAndDelete({_id: bookId})

        return deletedBook
    }

    public async searchBooks(title: string, publishBefore: string, publishAfter: string) {

        const searchBook = new RegExp(title, "i")

        let foundBooks: unknown

        console.log(title, publishBefore, publishAfter)

        const searchState:SEARCH | null  = searchStatements(title, publishBefore, publishAfter)

        switch(searchState) {
            case SEARCH.PUBLISH_BEFORE: {
                console.log(SEARCH.PUBLISH_BEFORE)
                foundBooks = Book.find({
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
                foundBooks = Book.find({
                    publishDate: {
                        $gte: new Date(publishAfter)
                    }
                })
                    .populate('authorBook', ['fistName', 'lastName'])
                    .populate('imageBook', ['fileName', 'filePath'])
                break;
            case SEARCH.PUBLISH_AFTER_AND_TITLE:
                console.log(SEARCH.PUBLISH_AFTER_AND_TITLE)
                foundBooks = Book.find({
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
                foundBooks = Book.find({
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
                foundBooks = Book.find({title: searchBook})
                    .populate('authorBook', ['fistName', 'lastName'])
                    .populate('imageBook', ['fileName', 'filePath'])
                break;
            case SEARCH.FILED_ALL:
                console.log(SEARCH.FILED_ALL)
                foundBooks = Book.find({
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
                foundBooks = Book.find({publishDate: {
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

    public async findBookById (bookId: string) {
        const foundBook = Book.findById({_id: bookId})
            .populate('authorBook', ['fistName', 'lastName'])
            .populate('imageBook', ['fileName', 'filePath'])

        return foundBook
    }
}