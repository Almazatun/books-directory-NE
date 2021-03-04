"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MAX_AGE = exports.SESSION = void 0;
var sessionKey_1 = require("../confirm/sessionKey");
var uuid_1 = require("uuid");
exports.SESSION = process.env.SESSION_KEY + "_" + uuid_1.v4() || sessionKey_1.SESSION_SECRET;
exports.MAX_AGE = 1000 * 60 * 60 * 3; // Three hours
//# sourceMappingURL=session.js.map