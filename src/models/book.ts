import mongoose, {Schema, Document} from 'mongoose'

//Storage images path
export const coverImageBasePath = "uploads/bookCovers"

export interface IBook extends Document {
    _id: Schema.Types.ObjectId
    title: string
    authorName: Schema.Types.ObjectId
    description: string
    pageCount: number
    publishDate: string
    createAt: string
    coverImageName: string
    _doc?: object
}

const BookSchema: Schema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    publishDate: {
        type: String,
        required: true
    },
    authorName: {
        //Referencing to Authors collections
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Author'
    },
    pageCount: {
        type: Number,
        required: true
    },
    createAt: {
        type: String,
        required: true,
        default: new Date().toISOString()
    },
    coverImageName: {
        type: String,
        required: true
    }
})


export default mongoose.model<IBook>('Book', BookSchema)