"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
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
exports.UserService = void 0;
var validators_1 = __importDefault(require("../utils/validators"));
var bcrypt_1 = __importDefault(require("bcrypt"));
var tsyringe_1 = require("tsyringe");
var session_1 = require("../configs/session");
var validatorNewUserData = validators_1.default.validatorNewUserData, validatorLogIn = validators_1.default.validatorLogIn;
var UserService = /** @class */ (function () {
    function UserService(usersDataAccessLayer, booksDataAccessLayer) {
        this.usersDataAccessLayer = usersDataAccessLayer;
        this.booksDataAccessLayer = booksDataAccessLayer;
    }
    ;
    UserService.prototype.createNewUser = function (email, userName, password, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, valid, errors, foundUserByEmail, newUserData, error_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = validatorNewUserData(email, userName, password), valid = _a.valid, errors = _a.errors;
                        console.log(errors);
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 8, , 9]);
                        if (!valid) return [3 /*break*/, 6];
                        return [4 /*yield*/, this.usersDataAccessLayer.findOneUserByEmail(email)];
                    case 2:
                        foundUserByEmail = _b.sent();
                        if (!foundUserByEmail) return [3 /*break*/, 3];
                        res.status(400).json({
                            errors: ['This is user already exist 🧒 | 👩️'],
                        });
                        return [3 /*break*/, 5];
                    case 3:
                        console.log('USER_CREATED');
                        newUserData = {
                            email: email,
                            userName: userName,
                            password: password
                        };
                        return [4 /*yield*/, this.usersDataAccessLayer.createNewUser(newUserData)];
                    case 4:
                        _b.sent();
                        res.status(200).json({
                            message: 'Successfully Registered 🎉',
                        });
                        _b.label = 5;
                    case 5: return [3 /*break*/, 7];
                    case 6:
                        res.status(400).json({
                            errors: [errors],
                            message: 'Bad request 🔴'
                        });
                        _b.label = 7;
                    case 7: return [3 /*break*/, 9];
                    case 8:
                        error_1 = _b.sent();
                        res.status(500).json({
                            errors: [__assign({}, error_1)],
                            message: "Some error"
                        });
                        return [3 /*break*/, 9];
                    case 9: return [2 /*return*/];
                }
            });
        });
    };
    ;
    UserService.prototype.logIn = function (email, password, req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, errors, valid, user, isMatch, error_2;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = validatorLogIn(email, password), errors = _a.errors, valid = _a.valid;
                        return [4 /*yield*/, this.usersDataAccessLayer.findOneUserByEmail(email)];
                    case 1:
                        user = _b.sent();
                        _b.label = 2;
                    case 2:
                        _b.trys.push([2, 7, , 8]);
                        if (!!valid) return [3 /*break*/, 3];
                        res.status(400).json({
                            errors: [errors],
                            message: 'Bad request 🔴'
                        });
                        return [3 /*break*/, 6];
                    case 3:
                        if (!!user) return [3 /*break*/, 4];
                        res.status(404).json({
                            errors: ['User not found 👥'],
                            message: 'Please check your email or password and try again',
                        });
                        return [3 /*break*/, 6];
                    case 4: return [4 /*yield*/, bcrypt_1.default.compare(password, user.password)];
                    case 5:
                        isMatch = _b.sent();
                        //Unless a user password incorrect a user get error message
                        if (!isMatch) {
                            res.status(401).json({
                                errors: ["Wrong credentials 🆘"],
                            });
                        }
                        else {
                            //Set cookie
                            res.cookie("cls", session_1.SESSION, {
                                maxAge: session_1.MAX_AGE,
                                httpOnly: session_1.DEV_MODE === "production",
                            });
                            //Response
                            res.status(200).json({
                                user: user
                            });
                        }
                        _b.label = 6;
                    case 6: return [3 /*break*/, 8];
                    case 7:
                        error_2 = _b.sent();
                        res.status(500).json({
                            errors: [error_2],
                            message: "Some error"
                        });
                        return [3 /*break*/, 8];
                    case 8: return [2 /*return*/];
                }
            });
        });
    };
    ;
    UserService.prototype.logOut = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                try {
                    //Clear cookie
                    res.clearCookie('cls');
                    res.status(200).json({
                        message: "Logged out successfully"
                    });
                }
                catch (error) {
                    res.status(500).json({
                        errors: [error],
                        message: "Some error"
                    });
                }
                return [2 /*return*/];
            });
        });
    };
    ;
    UserService.prototype.autoChecker = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var cookies;
            return __generator(this, function (_a) {
                cookies = req.cookies;
                try {
                    if (cookies) {
                        if (cookies.cls === session_1.SESSION) {
                            res.status(200).json({
                                message: "🟢 Authorized"
                            });
                        }
                        else {
                            res.status(401).json({ message: "🔴 Unauthorized" });
                        }
                    }
                    else {
                        res.status(401).json({ message: "🔴 Unauthorized" });
                    }
                }
                catch (error) {
                    res.status(500).json({
                        errors: [error],
                        message: "Some error"
                    });
                }
                return [2 /*return*/];
            });
        });
    };
    ;
    UserService.prototype.addBookUserBooksCollection = function (userId, bookId, res) {
        return __awaiter(this, void 0, void 0, function () {
            var isBook, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.booksDataAccessLayer.findBookById(bookId).catch(function () {
                            res.status(400).json({
                                errors: ['Book Id not valid'],
                                message: 'Bad request 🔴',
                            });
                        })];
                    case 1:
                        isBook = _a.sent();
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 6, , 7]);
                        if (!!isBook) return [3 /*break*/, 3];
                        res.status(400).json({
                            errors: ['Book Id not valid'],
                            message: 'Bad request 🔴',
                        });
                        return [3 /*break*/, 5];
                    case 3: return [4 /*yield*/, this.usersDataAccessLayer.addBookUserCollection(userId, bookId)];
                    case 4:
                        _a.sent();
                        res.status(200).json({
                            book: isBook,
                            message: 'Book has been added successfully 🎉',
                        });
                        _a.label = 5;
                    case 5: return [3 /*break*/, 7];
                    case 6:
                        error_3 = _a.sent();
                        res.status(500).json({
                            errors: [error_3],
                            message: "Some error"
                        });
                        return [3 /*break*/, 7];
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    ;
    UserService.prototype.deleteBookUserBooksCollection = function (userId, bookId, res) {
        return __awaiter(this, void 0, void 0, function () {
            var isBookInUserCollection, isBook, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.usersDataAccessLayer.findBookUserCollection(userId, bookId).catch(function (error) {
                            res.status(400).json({
                                errors: [error],
                                message: 'Book Id not valid',
                            });
                        })];
                    case 1:
                        isBookInUserCollection = _a.sent();
                        return [4 /*yield*/, this.booksDataAccessLayer.findBookById(isBookInUserCollection[0])
                                .catch(function (error) {
                                res.status(400).json({
                                    errors: [error],
                                    message: 'Book Id not valid',
                                });
                            })];
                    case 2:
                        isBook = _a.sent();
                        _a.label = 3;
                    case 3:
                        _a.trys.push([3, 7, , 8]);
                        if (!(isBookInUserCollection.length === 0)) return [3 /*break*/, 4];
                        res.status(400).json({
                            errors: ['Book Id not valid'],
                            message: 'Bad request 🔴',
                        });
                        return [3 /*break*/, 6];
                    case 4: return [4 /*yield*/, this.usersDataAccessLayer.deleteBookUserCollection(userId, bookId)];
                    case 5:
                        _a.sent();
                        res.status(200).json({
                            books: isBook,
                            message: 'Book has been deleted successfully ❌',
                        });
                        _a.label = 6;
                    case 6: return [3 /*break*/, 8];
                    case 7:
                        error_4 = _a.sent();
                        res.status(500).json({
                            errors: [error_4],
                            message: "Some error"
                        });
                        return [3 /*break*/, 8];
                    case 8: return [2 /*return*/];
                }
            });
        });
    };
    ;
    UserService.prototype.getUsers = function (res) {
        return __awaiter(this, void 0, void 0, function () {
            var users, error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.usersDataAccessLayer.getAllUsers()];
                    case 1:
                        users = _a.sent();
                        res.status(200).json({
                            users: users
                        });
                        return [3 /*break*/, 3];
                    case 2:
                        error_5 = _a.sent();
                        res.status(500).json({
                            error: [error_5]
                        });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ;
    UserService.prototype.updateUserName = function (userId, title, res) {
        return __awaiter(this, void 0, void 0, function () {
            var foundUserById, updatedUserData, error_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.usersDataAccessLayer.findOneUserById(userId)];
                    case 1:
                        foundUserById = _a.sent();
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 6, , 7]);
                        if (!!foundUserById) return [3 /*break*/, 3];
                        res.status(400).json({
                            errors: ['User Id not valid'],
                            message: 'Bad request 🔴',
                        });
                        return [3 /*break*/, 5];
                    case 3: return [4 /*yield*/, this.usersDataAccessLayer.updateUserData(userId, title)];
                    case 4:
                        updatedUserData = _a.sent();
                        res.status(200).json({
                            user: updatedUserData,
                            message: 'User name has been updated successfully',
                        });
                        _a.label = 5;
                    case 5: return [3 /*break*/, 7];
                    case 6:
                        error_6 = _a.sent();
                        res.status(500).json({
                            error: [error_6]
                        });
                        return [3 /*break*/, 7];
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    ;
    UserService = __decorate([
        tsyringe_1.injectable(),
        __metadata("design:paramtypes", [Object, Object])
    ], UserService);
    return UserService;
}());
exports.UserService = UserService;
//# sourceMappingURL=user_service.js.map