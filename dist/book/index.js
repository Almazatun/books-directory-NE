"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookController = void 0;
var book_service_1 = require("./book_service");
var book_controller_1 = require("./book_controller");
var book_dal_1 = require("./book_dal");
var image_dal_1 = require("../image/image_dal");
exports.bookController = new book_controller_1.BookController(new book_service_1.BookService(new book_dal_1.BookDataAccessLayer(), new image_dal_1.ImageDataAccessLayer()));
//# sourceMappingURL=index.js.map