"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.imageController = void 0;
var image_dal_1 = require("./image_dal");
var image_controller_1 = require("./image_controller");
var image_service_1 = require("./image_service");
exports.imageController = new image_controller_1.ImageController(new image_service_1.ImageService(new image_dal_1.ImageDataAccessLayer()));
//# sourceMappingURL=index.js.map