"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.coverImageBasePath = void 0;
var mongoose_1 = __importStar(require("mongoose"));
//Storage images path
exports.coverImageBasePath = "uploads/bookCovers";
var BookSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    publishDate: {
        type: Date,
        required: true
    },
    authorBook: {
        //Referencing to Authors collections
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        ref: 'Author'
    },
    pageCount: {
        type: Number,
        required: true
    },
    createAt: {
        type: String,
        required: true,
        default: new Date().toISOString()
    },
    imageBook: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        ref: 'Image'
    }
});
exports.default = mongoose_1.default.model('Book', BookSchema);
//# sourceMappingURL=book_model.js.map