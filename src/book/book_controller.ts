import {Request, Response, Router} from "express";
import {autoInjectable} from "tsyringe";
import {BookService} from "./book_service";
import {authMe} from "../hellpers/authMe";

@autoInjectable()
export class BookController {
    public booksService: BookService;
    readonly router: Router;

    constructor(booksService: BookService) {
        this.booksService = booksService;
        this.router = Router();
    }

    //Get all books or particular book
     public getAllBooks (req: Request, res: Response) {

        const {title, publishBefore, publishAfter}: { [key: string]: unknown } = req.query

        return this.booksService.getAllBooks(title, publishBefore, publishAfter, res)
    };

    //Crate new book
    public createNewBook (req: Request, res: Response) {

        console.log('CREATE_BOOK_BODY', req.body)

        return this.booksService.createNewBook(res, req.body)
    };

    //DeleteBook
    public deleteBook (req: Request, res: Response) {

        return  this.booksService.deleteBook(req.params.id, res)
    };

    public routes(){
        this.router.get("/", authMe, (req: Request, res: Response) => this.getAllBooks(req, res))
        this.router.post("/new", authMe, (req: Request, res: Response) => this.createNewBook(req, res))
        this.router.delete("/delete/:id", authMe, (req: Request, res: Response) => this.deleteBook(req, res))

       return  this.router
    };
}