import {Request, Response} from "express";

//Get all books or particular book
const getAllBooks = async (req: Request, res: Response) => {
    res.json("Get all books")
}

//Crate new book
const createNewBook = async (req: Request, res: Response) => {
    res.json("Create new book")
}

export default {
    getAllBooks,
    createNewBook
}