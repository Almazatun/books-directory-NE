import {Request, Response, Router} from "express";
import {AuthorService} from "./author_service";
import {autoInjectable} from 'tsyringe';
import {authMe} from "../hellpers/authMe";


@autoInjectable()
export class AuthorsController {
    private authorsService: AuthorService
    readonly router: Router;

    constructor(authorsService: AuthorService) {
        this.authorsService = authorsService
        this.router = Router();
    }

    //Get all authors or particular author
    //Included searching option
     public getAllAuthors (req: Request, res: Response) {
        const {firstName}: { [key: string]: unknown } = req.query
        return  this.authorsService.getAuthors(firstName, res)
    }

    //Crate new author
    public createNewAuthor (req: Request, res: Response) {
        const {firstName, lastName} = req.body
        return this.authorsService.createNewAuthor(firstName,lastName, res)
    }

    //Delete author
    public deleteAuthor (req: Request, res: Response) {
        return  this.authorsService.deleteAuthor(req.params.id, res)
    }

    public routes(){
        this.router.get("/", authMe, (req: Request, res: Response) => this.getAllAuthors(req, res))
        this.router.post("/new", authMe, (req: Request, res: Response) => this.createNewAuthor(req, res))
        this.router.delete("/delete/:id", authMe, (req: Request, res: Response) => this.deleteAuthor(req, res))

        return this.router
    }
}
