import mongoose, {Schema, Document} from 'mongoose'

//Storage images path
export const coverImageBasePath = "uploads/bookCovers"

export interface IBook extends Document {
    _id: Schema.Types.ObjectId
    title: string
    authorBook: Schema.Types.ObjectId
    description: string
    pageCount: number
    publishDate: Date
    createAt: string
    imageBook: Schema.Types.ObjectId
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
        type: Date,
        required: true
    },
    authorBook: {
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
    imageBook: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Image'
    }
})


export default mongoose.model<IBook>('Book', BookSchema)