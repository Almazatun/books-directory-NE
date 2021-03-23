import {IAuthor} from "../models/author_model";

export interface IAuthorDataAccessLayer {
    saveNewAuthorDB(firstName: string, lastName: string): Promise<any>

    deleteAuthorDB(authorId: string): Promise<IAuthor | null>

    getAllAuthors(): Promise<Array<IAuthor>>

    searchAuthorsByFistName(firstName: string): Promise<Array<IAuthor>>

    findOneAuthorByLastName(lastName: string): Promise<IAuthor | null>
}