import {Request, Response} from "express";
import fs from "fs";
import path from "path";
import {coverImageBasePath} from "../models/book_model";
import {injectable} from "tsyringe";
import {IImageDataAccessLayer} from "./types";

const uploadPath = path.join('public', coverImageBasePath)

@injectable()
export class ImageService {
    private imagesDataAccessLayer: IImageDataAccessLayer

    constructor(imagesDataAccessLayer: IImageDataAccessLayer) {
        this.imagesDataAccessLayer = imagesDataAccessLayer
    }

    async getImages (req: Request, res: Response,) {

        const images = await this.imagesDataAccessLayer.getImages()

        res.status(200).json({
            images: images,
        })
    }

    async uploadImage(req: Request, res: Response) {

        const url = req.protocol + '://' + req.get('host')

        try {
            if (req.file !== null && req.file !== undefined) {
                const file = await req.file
                const filePath = `${url}/${uploadPath}/${file.filename}`

                const createdImage = await this.imagesDataAccessLayer.createImage(file.filename, filePath)

                res.status(200).json({
                    image: createdImage,
                    message: 'File uploaded successfully 🟢'
                })
            } else {
                res.status(400).json({
                    errors: ['No file uploaded'],
                    message: 'Bad request 🔴'
                })
            }
        } catch (error) {
            res.status(500).json({
                errors: [...error],
                message: 'Some error 🔴'
            })
        }
    }

    //Delete uploaded image file when session expired
    async deleteUploadedImage(imageId: string, res: Response) {

        const isUploadedFile = await this.imagesDataAccessLayer.deleteImage(imageId)

        try {
            if (isUploadedFile) {
                //Delete uploaded image
                fs.unlinkSync(path.join(uploadPath, isUploadedFile.fileName))

                res.status(400).json({
                    errors: ['Session expired'],
                    message: 'Please upload book image again the uploaded image has been deleted'
                })
            } else {
                res.status(400).json({
                    errors: ['Image Id not exist'],
                    message: 'Bad request 🤬'
                })
            }
        } catch (error) {
            res.status(500).json({
                errors: [{...error}],
                message: 'Image Id not valid 🤬'
            })
        }
    }
}
