import {Request, Response} from "express";
import ImagesBLL from "../services/images_bll";

const uploadImage = async (req: Request, res: Response) => {
    await ImagesBLL.uploadImage(req, res)
}

const deleteUploadedImage = async (req: Request, res: Response) => {
    const imageId = req.params.id
    await ImagesBLL.deleteUploadedImage(imageId, res)
}

export default {
    uploadImage,
    deleteUploadedImage
}