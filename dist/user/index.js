"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userController = void 0;
var user_controller_1 = require("./user_controller");
var user_service_1 = require("./user_service");
var user_dal_1 = require("./user.dal");
var book_dal_1 = require("../book/book_dal");
exports.userController = new user_controller_1.UserController(new user_service_1.UserService(new user_dal_1.UserDataAccessLayer(), new book_dal_1.BookDataAccessLayer()));
//# sourceMappingURL=index.js.map