import {BookService} from "./book_service";
import {BookController} from "./book_controller";
import {BookDataAccessLayer} from "./book_dal";

export const bookController = new BookController(
    new BookService(
        new BookDataAccessLayer(),
        {} as any
    ),
)