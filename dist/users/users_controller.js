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
exports.UsersController = void 0;
var express_1 = require("express");
var tsyringe_1 = require("tsyringe");
var users_service_1 = require("./users_service");
var authMe_1 = require("../hellpers/authMe");
var UsersController = /** @class */ (function () {
    function UsersController(usersService) {
        this.usersService = usersService;
        // @ts-ignore
        this.router = new express_1.Router();
    }
    //Register
    UsersController.prototype.registerUser = function (req, res) {
        var _a = req.body, email = _a.email, userName = _a.userName, password = _a.password;
        return this.usersService.createNewUser(email, userName, password, res);
    };
    //Log in
    UsersController.prototype.logInUser = function (req, res) {
        var _a = req.body, email = _a.email, password = _a.password;
        return this.usersService.logIn(email, password, req, res);
    };
    //Log out
    UsersController.prototype.logOutUser = function (req, res) {
        return this.usersService.logOut(req, res);
    };
    //Auth me
    UsersController.prototype.authMeUser = function (req, res) {
        return this.usersService.autoChecker(req, res);
    };
    //Update userName
    UsersController.prototype.updateUserName = function (req, res) {
        var title = req.body.title;
        return this.usersService.updateUserName(req.params.id, title, res);
    };
    UsersController.prototype.addBookUserCollection = function (req, res) {
        var bookId = req.body.bookId;
        return this.usersService.addBookUserBooksCollection(req.params.id, bookId, res);
    };
    UsersController.prototype.deleteBookUserCollection = function (req, res) {
        return this.usersService.deleteBookUserBooksCollection(req.params.id, req.params.bookId, res);
    };
    UsersController.prototype.routes = function () {
        var _this = this;
        this.router.post("/register", function (req, res) { return _this.registerUser(req, res); });
        this.router.post("/login", function (req, res) { return _this.logInUser(req, res); });
        this.router.delete("/logout", function (req, res) { return _this.logOutUser(req, res); });
        this.router.post("/authchecker", function (req, res) { return _this.authMeUser(req, res); });
        this.router.put("/user/:id/addbook", authMe_1.authMe, function (req, res) { return _this.addBookUserCollection(req, res); });
        this.router.delete("/user/:id/deletebook/:bookId", authMe_1.authMe, function (req, res) { return _this.deleteBookUserCollection(req, res); });
        this.router.put("/user/:id/update", authMe_1.authMe, function (req, res) { return _this.updateUserName(req, res); });
        return this.router;
    };
    UsersController = __decorate([
        tsyringe_1.autoInjectable(),
        __metadata("design:paramtypes", [users_service_1.UsersService])
    ], UsersController);
    return UsersController;
}());
exports.UsersController = UsersController;
//# sourceMappingURL=users_controller.js.map