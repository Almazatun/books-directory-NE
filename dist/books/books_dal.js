"use strict";
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
exports.SEARCH = exports.BooksDataAccessLayer = void 0;
var book_model_1 = __importDefault(require("../models/book_model"));
var searchStatements_1 = require("../utils/searchStatements");
var BooksDataAccessLayer = /** @class */ (function () {
    function BooksDataAccessLayer() {
    }
    BooksDataAccessLayer.prototype.getAllBooks = function () {
        return __awaiter(this, void 0, void 0, function () {
            var books;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, book_model_1.default.find()
                            .populate('authorBook', ['fistName', 'lastName'])
                            .populate('imageBook', ['fileName', 'filePath'])];
                    case 1:
                        books = _a.sent();
                        return [2 /*return*/, books];
                }
            });
        });
    };
    BooksDataAccessLayer.prototype.findExistBook = function (titleBook) {
        return __awaiter(this, void 0, void 0, function () {
            var foundBook;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, book_model_1.default.findOne({ titleBook: titleBook }).exec()];
                    case 1:
                        foundBook = _a.sent();
                        return [2 /*return*/, foundBook];
                }
            });
        });
    };
    BooksDataAccessLayer.prototype.createNewBook = function (newBookData) {
        return __awaiter(this, void 0, void 0, function () {
            var title, pageCount, publishDate, authorBook, description, imageBook, newBook, savedBook;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        title = newBookData.title, pageCount = newBookData.pageCount, publishDate = newBookData.publishDate, authorBook = newBookData.authorBook, description = newBookData.description, imageBook = newBookData.imageBook;
                        newBook = new book_model_1.default({
                            title: title,
                            description: description !== undefined && description !== null ? description : '',
                            publishDate: new Date(publishDate),
                            authorBook: authorBook,
                            pageCount: pageCount,
                            imageBook: imageBook
                        });
                        return [4 /*yield*/, newBook.save()];
                    case 1:
                        savedBook = _a.sent();
                        return [2 /*return*/, savedBook];
                }
            });
        });
    };
    BooksDataAccessLayer.prototype.deleteBook = function (bookId) {
        return __awaiter(this, void 0, void 0, function () {
            var deletedBook;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, book_model_1.default.findByIdAndDelete({ _id: bookId })];
                    case 1:
                        deletedBook = _a.sent();
                        return [2 /*return*/, deletedBook];
                }
            });
        });
    };
    BooksDataAccessLayer.prototype.searchBooks = function (title, publishBefore, publishAfter) {
        return __awaiter(this, void 0, void 0, function () {
            var searchBook, foundBooks, searchState, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        searchBook = new RegExp(title, "i");
                        console.log(title, publishBefore, publishAfter);
                        searchState = searchStatements_1.searchStatements(title, publishBefore, publishAfter);
                        _a = searchState;
                        switch (_a) {
                            case SEARCH.PUBLISH_BEFORE: return [3 /*break*/, 1];
                            case SEARCH.PUBLISH_AFTER: return [3 /*break*/, 3];
                            case SEARCH.PUBLISH_AFTER_AND_TITLE: return [3 /*break*/, 5];
                            case SEARCH.PUBLISH_BEFORE_AND_TITLE: return [3 /*break*/, 7];
                            case SEARCH.BY_TITLE: return [3 /*break*/, 9];
                            case SEARCH.FILED_ALL: return [3 /*break*/, 11];
                            case SEARCH.PUBLISH_BEFORE_AND_PUBLISH_AFTER: return [3 /*break*/, 13];
                        }
                        return [3 /*break*/, 15];
                    case 1:
                        console.log(SEARCH.PUBLISH_BEFORE);
                        return [4 /*yield*/, book_model_1.default.find({
                                publishDate: {
                                    $lte: new Date(publishBefore)
                                }
                            })
                                .populate('authorBook', ['fistName', 'lastName'])
                                .populate('imageBook', ['fileName', 'filePath'])];
                    case 2:
                        foundBooks = _b.sent();
                        return [3 /*break*/, 16];
                    case 3:
                        console.log(SEARCH.PUBLISH_AFTER);
                        return [4 /*yield*/, book_model_1.default.find({
                                publishDate: {
                                    $gte: new Date(publishAfter)
                                }
                            })
                                .populate('authorBook', ['fistName', 'lastName'])
                                .populate('imageBook', ['fileName', 'filePath'])];
                    case 4:
                        foundBooks = _b.sent();
                        return [3 /*break*/, 16];
                    case 5:
                        console.log(SEARCH.PUBLISH_AFTER_AND_TITLE);
                        return [4 /*yield*/, book_model_1.default.find({
                                publishDate: {
                                    $gte: new Date(publishAfter)
                                },
                                title: searchBook
                            })
                                .populate('authorBook', ['fistName', 'lastName'])
                                .populate('imageBook', ['fileName', 'filePath'])];
                    case 6:
                        foundBooks = _b.sent();
                        return [3 /*break*/, 16];
                    case 7:
                        console.log(SEARCH.PUBLISH_BEFORE_AND_TITLE);
                        return [4 /*yield*/, book_model_1.default.find({
                                publishDate: {
                                    $lte: new Date(publishAfter)
                                },
                                title: searchBook
                            })
                                .populate('authorBook', ['fistName', 'lastName'])
                                .populate('imageBook', ['fileName', 'filePath'])];
                    case 8:
                        foundBooks = _b.sent();
                        return [3 /*break*/, 16];
                    case 9:
                        console.log(SEARCH.BY_TITLE);
                        return [4 /*yield*/, book_model_1.default.find({ title: searchBook })
                                .populate('authorBook', ['fistName', 'lastName'])
                                .populate('imageBook', ['fileName', 'filePath'])];
                    case 10:
                        foundBooks = _b.sent();
                        return [3 /*break*/, 16];
                    case 11:
                        console.log(SEARCH.FILED_ALL);
                        return [4 /*yield*/, book_model_1.default.find({
                                publishDate: {
                                    $lte: new Date(publishBefore),
                                    $gte: new Date(publishAfter)
                                },
                                title: searchBook
                            })
                                .populate('authorBook', ['fistName', 'lastName'])
                                .populate('imageBook', ['fileName', 'filePath'])];
                    case 12:
                        foundBooks = _b.sent();
                        return [3 /*break*/, 16];
                    case 13:
                        console.log(SEARCH.PUBLISH_BEFORE_AND_PUBLISH_AFTER);
                        return [4 /*yield*/, book_model_1.default.find({ publishDate: {
                                    $lte: new Date(publishBefore),
                                    $gte: new Date(publishAfter)
                                } })
                                .populate('authorBook', ['fistName', 'lastName'])
                                .populate('imageBook', ['fileName', 'filePath'])];
                    case 14:
                        foundBooks = _b.sent();
                        return [3 /*break*/, 16];
                    case 15: return [3 /*break*/, 16];
                    case 16: return [2 /*return*/, foundBooks];
                }
            });
        });
    };
    BooksDataAccessLayer.prototype.findBookById = function (bookId) {
        return __awaiter(this, void 0, void 0, function () {
            var foundBook;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, book_model_1.default.findById({ _id: bookId })
                            .populate('authorBook', ['fistName', 'lastName'])
                            .populate('imageBook', ['fileName', 'filePath'])];
                    case 1:
                        foundBook = _a.sent();
                        return [2 /*return*/, foundBook];
                }
            });
        });
    };
    return BooksDataAccessLayer;
}());
exports.BooksDataAccessLayer = BooksDataAccessLayer;
//Enum
var SEARCH;
(function (SEARCH) {
    SEARCH["PUBLISH_BEFORE"] = "PUBLISH_BEFORE";
    SEARCH["PUBLISH_AFTER"] = "PUBLISH_AFTER";
    SEARCH["PUBLISH_BEFORE_AND_TITLE"] = "PUBLISH_BEFORE_AND_TITLE";
    SEARCH["PUBLISH_AFTER_AND_TITLE"] = "PUBLISH_AFTER_AND_TITLE";
    SEARCH["PUBLISH_BEFORE_AND_PUBLISH_AFTER"] = "PUBLISH_BEFORE_AND_PUBLISH_AFTER";
    SEARCH["FILED_ALL"] = "FILED_ALL";
    SEARCH["BY_TITLE"] = "BY_TITLE";
})(SEARCH = exports.SEARCH || (exports.SEARCH = {}));
//# sourceMappingURL=books_dal.js.map