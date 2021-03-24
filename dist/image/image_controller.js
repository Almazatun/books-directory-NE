"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImageController = void 0;
var express_1 = require("express");
var tsyringe_1 = require("tsyringe");
var image_service_1 = require("./image_service");
var authMe_1 = require("../hellpers/authMe");
var privateRoutes_1 = require("../configs/privateRoutes");
var multerStorage_1 = require("../utils/multerStorage");
var ImageController = /** @class */ (function () {
    function ImageController(imagesService) {
        this.imageService = imagesService;
        this.router = express_1.Router();
    }
    ImageController.prototype.uploadImage = function (req, res) {
        console.log('UPLOAD_IMAGE', req.body);
        return this.imageService.uploadImage(req, res);
    };
    ;
    ImageController.prototype.deleteUploadedImage = function (req, res) {
        var imageId = req.params.id;
        return this.imageService.deleteUploadedImage(imageId, res);
    };
    ;
    ImageController.prototype.getImage = function (req, res) {
        return this.imageService.getImages(req, res);
    };
    ;
    ImageController.prototype.routes = function () {
        var _this = this;
        this.router.get(privateRoutes_1.IMAGES_ROUTE_URL_GET, function (req, res) { return _this.getImage(req, res); });
        this.router.post("/upload", authMe_1.authMe, multerStorage_1.upload.single('cover'), function (req, res) { return _this.uploadImage(req, res); });
        this.router.delete(privateRoutes_1.IMAGES_ROUTE_URL_DELETE, authMe_1.authMe, function (req, res) { return _this.deleteUploadedImage(req, res); });
        return this.router;
    };
    ;
    ImageController = __decorate([
        tsyringe_1.autoInjectable(),
        __metadata("design:paramtypes", [image_service_1.ImageService])
    ], ImageController);
    return ImageController;
}());
exports.ImageController = ImageController;
//# sourceMappingURL=image_controller.js.map