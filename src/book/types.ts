import {Promise} from "mongoose";
import {IBook} from "../models/book_model";

export interface IBookDataAccessLayer {

    getAllBooks(): Promise<any>

    findExistBook(titleBook: string): Promise<IBook | null>

    createNewBook(newBookData: IBookData): Promise<IBook>

    deleteBook(bookId: string): Promise<any>


    searchBooks(title: string, publishBefore: string, publishAfter: string): Promise<unknown>

    findBookById(bookId: string): Promise<IBook | null>

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