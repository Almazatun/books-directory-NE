"use strict";
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
var user_model_1 = __importDefault(require("../models/user_model"));
var bcrypt_1 = __importDefault(require("bcrypt"));
var Users = /** @class */ (function () {
    function Users() {
    }
    Users.prototype.createNewUser = function (newUserData) {
        return __awaiter(this, void 0, void 0, function () {
            var email, password, userName, hashedPassword, newUser, createdUser;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        email = newUserData.email, password = newUserData.password, userName = newUserData.userName;
                        return [4 /*yield*/, bcrypt_1.default.hash(password, 12)];
                    case 1:
                        hashedPassword = _a.sent();
                        newUser = new user_model_1.default({
                            email: email,
                            password: hashedPassword,
                            userName: userName,
                            userBooks: []
                        });
                        return [4 /*yield*/, newUser.save()];
                    case 2:
                        createdUser = _a.sent();
                        return [2 /*return*/, createdUser];
                }
            });
        });
    };
    Users.prototype.updateUserData = function (userId, title) {
        return __awaiter(this, void 0, void 0, function () {
            var updatedUserData;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, user_model_1.default.findByIdAndUpdate(userId, { userName: title }, { new: true })
                            .populate({
                            path: "userBooks",
                            populate: {
                                path: "imageBook", select: 'filePath',
                            },
                        })
                            .populate({
                            path: "userBooks",
                            populate: {
                                path: "authorBook", select: ['firstName', 'lastName'],
                            },
                        })];
                    case 1:
                        updatedUserData = _a.sent();
                        return [2 /*return*/, updatedUserData];
                }
            });
        });
    };
    Users.prototype.addBookUserCollection = function (userId, bookId) {
        return __awaiter(this, void 0, void 0, function () {
            var updatedUserData;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, user_model_1.default.update({ _id: userId }, {
                            //$pull option
                            //https://docs.mongodb.com/manual/reference/operator/update/pull/
                            $push: {
                                userBooks: bookId
                            }
                        })
                            //multiply level populate
                            //https://mongoosejs.com/docs/populate.html#deep-populate
                            .populate({
                            path: "userBooks",
                            populate: {
                                path: "imageBook", select: 'filePath',
                            },
                        })
                            .populate({
                            path: "userBooks",
                            populate: {
                                path: "authorBook", select: ['firstName', 'lastName'],
                            },
                        }).exec()];
                    case 1:
                        updatedUserData = _a.sent();
                        return [2 /*return*/, updatedUserData];
                }
            });
        });
    };
    Users.prototype.deleteBookUserCollection = function (userId, bookId) {
        return __awaiter(this, void 0, void 0, function () {
            var updatedUserData;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, user_model_1.default.update({ _id: userId }, {
                            //$pull option
                            //https://docs.mongodb.com/manual/reference/operator/update/pull/
                            $pull: {
                                userBooks: bookId
                            }
                        })
                            .populate({
                            path: "userBooks",
                            populate: {
                                path: "imageBook", select: 'filePath',
                            },
                        })
                            .populate({
                            path: "userBooks",
                            populate: {
                                path: "authorBook", select: ['firstName', 'lastName'],
                            },
                        }).exec()];
                    case 1:
                        updatedUserData = _a.sent();
                        return [2 /*return*/, updatedUserData];
                }
            });
        });
    };
    Users.prototype.findOneUserByEmail = function (email) {
        return __awaiter(this, void 0, void 0, function () {
            var foundUser;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, user_model_1.default.findOne({ email: email }).exec()];
                    case 1:
                        foundUser = _a.sent();
                        return [2 /*return*/, foundUser];
                }
            });
        });
    };
    Users.prototype.findBookUserCollection = function (userId, bookId) {
        return __awaiter(this, void 0, void 0, function () {
            var foundBookUserCollection, foundBookId;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, user_model_1.default.find({ _id: userId }, {
                            userBooks: bookId,
                        })];
                    case 1:
                        foundBookUserCollection = _a.sent();
                        foundBookId = foundBookUserCollection[0].userBooks;
                        return [2 /*return*/, foundBookId];
                }
            });
        });
    };
    Users.prototype.findOneUserById = function (userId) {
        return __awaiter(this, void 0, void 0, function () {
            var foundUser;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, user_model_1.default.findById(userId)];
                    case 1:
                        foundUser = _a.sent();
                        return [2 /*return*/, foundUser];
                }
            });
        });
    };
    Users.prototype.getAllUsers = function () {
        return __awaiter(this, void 0, void 0, function () {
            var users;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, user_model_1.default.find()
                            .populate({
                            path: "userBooks",
                            populate: {
                                path: "imageBook", select: 'filePath',
                            },
                        })
                            .populate({
                            path: "userBooks",
                            populate: {
                                path: "authorBook", select: ['firstName', 'lastName'],
                            },
                        })];
                    case 1:
                        users = _a.sent();
                        return [2 /*return*/, users];
                }
            });
        });
    };
    return Users;
}());
var UsersDAL = new Users();
exports.default = UsersDAL;
//# sourceMappingURL=users.dal.js.map