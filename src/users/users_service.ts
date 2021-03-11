import {Request, Response} from "express";
import validators from "../utils/validators";
import bcrypt from 'bcrypt'
import {injectable} from "tsyringe";
import {INewUserData, UsersDataAccessLayer} from "./users.dal";
import {BooksDataAccessLayer} from "../books/books_dal";

const {validatorNewUserData, validatorLogIn} = validators

@injectable()
export class UsersService {
    usersDataAccessLayer: UsersDataAccessLayer
    booksDataAccessLayer: BooksDataAccessLayer

    constructor(usersDataAccessLayer: UsersDataAccessLayer, booksDataAccessLayer: BooksDataAccessLayer) {
        this.usersDataAccessLayer = usersDataAccessLayer
        this.booksDataAccessLayer = booksDataAccessLayer
    }

    async createNewUser(email: string, userName: string, password: string, res: Response) {
        const {valid, errors} = validatorNewUserData(email, userName, password)

        console.log(errors)

        try {
            if (valid) {

                // Make sure the user does not already exist
                const foundUserByEmail = await this.usersDataAccessLayer.findOneUserByEmail(email)

                if (foundUserByEmail) {
                    res.status(400).json({
                        errors: ['This is user already exist 🧒 | 👩️'],
                    })
                } else {
                    console.log('USER_CREATED')

                    const newUserData: INewUserData = {
                        email,
                        userName,
                        password
                    }

                    const createdUser = await this.usersDataAccessLayer.createNewUser(newUserData)

                    res.status(200).json({
                        message: 'Successfully Registered 🎉',
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

    async logIn(email: string, password: string, req: Request, res: Response) {

        const {errors, valid} = validatorLogIn(email, password)

        const user = await this.usersDataAccessLayer.findOneUserByEmail(email)

        try {

            if (!valid) {
                res.status(400).json({
                    errors: [errors],
                    message: 'Bad request 🔴'
                })
            } else {
                if (!user) {
                    res.status(404).json({
                        errors: ['User not found 👥'],
                        message: 'Please check your email or password and try again',
                    })
                } else {
                    //Make sure a user password correct
                    const isMatch = await bcrypt.compare(password, user.password)

                    //Unless a user password incorrect a user get error message
                    if (!isMatch) {
                        res.status(401).json({
                            errors: ["Wrong credentials 🆘"],
                        })
                    } else {
                        const sessUser = {id: user.id, name: user.userName, email: user.email};
                        req.session.user = sessUser; // Auto saves session data in mongo store

                        res.status(200).json({
                            user: user
                        })
                    }
                }
            }

        } catch (error) {
            res.status(500).json({
                errors: [error],
                message: "Some error"
            })
        }
    }

    async logOut(req: Request, res: Response) {

        try {
            req.session.destroy((err) => {

                //delete session data from store, using sessionID in cookie
                if (err) throw err;
                res.clearCookie("session-id"); // clears cookie containing expired sessionID
                res.status(200).json({
                    message: "Logged out successfully"
                });
            });
        } catch (error) {
            res.status(500).json({
                errors: [error],
                message: "Some error"
            })
        }
    }

    async autoChecker(req: Request, res: Response) {
        try {
            const sessUser = req.session.user;
            if (sessUser) {
                res.json({message: " Authenticated Successfully", sessUser});
            } else {
                res.status(401).json({message: "Unauthorized"});
            }

        } catch (error) {
            res.status(500).json({
                errors: [error],
                message: "Some error"
            })
        }
    }

    async addBookUserBooksCollection (userId: string, bookId: string, res: Response) {


        //Make sure the book exist in the database
        const isBook = await this.booksDataAccessLayer.findBookById(bookId).catch(() => {
            res.status(400).json({
                errors: ['Book Id not valid'],
                message: 'Bad request 🔴',
            })
        })

        try {
            if (!isBook) {
                res.status(400).json({
                    errors: ['Book Id not valid'],
                    message: 'Bad request 🔴',
                })
            } else {
                const booksCollection = await this.usersDataAccessLayer.addBookUserCollection(userId, bookId)
                res.status(200).json({
                    book: isBook,
                    message: 'Book has been added successfully 🎉',
                })
            }
        } catch (error) {
            res.status(500).json({
                errors: [error],
                message: "Some error"
            })
        }
    }

    async deleteBookUserBooksCollection (userId: string, bookId: string, res: Response) {

        //Make sure the book exist in the User book collection
        const isBookInUserCollection: Array<string> | any = await this.usersDataAccessLayer.findBookUserCollection(userId, bookId).catch((error) => {
            res.status(400).json({
                errors: [error],
                message: 'Book Id not valid',
            })
        })

        const isBook = await this.booksDataAccessLayer.findBookById(isBookInUserCollection[0])
            .catch((error) => {
                res.status(400).json({
                    errors: [error],
                    message: 'Book Id not valid',
                })
            })


        try {
            if (isBookInUserCollection.length === 0) {
                res.status(400).json({
                    errors: ['Book Id not valid'],
                    message: 'Bad request 🔴',
                })
            } else {
               const booksCollection = await this.usersDataAccessLayer.deleteBookUserCollection(userId, bookId)

                res.status(200).json({
                    books: isBook,
                    message: 'Book has been deleted successfully ❌',
                })
            }

        } catch (error) {
            res.status(500).json({
                errors: [error],
                message: "Some error"
            })
        }
    }

    async getUsers (res: Response ) {
       try {
           const users = await this.usersDataAccessLayer.getAllUsers()

           res.status(200).json({
               users: users
           })
       } catch (error) {
           res.status(500).json({
               error: [error]
           })
       }
    }

    async updateUserName (userId: string, title: string, res: Response) {

        //Make sure the user exist
        const foundUserById = await this.usersDataAccessLayer.findOneUserById(userId)

        try {

            if (!foundUserById) {
                res.status(400).json({
                    errors: ['User Id not valid'],
                    message: 'Bad request 🔴',
                })
            } else {
                const updatedUserData = await this.usersDataAccessLayer.updateUserData(userId, title)

                res.status(200).json({
                    user: updatedUserData,
                    message: 'User name has been updated successfully',
                })
            }

        } catch (error) {
            res.status(500).json({
                error: [error]
            })
        }
    }
    
}