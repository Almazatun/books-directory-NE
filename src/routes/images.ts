import express from "express";
import controller from '../controllers/images_controller'
import {upload} from "../utils/multerStorage";
import {IMAGES_ROUTE_URL_DELETE, IMAGES_ROUTE_URL_GET} from "../configs/privateRoutes";

const router = express.Router();

router.get(IMAGES_ROUTE_URL_GET,  controller.getImages)

//Upload new book image
router.post("/upload", upload.single('cover'), controller.uploadImage)

//Delete uploaded image file
router.delete(IMAGES_ROUTE_URL_DELETE, controller.deleteUploadedImage)


export default router;
