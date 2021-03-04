"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var users_controller_1 = __importDefault(require("../controllers/users_controller"));
var authMe_1 = require("../hellpers/authMe");
var router = express_1.default.Router();
//users
// router.get('/',  controller.getUsers)
//Register
router.post('/register', users_controller_1.default.registerUser);
//Log in
router.post("/login", users_controller_1.default.logInUser);
//Log out
router.delete("/logout", users_controller_1.default.logOutUser);
//Auth me
router.post("/authchecker", users_controller_1.default.authMeUser);
//Add book user books collection
router.put("/user/:id/addbook", authMe_1.authMe, users_controller_1.default.addBookUserCollection);
//Delete book user books collection
router.delete("/user/:id/deletebook/:bookId", authMe_1.authMe, users_controller_1.default.deleteBookUserCollection);
//Update userName
router.put("/user/:id/update", authMe_1.authMe, users_controller_1.default.updateUserName);
exports.default = router;
//# sourceMappingURL=users.js.map