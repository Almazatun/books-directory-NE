import mongoose, {Schema, Document} from 'mongoose'

export interface IAuthor extends Document {
    _id: Schema.Types.ObjectId
    name: string,
    createdAt: string
    _doc?: object
}

const AuthorSchema: Schema = new Schema({
   name: {
       type: String,
       required: true
   },
    createAt: String
})

export default mongoose.model<IAuthor>('Author', AuthorSchema)