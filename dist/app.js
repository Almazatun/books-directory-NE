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
var express_session_1 = __importDefault(require("express-session"));
var connect_mongodb_session_1 = __importDefault(require("connect-mongodb-session"));
var session_1 = require("./configs/session");
var tsyringe_1 = require("tsyringe");
var authors_controller_1 = require("./authors/authors_controller");
var books_controller_1 = require("./books/books_controller");
var users_controller_1 = require("./users/users_controller");
var images_controller_1 = require("./images/images_controller");
//Session db
var DBSessions = connect_mongodb_session_1.default(express_session_1.default);
//Create express app
var app = express_1.default();
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
//Store session
var sessionStore = new DBSessions({
    uri: database_1.DB_HOST,
    collection: 'sessions'
});
//https://github.com/expressjs/session/issues/633
app.set('trust proxy', 1);
app.use(express_session_1.default({
    secret: session_1.SESSION,
    resave: true,
    saveUninitialized: false,
    store: sessionStore,
    cookie: {
        sameSite: "none",
        maxAge: session_1.MAX_AGE,
        //https://github.com/expressjs/session#cookiesecure
        secure: false,
    }
}));
//Routes
app.use("/", index_1.default);
app.use("/authors", tsyringe_1.container.resolve(authors_controller_1.AuthorsController).routes());
app.use("/books", tsyringe_1.container.resolve(books_controller_1.BooksController).routes());
app.use("/images", tsyringe_1.container.resolve(images_controller_1.ImagesController).routes());
app.use("/users", tsyringe_1.container.resolve(users_controller_1.UsersController).routes());
//Starting server
app.listen(configs_1.PORT, function () {
    console.log("Listening on port " + configs_1.PORT);
});
//# sourceMappingURL=app.js.map