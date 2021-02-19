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

const deleteBook = async (req: Request, res: Response) => {

    await BooksBLL.deleteBook(req.params.id, res)
}

const uploadBookImage = async (req: Request, res: Response) => {
    console.log("UPLOAD_BOOK_IMAGE")
    console.log("UPLOAD_BOOK_FILE", req.file)
    await BooksBLL.uploadBookImage(req, res)
}

export default {
    getAllBooks,
    createNewBook,
    deleteBook,
    uploadBookImage
}