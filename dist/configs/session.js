"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MAX_AGE = exports.SESSION = void 0;
var uuid_1 = require("uuid");
exports.SESSION = process.env.SESSION_KEY + "_" + uuid_1.v4() || "" + uuid_1.v4();
exports.MAX_AGE = 1000 * 60 * 60 * 3; // Three hours
//# sourceMappingURL=session.js.map