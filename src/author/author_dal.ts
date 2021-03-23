import Author from "../models/author_model";
import {IAuthorDataAccessLayer} from "./types";

export class AuthorDataAccessLayer implements IAuthorDataAccessLayer{

    public async saveNewAuthorDB(firstName: string, lastName: string) {
        const newAuthor = new Author({
            firstName: firstName,
            lastName: lastName,
        })

        const savedAuthor = await newAuthor.save()

        return savedAuthor
    }

    public async deleteAuthorDB(authorId: string) {
        const deleteAuthor = await Author.findByIdAndDelete({_id: authorId})

        return deleteAuthor
    }
    //In the method included searching option
    public async getAllAuthors () {
        const authors = await Author.find()

        return authors
    }

    public async searchAuthorsByFistName (firstName: string) {
        //Use Regular expression to find particular author or authors
        const searchAuthor = new RegExp(firstName, "i")

        const foundAuthors = await Author.find({firstName: searchAuthor})

        return foundAuthors
    }

    public async findOneAuthorByLastName (lastName: string) {

        const foundAuthor = await Author.findOne({lastName}).exec()

        return foundAuthor
    }
}
