import {IBook} from "../models/book_model";
import {IBookData, IBookDataAccessLayer} from "./types";


export class MockBookRepo implements IBookDataAccessLayer {

    private dbBook: {books: Array<IBook>} = {
        books: []
    };

    constructor() {};

    async createNewBook(newBookData: IBookData): Promise<IBook> {

        const {
            imageBook,
            authorBook,
            publishDate,
            description,
            pageCount,
            title
        } = newBookData

        const newBook = {
            _id: "1",
            title: title,
            authorBook: authorBook,
            description: description,
            pageCount: pageCount,
            publishDate: publishDate,
            createAt: "2021",
            imageBook: imageBook,
            _doc: {} as object
        } as any

        this.dbBook.books.push(newBook)

        return  newBook
    };

    async deleteBook(bookId: string): Promise<any> {

        const foundBook = this.dbBook.books.find(book => {
            return book.id === bookId
        });

        if (foundBook) {
            this.dbBook.books.findIndex(book => {
                    return book.id === bookId
                })
        }

        return foundBook

    };

    async findBookById(bookId: string): Promise<IBook | null> {

        const foundBookById = this.dbBook.books.find(book => {
            return book.id === bookId
        });

        if (foundBookById) return  foundBookById
        else return  null

    };

    async findExistBook(titleBook: string): Promise<IBook | null> {

        const foundBookByTitle = this.dbBook.books.find(book => {
            return book.title === titleBook
        });

        if (foundBookByTitle) return  foundBookByTitle
        else return  null
    };

    async getAllBooks(): Promise<any> {

        return this.dbBook.books
    };

    async searchBooks(title: string, publishBefore: string, publishAfter: string): Promise<unknown> {
        return
    };
}


