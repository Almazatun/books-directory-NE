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
exports.ImagesController = void 0;
var express_1 = require("express");
var tsyringe_1 = require("tsyringe");
var images_bll_1 = require("./images_bll");
var authMe_1 = require("../hellpers/authMe");
var privateRoutes_1 = require("../configs/privateRoutes");
var ImagesController = /** @class */ (function () {
    function ImagesController(imagesService) {
        this.imagesService = imagesService;
        // @ts-ignore
        this.router = new express_1.Router();
    }
    ImagesController.prototype.uploadImage = function (req, res) {
        console.log('UPLOAD_IMAGE', req.body);
        return this.imagesService.uploadImage(req, res);
    };
    ImagesController.prototype.deleteUploadedImage = function (req, res) {
        var imageId = req.params.id;
        return this.imagesService.deleteUploadedImage(imageId, res);
    };
    ImagesController.prototype.getImage = function (req, res) {
        return this.imagesService.getImages(req, res);
    };
    ImagesController.prototype.routes = function () {
        var _this = this;
        this.router.get(privateRoutes_1.IMAGES_ROUTE_URL_GET, function (req, res) { return _this.getImage(req, res); });
        this.router.post("/upload", authMe_1.authMe, function (req, res) { return _this.uploadImage(req, res); });
        this.router.delete(privateRoutes_1.IMAGES_ROUTE_URL_DELETE, authMe_1.authMe, function (req, res) { return _this.deleteUploadedImage(req, res); });
        return this.router;
    };
    ImagesController = __decorate([
        tsyringe_1.autoInjectable(),
        __metadata("design:paramtypes", [images_bll_1.ImagesService])
    ], ImagesController);
    return ImagesController;
}());
exports.ImagesController = ImagesController;
//# sourceMappingURL=images_controller.js.map