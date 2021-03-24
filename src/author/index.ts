import {AuthorsController} from "./author_controller";
import {AuthorService} from "./author_service";
import {AuthorDataAccessLayer} from "./author_dal";

export const authorController = new AuthorsController(
    new AuthorService(
        new AuthorDataAccessLayer(),
    ),
)