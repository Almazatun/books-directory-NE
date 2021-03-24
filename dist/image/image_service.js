"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImageService = void 0;
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
var book_model_1 = require("../models/book_model");
var tsyringe_1 = require("tsyringe");
var uploadPath = path_1.default.join('public', book_model_1.coverImageBasePath);
var ImageService = /** @class */ (function () {
    function ImageService(imagesDataAccessLayer) {
        this.imageDataAccessLayer = imagesDataAccessLayer;
    }
    ImageService.prototype.getImages = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var images;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.imageDataAccessLayer.getImages()];
                    case 1:
                        images = _a.sent();
                        res.status(200).json({
                            images: images,
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    ImageService.prototype.uploadImage = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var url, file, filePath, createdImage, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = req.protocol + '://' + req.get('host');
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 6, , 7]);
                        if (!(req.file !== null && req.file !== undefined)) return [3 /*break*/, 4];
                        return [4 /*yield*/, req.file];
                    case 2:
                        file = _a.sent();
                        filePath = url + "/" + uploadPath + "/" + file.filename;
                        return [4 /*yield*/, this.imageDataAccessLayer.createImage(file.filename, filePath)];
                    case 3:
                        createdImage = _a.sent();
                        res.status(200).json({
                            image: createdImage,
                            message: 'File uploaded successfully 🟢'
                        });
                        return [3 /*break*/, 5];
                    case 4:
                        res.status(400).json({
                            errors: ['No file uploaded'],
                            message: 'Bad request 🔴'
                        });
                        _a.label = 5;
                    case 5: return [3 /*break*/, 7];
                    case 6:
                        error_1 = _a.sent();
                        res.status(500).json({
                            errors: __spreadArrays(error_1),
                            message: 'Some error 🔴'
                        });
                        return [3 /*break*/, 7];
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    //Delete uploaded image file when session expired
    ImageService.prototype.deleteUploadedImage = function (imageId, res) {
        return __awaiter(this, void 0, void 0, function () {
            var isUploadedFile;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.imageDataAccessLayer.deleteImage(imageId)];
                    case 1:
                        isUploadedFile = _a.sent();
                        try {
                            if (isUploadedFile) {
                                //Delete uploaded image
                                fs_1.default.unlinkSync(path_1.default.join(uploadPath, isUploadedFile.fileName));
                                res.status(400).json({
                                    errors: ['Session expired'],
                                    message: 'Please upload book image again the uploaded image has been deleted'
                                });
                            }
                            else {
                                res.status(400).json({
                                    errors: ['Image Id not exist'],
                                    message: 'Bad request 🤬'
                                });
                            }
                        }
                        catch (error) {
                            res.status(500).json({
                                errors: [__assign({}, error)],
                                message: 'Image Id not valid 🤬'
                            });
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    ImageService = __decorate([
        tsyringe_1.injectable(),
        __metadata("design:paramtypes", [Object])
    ], ImageService);
    return ImageService;
}());
exports.ImageService = ImageService;
//# sourceMappingURL=image_service.js.map