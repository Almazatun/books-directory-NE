import mongoose, {Schema, Document} from 'mongoose'


export interface IUser extends Document{
    _id?: Schema.Types.ObjectId
    userName: string
    userBooks: Array<string>
    email: string
    password: string
    createdAt: string
    _doc?: object
}


const UserSchema: Schema = new Schema({
    userName: {
        type: String,
        required: true
    },
    userBooks: {
        type: [Schema.Types.ObjectId],
        required: true,
        ref: 'Book'
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    createAt: {
        type: String,
        required: true,
        default: new Date().toISOString()
    },
})


export default mongoose.model<IUser>('User', UserSchema)