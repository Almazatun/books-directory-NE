import Image from "../models/image_model";
import {IImageDataAccessLayer} from "./types";

export class ImageDataAccessLayer implements IImageDataAccessLayer {

    public async getImages() {
        const images = await Image.find()

        return images
    }

    public async createImage(fileName: string, filePath: string) {

        const newImage = new Image({
            fileName: fileName,
            filePath: filePath
        })

        const savedImage = await newImage.save()

        return savedImage
    }

    public async deleteImage(imageId: string) {
        const deletedImage = await Image.findByIdAndDelete({_id: imageId})

        return deletedImage
    }

}
