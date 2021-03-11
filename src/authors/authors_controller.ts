import {Request, Response, Router} from "express";
import {AuthorsService} from "./authors_service";
import {autoInjectable} from 'tsyringe';
import {authMe} from "../hellpers/authMe";
import {IAuthor} from "../models/author_model";


@autoInjectable()
export class AuthorsController {
    authorsService: AuthorsService
    router: Router;

    constructor(authorsService: AuthorsService) {
        this.authorsService = authorsService
        // @ts-ignore
        this.router = new Router();
    }

    //Get all authors or particular author
    //Included searching option
     getAllAuthors (req: Request, res: Response) {
        const {firstName}: { [key: string]: unknown } = req.query
        return  this.authorsService.getAuthors(firstName, res)
    }

    //Crate new author
    createNewAuthor (req: Request, res: Response) {
        const {firstName, lastName} = req.body
        return this.authorsService.createNewAuthor(firstName,lastName, res)
    }

    //Delete author
    deleteAuthor (req: Request, res: Response) {
        return  this.authorsService.deleteAuthor(req.params.id, res)
    }

    routes(){
        this.router.get("/", (req: Request, res: Response) => this.getAllAuthors(req, res))
        this.router.post("/new", authMe, (req: Request, res: Response) => this.createNewAuthor(req, res))
        this.router.delete("/delete/:id", authMe, (req: Request, res: Response) => this.deleteAuthor(req, res))

        return this.router
    }
}
