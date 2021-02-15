import {Request, Response} from "express";
import Author from '../models/author';

//Get all authors or particular author
//Included searching option
const getAllAuthors =  async (req: Request, res: Response) => {
    const {name} = req.body
    if (name !== null && name !== '') {

        //Use Regular expression to find particular author
        const foundAuthor = new RegExp(name, "i")

        const authors = await Author.find({name: foundAuthor})
        res.json(authors)
    } else {
        const authors = await Author.find()
        res.json(authors)
    }
}

//Crate new author
const createNewAuthor = async (req: Request, res: Response) => {
    const {name} = req.body

    try {
        if (name !== null && name !== '') {
            // Make sure the author does not already exist in database storage
            const userEmail = await Author.findOne({name}).exec()

            if (userEmail) {
                res.status(400).json({
                    errors: ['This is author already exist 👷‍♂️'],
                })
            } else  {
                const newAuthor = new Author({
                    name: name,
                    createdAt: new Date().toISOString()
                })
                const saveUser = await newAuthor.save()

                res.status(200).json({
                    message: '➕ Author created successfully',
                    author: saveUser
                })
            }
        } else {
            res.status(400).json({
                errors: ['Bad request 🔴'],
            })
        }
    } catch (error) {
        res.status(500).json({
            errors: [{...error}],
            message: "Some error"
        })
    }
}

export default {
    getAllAuthors,
    createNewAuthor
}