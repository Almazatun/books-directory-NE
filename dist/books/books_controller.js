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
exports.BooksController = void 0;
var express_1 = require("express");
var tsyringe_1 = require("tsyringe");
var books_service_1 = require("./books_service");
var authMe_1 = require("../hellpers/authMe");
var BooksController = /** @class */ (function () {
    function BooksController(booksService) {
        this.booksService = booksService;
        // @ts-ignore
        this.router = new express_1.Router();
    }
    //Get all books or particular book
    BooksController.prototype.getAllBooks = function (req, res) {
        var _a = req.query, title = _a.title, publishBefore = _a.publishBefore, publishAfter = _a.publishAfter;
        return this.booksService.getAllBooks(title, publishBefore, publishAfter, res);
    };
    //Crate new book
    BooksController.prototype.createNewBook = function (req, res) {
        console.log('CREATE_BOOK_BODY', req.body);
        return this.booksService.createNewBook(res, req.body);
    };
    //DeleteBook
    BooksController.prototype.deleteBook = function (req, res) {
        return this.booksService.deleteBook(req.params.id, res);
    };
    BooksController.prototype.routes = function () {
        var _this = this;
        this.router.get("/", function (req, res) { return _this.getAllBooks(req, res); });
        this.router.post("/new", authMe_1.authMe, function (req, res) { return _this.createNewBook(req, res); });
        this.router.delete("/delete/:id", authMe_1.authMe, function (req, res) { return _this.deleteBook(req, res); });
        return this.router;
    };
    BooksController = __decorate([
        tsyringe_1.autoInjectable(),
        __metadata("design:paramtypes", [books_service_1.BooksService])
    ], BooksController);
    return BooksController;
}());
exports.BooksController = BooksController;
//# sourceMappingURL=books_controller.js.map