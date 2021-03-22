import {UserController} from "./user_controller";
import {UserService} from "./user_service";
import {UserDataAccessLayer} from "./user.dal";
import {BookDataAccessLayer} from "../book/book_dal";

export const userController = new UserController(
    new UserService(
        new UserDataAccessLayer(),
        new BookDataAccessLayer()
    ),
)