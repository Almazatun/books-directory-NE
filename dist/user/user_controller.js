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
exports.UserController = void 0;
var express_1 = require("express");
var tsyringe_1 = require("tsyringe");
var user_service_1 = require("./user_service");
var authMe_1 = require("../hellpers/authMe");
var UserController = /** @class */ (function () {
    function UserController(usersService) {
        this.usersService = usersService;
        this.router = express_1.Router();
    }
    ;
    //Register
    UserController.prototype.registerUser = function (req, res) {
        var _a = req.body, email = _a.email, userName = _a.userName, password = _a.password;
        return this.usersService.createNewUser(email, userName, password, res);
    };
    ;
    //Log in
    UserController.prototype.logInUser = function (req, res) {
        var _a = req.body, email = _a.email, password = _a.password;
        return this.usersService.logIn(email, password, req, res);
    };
    ;
    //Log out
    UserController.prototype.logOutUser = function (req, res) {
        return this.usersService.logOut(req, res);
    };
    ;
    //Auth me
    UserController.prototype.authMeUser = function (req, res) {
        return this.usersService.autoChecker(req, res);
    };
    ;
    //Update userName
    UserController.prototype.updateUserName = function (req, res) {
        var title = req.body.title;
        return this.usersService.updateUserName(req.params.id, title, res);
    };
    ;
    UserController.prototype.addBookUserCollection = function (req, res) {
        var bookId = req.body.bookId;
        return this.usersService.addBookUserBooksCollection(req.params.id, bookId, res);
    };
    ;
    UserController.prototype.deleteBookUserCollection = function (req, res) {
        return this.usersService.deleteBookUserBooksCollection(req.params.id, req.params.bookId, res);
    };
    ;
    UserController.prototype.routes = function () {
        var _this = this;
        this.router.post("/register", function (req, res) { return _this.registerUser(req, res); });
        this.router.post("/login", function (req, res) { return _this.logInUser(req, res); });
        this.router.delete("/logout", function (req, res) { return _this.logOutUser(req, res); });
        this.router.post("/authchecker", function (req, res) { return _this.authMeUser(req, res); });
        this.router.put("/user/:id/addbook", authMe_1.authMe, function (req, res) { return _this.addBookUserCollection(req, res); });
        this.router.delete("/user/:id/deletebook/:bookId", authMe_1.authMe, function (req, res) { return _this.deleteBookUserCollection(req, res); });
        this.router.put("/user/:id/update", authMe_1.authMe, function (req, res) { return _this.updateUserName(req, res); });
        //
        return this.router;
    };
    ;
    UserController = __decorate([
        tsyringe_1.autoInjectable(),
        __metadata("design:paramtypes", [user_service_1.UserService])
    ], UserController);
    return UserController;
}());
exports.UserController = UserController;
//# sourceMappingURL=user_controller.js.map