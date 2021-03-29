"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.upload = exports.storage = exports.uploadPath = void 0;
var multer_1 = __importDefault(require("multer"));
var uuidv4_1 = require("uuidv4");
//Directory where will be storage images
exports.uploadPath = 'public';
//Multer options
//https://github.com/expressjs/multer
exports.storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        cb(null, exports.uploadPath);
    },
    filename: function (req, file, cb) {
        cb(null, uuidv4_1.uuid() + "_" + Date.now() + "_" + file.originalname.toLowerCase());
    }
});
//Multer option to control which format file should be accepted
var allowedFileTypes = ['image/jpeg', 'image/svg', 'image/png', 'image/svg'];
function filterFile(req, file, callback) {
    callback(null, allowedFileTypes.includes(file.mimetype));
}
exports.upload = multer_1.default({
    storage: exports.storage,
    fileFilter: filterFile,
    limits: {
        fieldSize: 1000000
    }
});
//# sourceMappingURL=multerStorage.js.map