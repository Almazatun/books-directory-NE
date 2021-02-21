import validators from "../utils/validators";
import BooksDAL, {IBookData} from "../dataAccessLayer/books_dal";
import {Response, Request} from "express";
import fs from "fs";
import path from "path";
import {coverImageBasePath} from "../models/book";
import {urlSplit} from "../utils/urlSplit";

const {validatorCreateNewBook} = validators
const uploadPath = path.join('public', coverImageBasePath)

class Books {
    private uploadedFile: Array<string>;
    constructor(uploadImg: Array<string> = []) {
        this.uploadedFile = uploadImg
    }

    async getAllBooks(res: Response) {
        try {
            const books = await BooksDAL.getAllBooks()
            res.json(books)
        } catch (error) {
            res.status(500).json({
                errors: [{...error}],
                message: "Some error"
            })
        }
    }

    async createNewBook(newBookData: IBookData, res: Response) {
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

        //Last part of string the coverImageName property deleting book
        const lastPartOfString = urlSplit(deletedBookResult!.coverImageName)

        try {
            if (deletedBookResult && lastPartOfString) {
                //Delete image file
                fs.unlinkSync(path.join(uploadPath, lastPartOfString))
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
        } catch (error) {
            res.status(500).json({
                errors: [{...error}],
                message: 'Book Id not valid 🤬'
            })
        }
    }

    async uploadBookImage(req: Request, res: Response) {

        const url = req.protocol + '://' + req.get('host')
        try {
            if (req.file !== null && req.file !== undefined) {
                const file = await req.file

                //Save upload file name
                this.uploadedFile.push(file.filename)

                res.status(200).json({
                    fileName: file.filename,
                    filePath: `${url}/${uploadPath}/${file.filename}`,
                    message: 'File uploaded successfully 🟢'
                })
            } else {
                res.status(400).json({
                    errors: ['No file uploaded'],
                    message: 'Bad request 🔴'
                })
            }
        } catch (error) {
            res.status(500).json({
                errors: [...error],
                message: 'Some error 🔴'
            })
        }
    }

    //Delete uploaded image file when session expired
    async deleteUploadedBookImage(fileName: string ,res: Response) {

        const isUploadedFile = this.uploadedFile.find((uploadedFile) => {
            return uploadedFile === fileName
        })

        try {
            if (isUploadedFile) {
                //Delete uploaded image
                fs.unlinkSync(path.join(uploadPath, isUploadedFile))

                res.status(400).json({
                    errors: ['Session expired'],
                    message: 'Please upload book image again'
                })
            }
        } catch (error) {
            res.status(500).json({
                errors: [error],
                message: 'Some error 🔴'
            })
        }
    }
}

const BooksBLL = new Books
export default BooksBLL
