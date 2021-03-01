import User from "../models/user_model";
import bcrypt from 'bcrypt'

class Users {
    async createNewUser(newUserData: INewUserData) {

        const {email, password, userName} = newUserData

        //Hashing password
        const hashedPassword = await bcrypt.hash(password, 12)

        const newUser = new User({
            email,
            password: hashedPassword,
            userName,
            userBooks: []
        })

        const createdUser = await newUser.save()

        return createdUser
    }

    async updateUserData (userId: string, userName: string) {
        const updatedUserData = await User.findByIdAndUpdate(userId, {userName}, {new: true})
            .populate('userBooks', ['title', 'publishDate', 'authorBook', 'imageBook'])

        return updatedUserData
    }

    async addBookUserCollection (userId: string, bookId: string) {
        const updatedUserData = await User.findByIdAndUpdate(userId, {userBooks: [bookId]}, {new: true})
            .populate('userBooks', ['title', 'publishDate', 'authorBook', 'imageBook'])

        return updatedUserData
    }

    async deleteBookUserCollection (userId: string, bookId: string) {
        const updatedUserData = await User.findByIdAndUpdate(userId, {userBooks: [bookId].filter(bk => {
            return bk !== bookId
            })}, {new: true})
            .populate('userBooks', ['title', 'publishDate', 'authorBook', 'imageBook'])

        return updatedUserData
    }


    async findOneUserByEmail (email: string) {

        const foundUser = await User.findOne({email}).exec()

        return foundUser
    }

    async findOneUserByUserName (userName: string) {

        const foundUser = await User.findOne({userName}).exec()

        return foundUser
    }

}

const UsersDAL = new Users()
export default UsersDAL

//Types

export interface INewUserData {
    email: string
    userName: string
    password: string
}
