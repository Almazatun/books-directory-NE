import {BookService} from "./book_service";
import {BookController} from "./book_controller";
import {BookDataAccessLayer} from "./book_dal";
import {ImageDataAccessLayer} from "../image/image_dal";

export const bookController = new BookController(
    new BookService(
        new BookDataAccessLayer(),
        new ImageDataAccessLayer()
    ),
)