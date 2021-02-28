import {Request, Response} from "express";
import AuthorsBLL from "../services/authors_bll";


//Get all authors or particular author
//Included searching option
const getAllAuthors =  async (req: Request, res: Response) => {
    const {firstName}: { [key: string]: unknown } = req.query
   await AuthorsBLL.getAuthors(firstName, res)
}

//Crate new author
const createNewAuthor = async (req: Request, res: Response) => {
    const {firstName, lastName} = req.body
    await AuthorsBLL.createNewAuthor(firstName,lastName, res)
}

//Delete author
const deleteAuthor = async (req: Request, res: Response) => {
    await AuthorsBLL.deleteAuthor(req.params.id, res)
}

export default {
    getAllAuthors,
    createNewAuthor,
    deleteAuthor
}