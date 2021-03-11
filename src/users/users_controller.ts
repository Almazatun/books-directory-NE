import {Request, Response, Router} from "express";
import {autoInjectable} from "tsyringe";
import {UsersService} from "./users_service";
import {authMe} from "../hellpers/authMe";

@autoInjectable()
export class UsersController {
    usersService: UsersService
    router: Router

    constructor(usersService: UsersService) {
        this.usersService = usersService;
        // @ts-ignore
        this.router = new Router();
    }

    //Register
    registerUser(req: Request, res: Response) {
        const {email, userName, password} = req.body
        return this.usersService.createNewUser(email, userName, password, res)
    }

    //Log in
    logInUser(req: Request, res: Response) {
        const {email, password} = req.body
        return this.usersService.logIn(email, password, req, res)
    }

    //Log out
    logOutUser(req: Request, res: Response) {
        return this.usersService.logOut(req, res)
    }

    //Auth me
    authMeUser(req: Request, res: Response) {
        return this.usersService.autoChecker(req, res)
    }

    //Update userName
    updateUserName(req: Request, res: Response) {
        const {title}: { title: string } = req.body

        return this.usersService.updateUserName(req.params.id, title, res)
    }

    addBookUserCollection(req: Request, res: Response) {

        const {bookId}: { bookId: string } = req.body

        return this.usersService.addBookUserBooksCollection(req.params.id, bookId, res)
    }

    deleteBookUserCollection(req: Request, res: Response) {

        return this.usersService.deleteBookUserBooksCollection(req.params.id, req.params.bookId, res)
    }

    routes(){
        this.router.post("/register", (req: Request, res: Response) => this.registerUser(req, res))
        this.router.post("/login", (req: Request, res: Response) => this.logInUser(req, res))
        this.router.delete("/logout", (req: Request, res: Response) => this.logOutUser(req, res))
        this.router.post("/authchecker", (req: Request, res: Response) => this.authMeUser(req, res))
        this.router.put("/user/:id/addbook", authMe, (req: Request, res: Response) => this.addBookUserCollection(req, res))
        this.router.delete("/user/:id/deletebook/:bookId", authMe, (req: Request, res: Response) => this.deleteBookUserCollection(req, res))
        this.router.put("/user/:id/update", authMe, (req: Request, res: Response) => this.updateUserName(req, res))

        return  this.router
    }
}