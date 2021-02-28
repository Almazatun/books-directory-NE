import mongoose, {Schema, Document} from 'mongoose'

export interface IAuthor extends Document {
    _id: Schema.Types.ObjectId
    firstName: string
    lastName: string
    createdAt: string
    _doc?: object
}

const AuthorSchema: Schema = new Schema({
    firstName: {
       type: String,
       required: true
   },
    lastName: {
        type: String,
        required: true
    },
    createAt: {
        type: String,
        required: true,
        default: new Date().toISOString()
    },
})

export default mongoose.model<IAuthor>('Author', AuthorSchema)