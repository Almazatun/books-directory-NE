import Author from "../models/author_model";

class Authors {
    async saveNewUserDB(firstName: string, lastName: string) {
        const newAuthor = new Author({
            fistName: firstName,
            lastName: lastName,
        })

        const savedUser = await newAuthor.save()

        return savedUser
    }

    async deleteUserDB(authorId: string) {
        const deleteUser = await Author.findByIdAndDelete({_id: authorId})

        return deleteUser
    }
    //In the method included searching option
    async getAllAuthors () {
        const authors = await Author.find()

        return authors
    }

    async searchAuthorsByFistName (firstName: string) {
        //Use Regular expression to find particular author or authors
        const searchAuthor = new RegExp(firstName, "i")

        const foundAuthors = await Author.find({fistName: searchAuthor})

        return foundAuthors
    }

    async findOneAuthorByLastName (lastName: string) {

        const foundAuthor = await Author.findOne({lastName}).exec()

        return foundAuthor
    }
}

const AuthorsDAL = new Authors
export default AuthorsDAL