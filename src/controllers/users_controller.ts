import {Request, Response} from "express";
import UsersBLL from "../services/users_bll";

//Register
const registerUser = async (req: Request, res: Response) => {
    const {email, userName, password} = req.body
    await UsersBLL.createNewUser(email, userName, password, res)
}

//Log in
const logInUser = async (req: Request, res: Response) => {
    const {email, password} = req.body
    await UsersBLL.logIn(email, password, req, res)
}

//Log out
const logOutUser = async (req: Request, res: Response) => {
    await UsersBLL.logOut(req, res)
}

//Auth me
const authMeUser = async (req: Request, res: Response) => {
 await UsersBLL.autoChecker(req, res)
}

//Update userName
const updateUserName = async (req: Request, res: Response) => {
    const {title}: {title: string} = req.body

    await UsersBLL.updateUserName(req.params.id, title, res)
}

const addBookUserCollection = async (req: Request, res: Response) => {

    const {bookId}: {bookId: string} = req.body

    await UsersBLL.addBookUserBooksCollection(req.params.id, bookId, res)
}

const deleteBookUserCollection = async (req: Request, res: Response) => {

    const {bookId}: {bookId: string} = req.body

    await UsersBLL.deleteBookUserBooksCollection(req.params.id, bookId, res)
}

// const getUsers = async (req: Request, res: Response) => {
//     await UsersBLL.getUsers(res)
// }


export default {
    registerUser,
    logInUser,
    logOutUser,
    authMeUser,
    updateUserName,
    addBookUserCollection,
    deleteBookUserCollection,
    //
    //getUsers
}