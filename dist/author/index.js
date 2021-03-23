"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorController = void 0;
var author_controller_1 = require("./author_controller");
var author_service_1 = require("./author_service");
var author_dal_1 = require("./author_dal");
exports.authorController = new author_controller_1.AuthorsController(new author_service_1.AuthorService(new author_dal_1.AuthorDataAccessLayer()));
//# sourceMappingURL=index.js.map