import {NextFunction, Request, Response} from "express";
import ImagesBLL from "../services/images_bll";

const uploadImage = async (req: Request, res: Response, next: NextFunction) => {
    await ImagesBLL.uploadImage(req, res, next)
}

const deleteUploadedImage = async (req: Request, res: Response) => {
    const imageId = req.params.id
    await ImagesBLL.deleteUploadedImage(imageId, res)
}

export default {
    uploadImage,
    deleteUploadedImage
}