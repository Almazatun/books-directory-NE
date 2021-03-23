import {IImage} from "../models/image_model";


export interface IImageDataAccessLayer {
    getImages(): Promise<IImage[]>

    createImage(fileName: string, filePath: string): Promise<IImage>

    deleteImage(imageId: string): Promise<IImage | null>
}