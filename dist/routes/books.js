"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var books_controller_1 = __importDefault(require("../controllers/books_controller"));
var authMe_1 = require("../hellpers/authMe");
var router = express_1.default.Router();
//Get all books
router.get("/", books_controller_1.default.getAllBooks);
//Create new book
router.post("/new", authMe_1.authMe, books_controller_1.default.createNewBook);
//Delete book
router.delete("/delete/:id", authMe_1.authMe, books_controller_1.default.deleteBook);
exports.default = router;
//# sourceMappingURL=books.js.map