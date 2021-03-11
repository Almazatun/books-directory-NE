import {Request, Response, Router} from "express";
import {autoInjectable} from "tsyringe";
import {BooksService} from "./books_service";
import {authMe} from "../hellpers/authMe";

@autoInjectable()
export class BooksController {
    booksService: BooksService
    router: Router

    constructor(booksService: BooksService) {
        this.booksService = booksService
        // @ts-ignore
        this.router = new Router();
    }

    //Get all books or particular book
     getAllBooks (req: Request, res: Response) {

        const {title, publishBefore, publishAfter}: { [key: string]: unknown } = req.query

        return this.booksService.getAllBooks(title, publishBefore, publishAfter, res)
    }

    //Crate new book
    createNewBook (req: Request, res: Response) {

        console.log('CREATE_BOOK_BODY', req.body)

        return this.booksService.createNewBook(res, req.body)
    }

    //DeleteBook
    deleteBook (req: Request, res: Response) {

        return  this.booksService.deleteBook(req.params.id, res)
    }

    routes(){
        this.router.get("/", (req: Request, res: Response) => this.getAllBooks(req, res))
        this.router.post("/new", authMe, (req: Request, res: Response) => this.createNewBook(req, res))
        this.router.delete("/delete/:id", authMe, (req: Request, res: Response) => this.deleteBook(req, res))

       return  this.router
    }
}