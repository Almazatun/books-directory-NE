import validators from "../utils/validators";
import {Response} from "express";
import fs from "fs";
import path from "path";
import {coverImageBasePath} from "../models/book_model";
import {injectable} from "tsyringe";
import {ImagesDataAccessLayer} from "../images/images_dal";
import {IBookData, IBookDataAccessLayer} from "./types";

//
const {validatorCreateNewBook} = validators;
const uploadPath = path.join('public', coverImageBasePath);

@injectable()
export class BookService {
    private booksDataAccessLayer: IBookDataAccessLayer;
    private imagesDataAccessLayer: ImagesDataAccessLayer;

    constructor(booksDataAccessLayer: IBookDataAccessLayer, imagesDataAccessLayer: ImagesDataAccessLayer) {
        this.booksDataAccessLayer = booksDataAccessLayer;
        this.imagesDataAccessLayer = imagesDataAccessLayer;
    };

    public async getAllBooks(title: string | any, publishBefore: string | any, publishAfter: string | any, res: Response) {
        let books: unknown

        let searchTitle: string = title ? title : '';
        let searchPublishBefore: string = publishBefore ? publishBefore : '';
        let searchPublishAfter: string = publishAfter ? publishAfter : '';

        try {
            if (title !== null && title !== "" && title !== undefined) {
                console.log('SEARCH_OPTIONS')
                //Search option
                books = await this.booksDataAccessLayer.searchBooks(searchTitle, searchPublishBefore, searchPublishAfter)
                res.status(200).json({
                    books: books,
                    searchingOption: title
                })
            } else if (publishBefore !== null && publishBefore !== "" && publishBefore !== undefined) {
                books = await this.booksDataAccessLayer.searchBooks(searchTitle, searchPublishBefore, searchPublishAfter)
                res.status(200).json({
                    books: books,
                    searchingOption: title
                })
            } else if (publishAfter !== null && publishAfter !== "" && publishAfter !== undefined) {
                books = await this.booksDataAccessLayer.searchBooks(searchTitle, searchPublishBefore, searchPublishAfter)
                res.status(200).json({
                    books: books,
                    searchingOption: title
                })
            } else {
                console.log('GET_ALL_BOOKS')
                books = await this.booksDataAccessLayer.getAllBooks()
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
    };

    public async createNewBook(res: Response, newBookData: IBookData) {
        const {title, pageCount, publishDate} = newBookData

        const {errors, valid} = validatorCreateNewBook(title, pageCount, publishDate)

        try {
            if (valid) {
                // Make sure the book does not already exist in database storage
                const foundedBook = await this.booksDataAccessLayer.findExistBook(title)

                if (foundedBook) {
                    res.status(400).json({
                        errors: ['This is book already exist 📚'],
                        message: 'Bad request 🔴'
                    })
                } else {
                    const savedBook = await this.booksDataAccessLayer.createNewBook(newBookData)

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
    };

    public async deleteBook(bookId: string, res: Response) {

        const deletedBookResult = await this.booksDataAccessLayer.deleteBook(bookId)

        try {
            if (deletedBookResult) {
                //Delete image
                const deletedImage = await this.imagesDataAccessLayer.deleteImage(String(deletedBookResult.imageBook))

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
    };
}