import mongoose, {Schema, Document} from 'mongoose'


export interface IImage extends Document {
    _id: Schema.Types.ObjectId
    fileName: string
    filePath: string
    createAt: string
    _doc?: object
}

const ImageSchema: Schema = new Schema({
    fileName: {
        type: String,
        required: true
    },
    filePath: {
        type: String,
        required: true
    },
    createAt: {
        type: String,
        required: true,
        default: new Date().toISOString()
    }
})


export default mongoose.model<IImage>('Image', ImageSchema)