"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var images_controller_1 = __importDefault(require("../controllers/images_controller"));
var multerStorage_1 = require("../utils/multerStorage");
var privateRoutes_1 = require("../configs/privateRoutes");
var router = express_1.default.Router();
router.get(privateRoutes_1.IMAGES_ROUTE_URL_GET, images_controller_1.default.getImages);
//Upload new book image
router.post("/upload", multerStorage_1.upload.single('cover'), images_controller_1.default.uploadImage);
//Delete uploaded image file
router.delete(privateRoutes_1.IMAGES_ROUTE_URL_DELETE, images_controller_1.default.deleteUploadedImage);
exports.default = router;
//# sourceMappingURL=images.js.map