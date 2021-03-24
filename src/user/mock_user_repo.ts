import {INewUserData, IUserDataAccessLayer, IUserMock} from "./types";
import {IUser} from "../models/user_model";
import {IBook} from "../models/book_model";


export class MockUserRepo implements IUserDataAccessLayer {

    private dbUser: {users: Array<IUser & any>} = {
        users: [
            {
                id: "1",
                userName: "Person1",
                userBooks: [],
                email: "person1@gmail.com",
                password: "person112345@",
                createdAt: "2021",
                _doc: {}
            } as any,
            {
                id: "2",
                userName: "Person2",
                userBooks: [],
                email: "person2@gmail.com",
                password: "person212345@",
                createdAt: "2021",
                _doc: {}
            } as any
        ]
    };

    constructor() {}

    async createNewUser (newUserData: INewUserData) {
        const {email, userName, password} = newUserData;

        const newUser:IUser & any = {
            email,
            userName,
            password,
            userBooks: [],
            createdAt: "2021"
        };

        this.dbUser.users.push(newUser);
        return newUser
    };

    async updateUserData (userId: string, title: string) {
        const updatedUserData =  this.dbUser.users.find(user => {
           return user._id === userId ? {...user, title: title} : user
       });

        if (updatedUserData)  return updatedUserData
        else return  null
    };

    async addBookUserCollection (userId: string, bookId: string) {
            const book: IBook & any = {
                id: bookId,
                title: `${bookId}`,
                imageBook: `/${bookId}`,
                publishDate: "2021",
            }

            const userIndex = this.dbUser.users.findIndex(user => {
                return user.id === userId
            });

            this.dbUser.users[userIndex].userBooks.push(book);

            return book
    }

    async deleteBookUserCollection (userId: string, bookId: string) {
        const userIndex = this.dbUser.users.findIndex(user => user.id === userId);

        this.dbUser.users[userIndex].userBooks = this.dbUser.users[userIndex].userBooks.filter((book:IUserMock) => {
            return book.id !== bookId
        });

        return this.dbUser.users[userIndex]
    };

    async findOneUserByEmail (email: string) {
        const foundedUserByEmail = this.dbUser.users.find(user => user.email === email);

        if (foundedUserByEmail) return foundedUserByEmail
        else return null
    };

    async findBookUserCollection (userId: string, bookId: string) {
        const userIndex = this.dbUser.users.findIndex(user => user.id === userId);
        const foundBook = this.dbUser.users[userIndex].userBooks.find((book:IUserMock) => book.id === bookId);

        if (foundBook) return foundBook
        else return  {}
    };

    async findOneUserById (userId: string) {
        const foundUser = this.dbUser.users.find(user => user.id === userId);

        if (foundUser) return foundUser
        else return null
    };

    async getAllUsers () {
        return this.dbUser.users
    }

}