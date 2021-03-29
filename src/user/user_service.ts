import {Request, Response} from "express";
import validators from "../utils/validators";
import bcrypt from 'bcrypt'
import {injectable} from "tsyringe";
import {INewUserData, IUserDataAccessLayer} from "./types";
import {IBookDataAccessLayer} from "../book/types";
import {DEV_MODE, MAX_AGE, SESSION} from "../configs/session";

const {validatorNewUserData, validatorLogIn} = validators

@injectable()
export class UserService {
    //DI principle
    private usersDataAccessLayer: IUserDataAccessLayer;
    private booksDataAccessLayer: IBookDataAccessLayer;

    constructor(usersDataAccessLayer: IUserDataAccessLayer, booksDataAccessLayer: IBookDataAccessLayer) {
        this.usersDataAccessLayer = usersDataAccessLayer;
        this.booksDataAccessLayer = booksDataAccessLayer;
    };

    public async createNewUser(email: string, userName: string, password: string, res: Response) {
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

                    await this.usersDataAccessLayer.createNewUser(newUserData)

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
    };

    public async logIn(email: string, password: string, req: Request, res: Response) {

        const {errors, valid} = validatorLogIn(email, password);

        const user = await this.usersDataAccessLayer.findOneUserByEmail(email);

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
                    const isMatch = await bcrypt.compare(password, user.password);

                    //Unless a user password incorrect a user get error message
                    if (!isMatch) {
                        res.status(401).json({
                            errors: ["Wrong credentials 🆘"],
                        })
                    } else {
                        //Set cookie
                        res.cookie("cls", SESSION, {
                            maxAge: MAX_AGE,
                            secure: DEV_MODE === "production",
                            //https://web.dev/samesite-cookies-explained/
                            sameSite: DEV_MODE === "production" ? "none" : "lax"
                        });
                        //Response
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
    };

    public async logOut(req: Request, res: Response) {

        try {
            //Clear cookie
            res.clearCookie('cls', {path: "/"});

            res.status(200).json({
                message: "Logged out successfully"
            });
        } catch (error) {
            res.status(500).json({
                errors: [error],
                message: "Some error"
            })
        }
    };

    public async autoChecker(req: Request, res: Response) {
        const cookies = req.cookies
        try {
            if (cookies) {
                if (cookies.cls === SESSION) {
                    res.status(200).json({
                        message: "🟢 Authorized"
                    })
                } else {
                    res.status(401).json({message: "🔴 Unauthorized"});
                }
            } else {
                res.status(401).json({message: "🔴 Unauthorized"});
            }
        } catch (error) {
            res.status(500).json({
                errors: [error],
                message: "Some error"
            })
        }
    };

    public async addBookUserBooksCollection(userId: string, bookId: string, res: Response) {


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

                await this.usersDataAccessLayer.addBookUserCollection(userId, bookId)

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
    };

    public async deleteBookUserBooksCollection(userId: string, bookId: string, res: Response) {

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
                await this.usersDataAccessLayer.deleteBookUserCollection(userId, bookId)

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
    };

    public async getUsers(res: Response) {
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
    };

    public async updateUserName(userId: string, title: string, res: Response) {

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
    };

}