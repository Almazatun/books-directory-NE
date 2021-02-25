import {Request, Response} from "express";
import ImagesBLL from "../services/images_bll";

const uploadImage = async (req: Request, res: Response) => {

    console.log('UPLOAD_IMAGE', req.body)

    await ImagesBLL.uploadImage(req, res)
}

const deleteUploadedImage = async (req: Request, res: Response) => {
    const imageId = req.params.id
    await ImagesBLL.deleteUploadedImage(imageId, res)
}

const getImages = async (req: Request, res: Response) => {
    await ImagesBLL.getImages(req, res)
}

export default {
    uploadImage,
    deleteUploadedImage,
    getImages
}