import {Request, Response} from "express";
import BooksBLL from "../services/books_bll";


//Get all books or particular book
const getAllBooks = async (req: Request, res: Response) => {
    await BooksBLL.getAllBooks(res)
}

//Crate new book
const createNewBook = async (req: Request, res: Response) => {

    console.log('CREATE_BOOK_BODY', req.body)

    await BooksBLL.createNewBook(req.body, res)
}

//DeleteBook
const deleteBook = async (req: Request, res: Response) => {

    await BooksBLL.deleteBook(req.params.id, res)
}

//Upload image a new book
const uploadBookImage = async (req: Request, res: Response) => {
    await BooksBLL.uploadBookImage(req, res)
}
//Delete uploaded image file when session expires
const deleteUploadedFile = async (req: Request, res: Response) => {

    await BooksBLL.deleteUploadedBookImage(res)
}

export default {
    getAllBooks,
    createNewBook,
    deleteBook,
    uploadBookImage,
    deleteUploadedFile
}