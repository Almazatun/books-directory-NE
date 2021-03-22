import {Request, Response, Router} from "express";
import {autoInjectable} from "tsyringe";
import {UserService} from "./user_service";
import {authMe} from "../hellpers/authMe";

@autoInjectable()
export class UserController {
    private usersService: UserService
    readonly router: Router

    constructor(usersService: UserService) {
        this.usersService = usersService;
        this.router = Router();
    };

    //Register
    public registerUser(req: Request, res: Response): Promise<any> {
        const {email, userName, password} = req.body
        return this.usersService.createNewUser(email, userName, password, res)
    };

    //Log in
    public logInUser(req: Request, res: Response): Promise<any> {
        const {email, password} = req.body
        return this.usersService.logIn(email, password, req, res)
    };

    //Log out
    public logOutUser(req: Request, res: Response): Promise<any>  {
        return this.usersService.logOut(req, res)
    };

    //Auth me
    public authMeUser(req: Request, res: Response): Promise<any>  {
        return this.usersService.autoChecker(req, res)
    };

    //Update userName
    public updateUserName(req: Request, res: Response): Promise<any>  {
        const {title}: { title: string } = req.body

        return this.usersService.updateUserName(req.params.id, title, res)
    };

    public addBookUserCollection(req: Request, res: Response): Promise<any>  {

        const {bookId}: { bookId: string } = req.body

        return this.usersService.addBookUserBooksCollection(req.params.id, bookId, res)
    };

    public deleteBookUserCollection(req: Request, res: Response): Promise<any>  {

        return this.usersService.deleteBookUserBooksCollection(req.params.id, req.params.bookId, res)
    };

    public routes(){
        this.router.post("/register", (req: Request, res: Response) => this.registerUser(req, res))
        this.router.post("/login", (req: Request, res: Response) => this.logInUser(req, res))
        this.router.delete("/logout", (req: Request, res: Response) => this.logOutUser(req, res))
        this.router.post("/authchecker", (req: Request, res: Response) => this.authMeUser(req, res))
        this.router.put("/user/:id/addbook", authMe, (req: Request, res: Response) => this.addBookUserCollection(req, res))
        this.router.delete("/user/:id/deletebook/:bookId", authMe, (req: Request, res: Response) => this.deleteBookUserCollection(req, res))
        this.router.put("/user/:id/update", authMe, (req: Request, res: Response) => this.updateUserName(req, res))
        //
        return  this.router
    };
}