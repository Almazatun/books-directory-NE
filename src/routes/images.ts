import express from "express";
import controller from '../controllers/images_controller'
import {upload} from "../utils/multerStorage";

const router = express.Router();

//Upload new book image
router.post("/upload", upload.single('cover'), controller.uploadImage)

//Delete uploaded image file
router.delete("/uploaded/delete/:id", controller.deleteUploadedImage)


export default router;
