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
Object.defineProperty(exports, "__esModule", { value: true });
exports.MockUserRepo = void 0;
var MockUserRepo = /** @class */ (function () {
    function MockUserRepo() {
        this.dbUser = {
            users: [
                {
                    id: "1",
                    userName: "Person1",
                    userBooks: [],
                    email: "person1@gmail.com",
                    password: "person112345@",
                    createdAt: "2021",
                    _doc: {}
                },
                {
                    id: "2",
                    userName: "Person2",
                    userBooks: [],
                    email: "person2@gmail.com",
                    password: "person212345@",
                    createdAt: "2021",
                    _doc: {}
                }
            ]
        };
    }
    MockUserRepo.prototype.createNewUser = function (newUserData) {
        return __awaiter(this, void 0, void 0, function () {
            var email, userName, password, newUser;
            return __generator(this, function (_a) {
                email = newUserData.email, userName = newUserData.userName, password = newUserData.password;
                newUser = {
                    email: email,
                    userName: userName,
                    password: password,
                    userBooks: [],
                    createdAt: "2021"
                };
                this.dbUser.users.push(newUser);
                return [2 /*return*/, newUser];
            });
        });
    };
    ;
    MockUserRepo.prototype.updateUserData = function (userId, title) {
        return __awaiter(this, void 0, void 0, function () {
            var updatedUserData;
            return __generator(this, function (_a) {
                updatedUserData = this.dbUser.users.find(function (user) {
                    return user._id === userId ? __assign(__assign({}, user), { title: title }) : user;
                });
                if (updatedUserData)
                    return [2 /*return*/, updatedUserData];
                else
                    return [2 /*return*/, null];
                return [2 /*return*/];
            });
        });
    };
    ;
    MockUserRepo.prototype.addBookUserCollection = function (userId, bookId) {
        return __awaiter(this, void 0, void 0, function () {
            var book, userIndex;
            return __generator(this, function (_a) {
                book = {
                    id: bookId,
                    title: "" + bookId,
                    imageBook: "/" + bookId,
                    publishDate: "2021",
                };
                userIndex = this.dbUser.users.findIndex(function (user) {
                    return user.id === userId;
                });
                this.dbUser.users[userIndex].userBooks.push(book);
                return [2 /*return*/, book];
            });
        });
    };
    MockUserRepo.prototype.deleteBookUserCollection = function (userId, bookId) {
        return __awaiter(this, void 0, void 0, function () {
            var userIndex;
            return __generator(this, function (_a) {
                userIndex = this.dbUser.users.findIndex(function (user) { return user.id === userId; });
                this.dbUser.users[userIndex].userBooks = this.dbUser.users[userIndex].userBooks.filter(function (book) {
                    return book.id !== bookId;
                });
                return [2 /*return*/, this.dbUser.users[userIndex]];
            });
        });
    };
    ;
    MockUserRepo.prototype.findOneUserByEmail = function (email) {
        return __awaiter(this, void 0, void 0, function () {
            var foundedUserByEmail;
            return __generator(this, function (_a) {
                foundedUserByEmail = this.dbUser.users.find(function (user) { return user.email === email; });
                if (foundedUserByEmail)
                    return [2 /*return*/, foundedUserByEmail];
                else
                    return [2 /*return*/, null];
                return [2 /*return*/];
            });
        });
    };
    ;
    MockUserRepo.prototype.findBookUserCollection = function (userId, bookId) {
        return __awaiter(this, void 0, void 0, function () {
            var userIndex, foundBook;
            return __generator(this, function (_a) {
                userIndex = this.dbUser.users.findIndex(function (user) { return user.id === userId; });
                foundBook = this.dbUser.users[userIndex].userBooks.find(function (book) { return book.id === bookId; });
                if (foundBook)
                    return [2 /*return*/, foundBook];
                else
                    return [2 /*return*/, {}];
                return [2 /*return*/];
            });
        });
    };
    ;
    MockUserRepo.prototype.findOneUserById = function (userId) {
        return __awaiter(this, void 0, void 0, function () {
            var foundUser;
            return __generator(this, function (_a) {
                foundUser = this.dbUser.users.find(function (user) { return user.id === userId; });
                if (foundUser)
                    return [2 /*return*/, foundUser];
                else
                    return [2 /*return*/, null];
                return [2 /*return*/];
            });
        });
    };
    ;
    MockUserRepo.prototype.getAllUsers = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.dbUser.users];
            });
        });
    };
    return MockUserRepo;
}());
exports.MockUserRepo = MockUserRepo;
//# sourceMappingURL=mock_user_repo.js.map