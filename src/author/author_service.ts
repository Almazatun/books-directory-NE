import validators from "../utils/validators";
import {Response} from "express";
import {injectable} from 'tsyringe';
import {IAuthor} from "../models/author_model";
import {IAuthorDataAccessLayer} from "./types";

const {validatorCreateNewAuthor} = validators

@injectable()
export class AuthorService {
    private authorDataAccessLayer: IAuthorDataAccessLayer;

    constructor(authorsDataAccessLayer: IAuthorDataAccessLayer) {
        this.authorDataAccessLayer = authorsDataAccessLayer;
    }

    public async createNewAuthor(firstName: string, lastName: string, res: Response) {
        const {valid, errors} = validatorCreateNewAuthor(firstName, lastName)

        try {
            if (valid) {
                // Make sure the author does not already exist in database storage
                const foundAuthorByLastName = await this.authorDataAccessLayer.findOneAuthorByLastName(lastName)

                if (foundAuthorByLastName) {
                    res.status(400).json({
                        errors: ['This is author already exist 👷‍♂️'],
                    })
                } else  {
                    console.log('AUTHOR_SAVED')
                    const savedAuthor = await this.authorDataAccessLayer.saveNewAuthorDB(firstName, lastName)

                    res.status(200).json({
                        author: savedAuthor,
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
    };

    public async deleteAuthor (userId: string, res: Response) {
        const deletedAuthor = await this.authorDataAccessLayer.deleteAuthorDB(userId)
        try {
            if (deletedAuthor) {
                res.json({
                    author: deletedAuthor,
                    message: 'Author has been deleted successfully 🟢'
                })
            } else {
                res.status(400).json ({
                    errors: ['Author Id not valid'],
                    message: 'Bad request 🤬'
                })
            }
        } catch (error) {
            res.status(500).json({
                errors: [{...error}],
                message: 'Bad request 🤬'
            })
        }
    };

    public async getAuthors (firstName: string | any, res: Response ): Promise<unknown | IAuthor[]> {
        if (firstName !== null && firstName !== '') {
            const authors = await this.authorDataAccessLayer.searchAuthorsByFistName(firstName)
            return res.json(authors)
        } else {
            const authors = await this.authorDataAccessLayer.getAllAuthors()
            res.json(authors)
        }
    };
}
