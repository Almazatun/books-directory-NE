"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
var express_1 = __importDefault(require("express"));
var mongoose_1 = __importDefault(require("mongoose"));
var body_parser_1 = __importDefault(require("body-parser"));
var cors_1 = __importDefault(require("cors"));
var index_1 = __importDefault(require("./routes/index"));
var database_1 = require("./configs/database");
var cors_2 = require("./configs/cors");
var configs_1 = require("./configs");
var cookie_parser_1 = __importDefault(require("cookie-parser"));
var user_1 = require("./user");
var book_1 = require("./book");
var image_1 = require("./image");
var author_1 = require("./author");
//Create express app
var app = express_1.default();
app.use(cookie_parser_1.default());
app.use('/public', express_1.default.static('public'));
//Config Object to Avoid Deprecation Warnings
var dbOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
};
//MongoDB
//Connection database
mongoose_1.default.connect(database_1.DB_HOST, dbOptions);
//Store Connection Object
var db = mongoose_1.default.connection;
//Connection events
db.once("open", function () {
    console.log("Connected to MongoDB database...");
}).on("error", function (err) {
    console.log(err);
});
//BodyParser
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: false }));
//Cors
app.use(cors_1.default({
    credentials: cors_2.CORS_WITH_CREDENTIALS,
    origin: cors_2.CORS_ALLOW_HOST,
    methods: "GET, PUT, POST, DELETE",
    optionsSuccessStatus: 200
}));
//Routes
app.use("/", index_1.default);
app.use("/authors", author_1.authorController.routes());
app.use("/books", book_1.bookController.routes());
app.use("/images", image_1.imageController.routes());
app.use("/users", user_1.userController.routes());
//Starting server
app.listen(configs_1.PORT, function () {
    console.log("Listening on port " + configs_1.PORT);
});
//# sourceMappingURL=app.js.map