import {Request, Response, Router} from "express";
import {autoInjectable} from "tsyringe";
import {ImagesService} from "./images_bll";
import {authMe} from "../hellpers/authMe";
import {IMAGES_ROUTE_URL_DELETE, IMAGES_ROUTE_URL_GET} from "../configs/privateRoutes";

@autoInjectable()
export class ImagesController {
    imagesService: ImagesService
    router: Router

    constructor(imagesService: ImagesService) {
        this.imagesService = imagesService
        // @ts-ignore
        this.router = new Router();
    }

    uploadImage(req: Request, res: Response) {

        console.log('UPLOAD_IMAGE', req.body)

        return this.imagesService.uploadImage(req, res)
    }

    deleteUploadedImage(req: Request, res: Response) {
        const imageId = req.params.id
        return this.imagesService.deleteUploadedImage(imageId, res)
    }

    getImage(req: Request, res: Response) {
        return this.imagesService.getImages(req, res)
    }

    routes() {
        this.router.get(IMAGES_ROUTE_URL_GET, (req: Request, res: Response) => this.getImage(req, res))
        this.router.post("/upload", authMe, (req: Request, res: Response) => this.uploadImage(req, res))
        this.router.delete(IMAGES_ROUTE_URL_DELETE, authMe, (req: Request, res: Response) => this.deleteUploadedImage(req, res))

        return this.router
    }
}