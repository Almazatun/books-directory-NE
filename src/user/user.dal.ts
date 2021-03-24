import User from "../models/user_model";
import bcrypt from 'bcrypt'
import {INewUserData, IUserDataAccessLayer} from "./types";

export class UserDataAccessLayer implements IUserDataAccessLayer {

    public async createNewUser(newUserData: INewUserData) {

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
    };

    public async updateUserData(userId: string, title: string) {

        const updatedUserData = await User.findByIdAndUpdate(userId, {userName: title}, {new: true})
            .populate(
                {
                    path: "userBooks",
                    populate: {
                        path: "imageBook", select: 'filePath',
                    },
                })
            .populate({
                path: "userBooks",
                populate: {
                    path: "authorBook", select: ['firstName', 'lastName'],
                },
            })

        return updatedUserData
    };

    public async addBookUserCollection(userId: string, bookId: string) {

        // @ts-ignore
        //Have no idea how fix that the issue
        //{_id: userId}  TS2322: Type 'string' is not assignable to type 'Condition '
        const updatedUserData = await User.update({_id: userId}, {

            //$pull option
            //https://docs.mongodb.com/manual/reference/operator/update/pull/
            $push: {
                userBooks: bookId
            }
        })
            //multiply level populate
            //https://mongoosejs.com/docs/populate.html#deep-populate
            .populate(
                {
                    path: "userBooks",
                    populate: {
                        path: "imageBook", select: 'filePath',
                    },
                })
            .populate({
                path: "userBooks",
                populate: {
                    path: "authorBook", select: ['firstName', 'lastName'],
                },
            }).exec();

        return updatedUserData
    };

    public async deleteBookUserCollection(userId: string, bookId: string) {

        // @ts-ignore
        //Have no idea how fix that the issue
        //{_id: userId}  TS2322: Type 'string' is not assignable to type 'Condition '
        const updatedUserData = await User.update({_id: userId}, {

            //$pull option
            //https://docs.mongodb.com/manual/reference/operator/update/pull/
            $pull: {
                userBooks: bookId
            }
        })
            .populate(
                {
                    path: "userBooks",
                    populate: {
                        path: "imageBook", select: 'filePath',
                    },
                })
            .populate({
                path: "userBooks",
                populate: {
                    path: "authorBook", select: ['firstName', 'lastName'],
                },
            }).exec();


        return updatedUserData
    };


    public async findOneUserByEmail(email: string) {

        const foundUser = await User.findOne({email}).exec()

        return foundUser
    }

    public async findBookUserCollection(userId: string, bookId: string) {

        // @ts-ignore
        const foundBookUserCollection = await User.find({_id: userId},
            {
                userBooks: bookId,
            })

        const foundBookId: object = foundBookUserCollection[0].userBooks

        return foundBookId

    };

    public async findOneUserById(userId: string) {

        const foundUser = await User.findById(userId)

        return foundUser

    };

    public async getAllUsers() {
        const users = await User.find()
            .populate(
                {
                    path: "userBooks",
                    populate: {
                        path: "imageBook", select: 'filePath',
                    },
                })
            .populate({
                path: "userBooks",
                populate: {
                    path: "authorBook", select: ['firstName', 'lastName'],
                },
            })

        return users
    };

}
