import express from "express";
import controller from '../controllers/books'
import {upload} from "../utils/multerStorage";

const router = express.Router();

//Get all books
router.get("/", controller.getAllBooks)

//Create new book
router.post("/new", controller.createNewBook)

//Upload new book image
router.post("/upload", upload.single('cover'), controller.uploadBookImage)

//Delete uploaded image file
router.delete("/uploaded", controller.deleteUploadedFile)

//Delete book
router.delete("/delete/:id" ,controller.deleteBook)

export default router;
