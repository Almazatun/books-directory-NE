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
exports.AuthorsController = void 0;
var express_1 = require("express");
var authors_service_1 = require("./authors_service");
var tsyringe_1 = require("tsyringe");
var authMe_1 = require("../hellpers/authMe");
var AuthorsController = /** @class */ (function () {
    function AuthorsController(authorsService) {
        this.authorsService = authorsService;
        // @ts-ignore
        this.router = new express_1.Router();
    }
    //Get all authors or particular author
    //Included searching option
    AuthorsController.prototype.getAllAuthors = function (req, res) {
        var firstName = req.query.firstName;
        return this.authorsService.getAuthors(firstName, res);
    };
    //Crate new author
    AuthorsController.prototype.createNewAuthor = function (req, res) {
        var _a = req.body, firstName = _a.firstName, lastName = _a.lastName;
        return this.authorsService.createNewAuthor(firstName, lastName, res);
    };
    //Delete author
    AuthorsController.prototype.deleteAuthor = function (req, res) {
        return this.authorsService.deleteAuthor(req.params.id, res);
    };
    AuthorsController.prototype.routes = function () {
        var _this = this;
        this.router.get("/", function (req, res) { return _this.getAllAuthors(req, res); });
        this.router.post("/new", authMe_1.authMe, function (req, res) { return _this.createNewAuthor(req, res); });
        this.router.delete("/delete/:id", authMe_1.authMe, function (req, res) { return _this.deleteAuthor(req, res); });
        return this.router;
    };
    AuthorsController = __decorate([
        tsyringe_1.autoInjectable(),
        __metadata("design:paramtypes", [authors_service_1.AuthorsService])
    ], AuthorsController);
    return AuthorsController;
}());
exports.AuthorsController = AuthorsController;
//# sourceMappingURL=authors_controller.js.map