import validators from "../utils/validators";
import BooksDAL, {IBookData} from "../dataAccessLayer/books_dal";
import {Response} from "express";
import fs from "fs";
import path from "path";
import {coverImageBasePath} from "../models/book_model";
import ImagesDAL from "../dataAccessLayer/images_dal";

const {validatorCreateNewBook} = validators
const uploadPath = path.join('public', coverImageBasePath)

class Books {

    async getAllBooks(title: string | any, publishBefore: string | any, publishAfter: string | any, res: Response) {
        let books: unknown

        let searchTitle: string = title ? title : ''
        let searchPublishBefore: string = publishBefore ? publishBefore : ''
        let searchPublishAfter: string = publishAfter ? publishAfter : ''

        try {
            if (title !== null && title !== "" && title !== undefined) {
                console.log('SEARCH_OPTIONS')
                //Search option
                books = await BooksDAL.searchBooks(searchTitle, searchPublishBefore, searchPublishAfter)
                res.status(200).json({
                    books: books,
                    searchingOption: title
                })
            } else if (publishBefore !== null && publishBefore !== "" && publishBefore !== undefined) {
                books = await BooksDAL.searchBooks(searchTitle, searchPublishBefore, searchPublishAfter)
                res.status(200).json({
                    books: books,
                    searchingOption: title
                })
            } else if (publishAfter !== null && publishAfter !== "" && publishAfter !== undefined) {
                books = await BooksDAL.searchBooks(searchTitle, searchPublishBefore, searchPublishAfter)
                res.status(200).json({
                    books: books,
                    searchingOption: title
                })
            } else {
                console.log('GET_ALL_BOOKS')
                books = await BooksDAL.getAllBooks()
                res.status(200).json({
                    books: books,
                    searchingOption: ''
                })
            }
        } catch (error) {
            res.status(500).json({
                errors: [{...error}],
                message: "Some error"
            })
        }
    }

    async createNewBook(res: Response, newBookData: IBookData) {
        const {title, pageCount, publishDate} = newBookData

        const {errors, valid} = validatorCreateNewBook(title, pageCount, publishDate)

        try {
            if (valid) {
                // Make sure the book does not already exist in database storage
                const foundedBook = await BooksDAL.findExistBook(title)

                if (foundedBook) {
                    res.status(400).json({
                        errors: ['This is book already exist 📚'],
                        message: 'Bad request 🔴'
                    })
                } else {
                    const savedBook = await BooksDAL.createNewBook(newBookData)

                    res.status(200).json({
                        book: savedBook,
                        message: '➕ Book created successfully',
                    })
                }
            } else {
                res.status(400).json({
                    errors: [errors],
                    message: 'Bad request 🔴'
                })
            }
        } catch (error) {
            if (Object.keys(error).length >= 1) {
                res.status(500).json({
                    errors: [error],
                    message: "Some error"
                })
            } else {
                res.status(400).json({
                    errors: ['Book image should be required'],
                    message: 'Bad request 🔴'
                })
            }
        }
    }

    async deleteBook(bookId: string, res: Response) {

        const deletedBookResult = await BooksDAL.deleteBook(bookId)

        try {
            if (deletedBookResult) {
                //Delete image
                const deletedImage = await ImagesDAL.deleteImage(String(deletedBookResult.imageBook))

                if (deletedImage)  {
                    //Delete image file
                    fs.unlinkSync(path.join(uploadPath, deletedImage.fileName))

                    //file removed
                    res.json({
                        book: deletedBookResult,
                        message: 'Book has been deleted successfully 🟢'
                    })
                } else {
                    res.status(400).json({
                        errors: ['Book Id not exist'],
                        message: 'Bad request 🤬'
                    })
                }
            } else {
                res.status(400).json({
                    errors: ['Book Id not exist'],
                    message: 'Bad request 🤬'
                })
            }
        } catch (error) {
            res.status(500).json({
                errors: [{...error}],
                message: 'Book Id not valid 🤬'
            })
        }
    }
}

const BooksBLL = new Books
export default BooksBLL
