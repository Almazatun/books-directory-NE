"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var authors_controller_1 = __importDefault(require("../controllers/authors_controller"));
var authMe_1 = require("../hellpers/authMe");
var router = express_1.default.Router();
//Get all authors
router.get("/", authors_controller_1.default.getAllAuthors);
//Create new author
router.post("/new", authMe_1.authMe, authors_controller_1.default.createNewAuthor);
//Delete Author
router.delete("/delete/:id", authMe_1.authMe, authors_controller_1.default.deleteAuthor);
exports.default = router;
//# sourceMappingURL=authors.js.map