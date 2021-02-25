import {Response, Request} from "express";
import fs from "fs";
import path from "path";
import {coverImageBasePath} from "../models/book_model";
import ImagesDAL from "../dataAccessLayer/images_dal";
import {ObjectId} from "mongoose";

const uploadPath = path.join('public', coverImageBasePath)

class Images {

    async getImages (req: Request, res: Response,) {

        const images = await ImagesDAL.getImages()

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

                const createdImage = await ImagesDAL.createImage(file.filename, filePath)

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

        const isUploadedFile = await ImagesDAL.deleteImage(imageId)

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

const ImagesBLL = new Images
export default ImagesBLL


//Types
export interface IUploadFile {
   file: ObjectId
}
