"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMe = void 0;
var authMe = function (req, res, next) {
    if (req.session.user) {
        next();
    }
    else {
        res.status(401).json({ message: "Unauthorized" });
    }
};
exports.authMe = authMe;
//# sourceMappingURL=authMe.js.map