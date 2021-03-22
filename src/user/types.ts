import {INewUserData} from "./user.dal";
import {Promise} from "mongoose";
import {IUser} from "../models/user_model";

export interface IUserDataAccessLayer {

    createNewUser(newUserData: INewUserData): Promise<IUser>

    updateUserData(userId: string, title: string): Promise<IUser | null>

    addBookUserCollection(userId: string, bookId: string): Promise<any>

    deleteBookUserCollection(userId: string, bookId: string): Promise<any>


    findOneUserByEmail(email: string): Promise<IUser | null>

    findBookUserCollection(userId: string, bookId: string): Promise<object>

    findOneUserById(userId: string): Promise<IUser | null>

    getAllUsers(): Promise<Array<IUser>>
}