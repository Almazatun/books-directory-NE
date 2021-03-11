import Author from "../models/author_model";

export class AuthorsDataAccessLayer {

    async saveNewAuthorDB(firstName: string, lastName: string) {
        const newAuthor = new Author({
            firstName: firstName,
            lastName: lastName,
        })

        const savedAuthor = await newAuthor.save()

        return savedAuthor
    }

    async deleteAuthorDB(authorId: string) {
        const deleteAuthor = await Author.findByIdAndDelete({_id: authorId})

        return deleteAuthor
    }
    //In the method included searching option
    async getAllAuthors () {
        const authors = await Author.find()

        return authors
    }

    async searchAuthorsByFistName (firstName: string) {
        //Use Regular expression to find particular author or authors
        const searchAuthor = new RegExp(firstName, "i")

        const foundAuthors = await Author.find({firstName: searchAuthor})

        return foundAuthors
    }

    async findOneAuthorByLastName (lastName: string) {

        const foundAuthor = await Author.findOne({lastName}).exec()

        return foundAuthor
    }
}
