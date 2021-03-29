import multer from "multer";
import {Request} from "express";
import {uuid} from "uuidv4";


//Directory where will be storage images
export const uploadPath = 'public'

//Multer options
//https://github.com/expressjs/multer
export const storage = multer.diskStorage({
    destination: function (req: Request, file: Express.Multer.File, cb) {
        cb(null, uploadPath)
    },
    filename: function(req, file, cb){
        cb(null,uuid() + "_" + Date.now() + "_" + file.originalname.toLowerCase());
    }
});

//Multer option to control which format file should be accepted
const allowedFileTypes = ['image/jpeg', 'image/svg', 'image/png', 'image/svg'];

function filterFile (req: Request, file: Express.Multer.File, callback: multer.FileFilterCallback) {
    callback(null, allowedFileTypes.includes(file.mimetype))
}

export const upload = multer({
    storage: storage,
    fileFilter: filterFile,
    limits: {
        fieldSize: 1000000
    }
})