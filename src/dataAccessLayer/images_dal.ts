import Image from "../models/image_model";

class Images {

    async createImage(fileName: string, filePath: string) {

        const newImage = new Image({
            fileName: fileName,
            filePath: filePath
        })

        const savedImage = await newImage.save()

        return savedImage
    }

    async deleteImage(imageId: string) {
        const deletedImage = await Image.findByIdAndDelete({_id: imageId})

        return deletedImage
    }

}

const ImagesDAL = new Images
export default ImagesDAL
