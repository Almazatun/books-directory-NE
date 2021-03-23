import {ImageDataAccessLayer} from "./image_dal";
import {ImageController} from "./image_controller";
import {ImageService} from "./image_service";

export const imageController = new ImageController(
    new ImageService(
        new ImageDataAccessLayer(),
    ),
)