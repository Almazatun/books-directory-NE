"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMe = void 0;
var session_1 = require("../configs/session");
var authMe = function (req, res, next) {
    var cookies = req.cookies;
    if ("cls" in cookies) {
        if (cookies.cls === session_1.SESSION) {
            next();
        }
        else {
            res.status(401).json({ message: "🔴 Unauthorized" });
        }
    }
    else {
        res.status(401).json({ message: "🔴 Unauthorized" });
    }
};
exports.authMe = authMe;
//# sourceMappingURL=authMe.js.map