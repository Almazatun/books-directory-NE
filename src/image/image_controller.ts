import {Request, Response, Router} from "express";
import {autoInjectable} from "tsyringe";
import {ImageService} from "./image_bll";
import {authMe} from "../hellpers/authMe";
import {IMAGES_ROUTE_URL_DELETE, IMAGES_ROUTE_URL_GET} from "../configs/privateRoutes";
import {upload} from "../utils/multerStorage";

@autoInjectable()
export class ImageController {
    private imageService: ImageService
    readonly router: Router

    constructor(imagesService: ImageService) {
        this.imageService = imagesService;
        this.router = Router();
    }

     public uploadImage(req: Request, res: Response) {

        console.log('UPLOAD_IMAGE', req.body)

        return this.imageService.uploadImage(req, res)
    };

    public deleteUploadedImage(req: Request, res: Response) {
        const imageId = req.params.id
        return this.imageService.deleteUploadedImage(imageId, res)
    };

    public getImage(req: Request, res: Response) {
        return this.imageService.getImages(req, res)
    };

    public routes() {
        this.router.get(IMAGES_ROUTE_URL_GET, (req: Request, res: Response) => this.getImage(req, res))
        this.router.post("/upload", authMe, upload.single('cover'), (req: Request, res: Response) => this.uploadImage(req, res))
        this.router.delete(IMAGES_ROUTE_URL_DELETE, authMe, (req: Request, res: Response) => this.deleteUploadedImage(req, res))

        return this.router
    };
}