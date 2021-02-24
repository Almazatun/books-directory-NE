import {IUploadFile} from "../../src/services/images_bll";

declare global{
    namespace Express {
        export  interface Request {
            uploadFile: IUploadFile
        }
    }
}