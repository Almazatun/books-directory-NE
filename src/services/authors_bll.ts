import validators from "../utils/validators";
import Author from "../models/author";
import AuthorsDAL from "../dataAccessLayer/authors_dal";
import {Response} from "express";

const {validatorCreateNewAuthor} = validators

class Authors {
    async createNewAuthor(firstName: string, lastName: string, res: Response) {
        const {valid, errors} = validatorCreateNewAuthor(firstName, lastName)

        try {
            if (valid) {
                // Make sure the author does not already exist in database storage
                const foundedAuthorLastName = await Author.findOne({lastName}).exec()

                if (foundedAuthorLastName) {
                    res.status(400).json({
                        errors: ['This is author already exist 👷‍♂️'],
                    })
                } else  {
                    console.log('AUTHOR_SAVED')
                    const savedUser = await AuthorsDAL.saveNewUserDB(firstName, lastName)

                    res.status(200).json({
                        author: savedUser,
                        message: '➕ Author created successfully',
                    })
                }
            } else {
                res.status(400).json({
                    errors: [errors],
                    message: 'Bad request 🔴'
                })
            }
        } catch (error) {
            res.status(500).json({
                errors: [{...error}],
                message: "Some error"
            })
        }
    }

    async deleteAuthor (userId: string, res: Response) {
        const deletedAuthor = await AuthorsDAL.deleteUserDB(userId)
        try {
            if (deletedAuthor) {
                res.json({
                    author: deletedAuthor,
                    message: 'Author has been deleted successfully 🟢'
                })
            } else {
                res.status(400).json ({
                    errors: ['Book Id not exist'],
                    message: 'Bad request 🤬'
                })
            }
        } catch (error) {
            res.status(500).json({
                errors: [{...error}],
                message: 'Bad request 🤬'
            })
        }
    }

    async getAuthors (firstName: string, res: Response ) {
        if (firstName !== null && firstName !== '') {
            const authors = await AuthorsDAL.searchAuthorsByFistName(firstName)
            res.json(authors)
        } else {
            const authors = await AuthorsDAL.getAllAuthors()
            res.json(authors)
        }
    }
}

const AuthorsBLL = new Authors
export default AuthorsBLL