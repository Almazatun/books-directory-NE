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
exports.BookDataAccessLayer = void 0;
var book_model_1 = __importDefault(require("../models/book_model"));
var searchStatements_1 = require("../utils/searchStatements");
var types_1 = require("./types");
var BookDataAccessLayer = /** @class */ (function () {
    function BookDataAccessLayer() {
    }
    BookDataAccessLayer.prototype.getAllBooks = function () {
        return __awaiter(this, void 0, void 0, function () {
            var books;
            return __generator(this, function (_a) {
                books = book_model_1.default.find()
                    .populate('authorBook', ['firstName', 'lastName'])
                    .populate('imageBook', ['fileName', 'filePath']);
                return [2 /*return*/, books];
            });
        });
    };
    BookDataAccessLayer.prototype.findExistBook = function (titleBook) {
        return __awaiter(this, void 0, void 0, function () {
            var foundBook;
            return __generator(this, function (_a) {
                foundBook = book_model_1.default.findOne({ titleBook: titleBook }).exec();
                return [2 /*return*/, foundBook];
            });
        });
    };
    BookDataAccessLayer.prototype.createNewBook = function (newBookData) {
        return __awaiter(this, void 0, void 0, function () {
            var title, pageCount, publishDate, authorBook, description, imageBook, newBook, savedBook;
            return __generator(this, function (_a) {
                title = newBookData.title, pageCount = newBookData.pageCount, publishDate = newBookData.publishDate, authorBook = newBookData.authorBook, description = newBookData.description, imageBook = newBookData.imageBook;
                newBook = new book_model_1.default({
                    title: title,
                    description: description !== undefined && description !== null ? description : '',
                    publishDate: new Date(publishDate),
                    authorBook: authorBook,
                    pageCount: pageCount,
                    imageBook: imageBook
                });
                savedBook = newBook.save();
                return [2 /*return*/, savedBook];
            });
        });
    };
    BookDataAccessLayer.prototype.deleteBook = function (bookId) {
        return __awaiter(this, void 0, void 0, function () {
            var deletedBook;
            return __generator(this, function (_a) {
                deletedBook = book_model_1.default.findByIdAndDelete({ _id: bookId });
                return [2 /*return*/, deletedBook];
            });
        });
    };
    BookDataAccessLayer.prototype.searchBooks = function (title, publishBefore, publishAfter) {
        return __awaiter(this, void 0, void 0, function () {
            var searchBook, foundBooks, searchState;
            return __generator(this, function (_a) {
                searchBook = new RegExp(title, "i");
                console.log(title, publishBefore, publishAfter);
                searchState = searchStatements_1.searchStatements(title, publishBefore, publishAfter);
                switch (searchState) {
                    case types_1.SEARCH.PUBLISH_BEFORE: {
                        console.log(types_1.SEARCH.PUBLISH_BEFORE);
                        foundBooks = book_model_1.default.find({
                            publishDate: {
                                $lte: new Date(publishBefore)
                            }
                        })
                            .populate('authorBook', ['fistName', 'lastName'])
                            .populate('imageBook', ['fileName', 'filePath']);
                        break;
                    }
                    case types_1.SEARCH.PUBLISH_AFTER:
                        console.log(types_1.SEARCH.PUBLISH_AFTER);
                        foundBooks = book_model_1.default.find({
                            publishDate: {
                                $gte: new Date(publishAfter)
                            }
                        })
                            .populate('authorBook', ['fistName', 'lastName'])
                            .populate('imageBook', ['fileName', 'filePath']);
                        break;
                    case types_1.SEARCH.PUBLISH_AFTER_AND_TITLE:
                        console.log(types_1.SEARCH.PUBLISH_AFTER_AND_TITLE);
                        foundBooks = book_model_1.default.find({
                            publishDate: {
                                $gte: new Date(publishAfter)
                            },
                            title: searchBook
                        })
                            .populate('authorBook', ['fistName', 'lastName'])
                            .populate('imageBook', ['fileName', 'filePath']);
                        break;
                    case types_1.SEARCH.PUBLISH_BEFORE_AND_TITLE:
                        console.log(types_1.SEARCH.PUBLISH_BEFORE_AND_TITLE);
                        foundBooks = book_model_1.default.find({
                            publishDate: {
                                $lte: new Date(publishAfter)
                            },
                            title: searchBook
                        })
                            .populate('authorBook', ['fistName', 'lastName'])
                            .populate('imageBook', ['fileName', 'filePath']);
                        break;
                    case types_1.SEARCH.BY_TITLE:
                        console.log(types_1.SEARCH.BY_TITLE);
                        foundBooks = book_model_1.default.find({ title: searchBook })
                            .populate('authorBook', ['fistName', 'lastName'])
                            .populate('imageBook', ['fileName', 'filePath']);
                        break;
                    case types_1.SEARCH.FILED_ALL:
                        console.log(types_1.SEARCH.FILED_ALL);
                        foundBooks = book_model_1.default.find({
                            publishDate: {
                                $lte: new Date(publishBefore),
                                $gte: new Date(publishAfter)
                            },
                            title: searchBook
                        })
                            .populate('authorBook', ['fistName', 'lastName'])
                            .populate('imageBook', ['fileName', 'filePath']);
                        break;
                    case types_1.SEARCH.PUBLISH_BEFORE_AND_PUBLISH_AFTER:
                        console.log(types_1.SEARCH.PUBLISH_BEFORE_AND_PUBLISH_AFTER);
                        foundBooks = book_model_1.default.find({ publishDate: {
                                $lte: new Date(publishBefore),
                                $gte: new Date(publishAfter)
                            } })
                            .populate('authorBook', ['fistName', 'lastName'])
                            .populate('imageBook', ['fileName', 'filePath']);
                        break;
                    default:
                        break;
                }
                return [2 /*return*/, foundBooks];
            });
        });
    };
    BookDataAccessLayer.prototype.findBookById = function (bookId) {
        return __awaiter(this, void 0, void 0, function () {
            var foundBook;
            return __generator(this, function (_a) {
                foundBook = book_model_1.default.findById({ _id: bookId })
                    .populate('authorBook', ['fistName', 'lastName'])
                    .populate('imageBook', ['fileName', 'filePath']);
                return [2 /*return*/, foundBook];
            });
        });
    };
    return BookDataAccessLayer;
}());
exports.BookDataAccessLayer = BookDataAccessLayer;
//# sourceMappingURL=book_dal.js.map