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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookService = void 0;
var validators_1 = __importDefault(require("../utils/validators"));
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
var book_model_1 = require("../models/book_model");
var tsyringe_1 = require("tsyringe");
//
var validatorCreateNewBook = validators_1.default.validatorCreateNewBook;
var uploadPath = path_1.default.join('public', book_model_1.coverImageBasePath);
var BookService = /** @class */ (function () {
    function BookService(booksDataAccessLayer, imagesDataAccessLayer) {
        this.booksDataAccessLayer = booksDataAccessLayer;
        this.imagesDataAccessLayer = imagesDataAccessLayer;
    }
    ;
    BookService.prototype.getAllBooks = function (title, publishBefore, publishAfter, res) {
        return __awaiter(this, void 0, void 0, function () {
            var books, searchTitle, searchPublishBefore, searchPublishAfter, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        searchTitle = title ? title : '';
                        searchPublishBefore = publishBefore ? publishBefore : '';
                        searchPublishAfter = publishAfter ? publishAfter : '';
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 10, , 11]);
                        if (!(title !== null && title !== "" && title !== undefined)) return [3 /*break*/, 3];
                        console.log('SEARCH_OPTIONS');
                        return [4 /*yield*/, this.booksDataAccessLayer.searchBooks(searchTitle, searchPublishBefore, searchPublishAfter)];
                    case 2:
                        //Search option
                        books = _a.sent();
                        res.status(200).json({
                            books: books,
                            searchingOption: title
                        });
                        return [3 /*break*/, 9];
                    case 3:
                        if (!(publishBefore !== null && publishBefore !== "" && publishBefore !== undefined)) return [3 /*break*/, 5];
                        return [4 /*yield*/, this.booksDataAccessLayer.searchBooks(searchTitle, searchPublishBefore, searchPublishAfter)];
                    case 4:
                        books = _a.sent();
                        res.status(200).json({
                            books: books,
                            searchingOption: title
                        });
                        return [3 /*break*/, 9];
                    case 5:
                        if (!(publishAfter !== null && publishAfter !== "" && publishAfter !== undefined)) return [3 /*break*/, 7];
                        return [4 /*yield*/, this.booksDataAccessLayer.searchBooks(searchTitle, searchPublishBefore, searchPublishAfter)];
                    case 6:
                        books = _a.sent();
                        res.status(200).json({
                            books: books,
                            searchingOption: title
                        });
                        return [3 /*break*/, 9];
                    case 7:
                        console.log('GET_ALL_BOOKS');
                        return [4 /*yield*/, this.booksDataAccessLayer.getAllBooks()];
                    case 8:
                        books = _a.sent();
                        res.status(200).json({
                            books: books,
                            searchingOption: ''
                        });
                        _a.label = 9;
                    case 9: return [3 /*break*/, 11];
                    case 10:
                        error_1 = _a.sent();
                        res.status(500).json({
                            errors: [__assign({}, error_1)],
                            message: "Some error"
                        });
                        return [3 /*break*/, 11];
                    case 11: return [2 /*return*/];
                }
            });
        });
    };
    ;
    BookService.prototype.createNewBook = function (res, newBookData) {
        return __awaiter(this, void 0, void 0, function () {
            var title, pageCount, publishDate, _a, errors, valid, foundedBook, savedBook, error_2;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        title = newBookData.title, pageCount = newBookData.pageCount, publishDate = newBookData.publishDate;
                        _a = validatorCreateNewBook(title, pageCount, publishDate), errors = _a.errors, valid = _a.valid;
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 8, , 9]);
                        if (!valid) return [3 /*break*/, 6];
                        return [4 /*yield*/, this.booksDataAccessLayer.findExistBook(title)];
                    case 2:
                        foundedBook = _b.sent();
                        if (!foundedBook) return [3 /*break*/, 3];
                        res.status(400).json({
                            errors: ['This is book already exist 📚'],
                            message: 'Bad request 🔴'
                        });
                        return [3 /*break*/, 5];
                    case 3: return [4 /*yield*/, this.booksDataAccessLayer.createNewBook(newBookData)];
                    case 4:
                        savedBook = _b.sent();
                        res.status(200).json({
                            book: savedBook,
                            message: '➕ Book created successfully',
                        });
                        _b.label = 5;
                    case 5: return [3 /*break*/, 7];
                    case 6:
                        res.status(400).json({
                            errors: [errors],
                            message: 'Bad request 🔴'
                        });
                        _b.label = 7;
                    case 7: return [3 /*break*/, 9];
                    case 8:
                        error_2 = _b.sent();
                        if (Object.keys(error_2).length >= 1) {
                            res.status(500).json({
                                errors: [error_2],
                                message: "Some error"
                            });
                        }
                        else {
                            res.status(400).json({
                                errors: ['Book image should be required'],
                                message: 'Bad request 🔴'
                            });
                        }
                        return [3 /*break*/, 9];
                    case 9: return [2 /*return*/];
                }
            });
        });
    };
    ;
    BookService.prototype.deleteBook = function (bookId, res) {
        return __awaiter(this, void 0, void 0, function () {
            var deletedBookResult, deletedImage, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.booksDataAccessLayer.deleteBook(bookId)];
                    case 1:
                        deletedBookResult = _a.sent();
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 6, , 7]);
                        if (!deletedBookResult) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.imagesDataAccessLayer.deleteImage(String(deletedBookResult.imageBook))];
                    case 3:
                        deletedImage = _a.sent();
                        if (deletedImage) {
                            //Delete image file
                            fs_1.default.unlinkSync(path_1.default.join(uploadPath, deletedImage.fileName));
                            //file removed
                            res.json({
                                book: deletedBookResult,
                                message: 'Book has been deleted successfully 🟢'
                            });
                        }
                        else {
                            res.status(400).json({
                                errors: ['Book Id not exist'],
                                message: 'Bad request 🤬'
                            });
                        }
                        return [3 /*break*/, 5];
                    case 4:
                        res.status(400).json({
                            errors: ['Book Id not exist'],
                            message: 'Bad request 🤬'
                        });
                        _a.label = 5;
                    case 5: return [3 /*break*/, 7];
                    case 6:
                        error_3 = _a.sent();
                        res.status(500).json({
                            errors: [__assign({}, error_3)],
                            message: 'Book Id not valid 🤬'
                        });
                        return [3 /*break*/, 7];
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    ;
    BookService = __decorate([
        tsyringe_1.injectable(),
        __metadata("design:paramtypes", [Object, Object])
    ], BookService);
    return BookService;
}());
exports.BookService = BookService;
//# sourceMappingURL=book_service.js.map