import path from "path";
import {coverImageBasePath} from "../models/book";
import multer from "multer";
import {Request} from "express";
import {uuid} from "uuidv4";


//Directory where will be storage images
export const uploadPath = path.join('public', coverImageBasePath)

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
const allowedFileTypes = ['image/jpeg', 'image/svg', 'image/png', 'image/svg']

export const upload = multer({
    storage: storage,
    fileFilter: function (req: Request, file: Express.Multer.File, callback: multer.FileFilterCallback) {
        callback(null, allowedFileTypes.includes(file.mimetype))
    },
    limits: {
        fieldSize: 1000000
    }
})