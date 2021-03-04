"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var mongoose_1 = __importDefault(require("mongoose"));
var body_parser_1 = __importDefault(require("body-parser"));
var cors_1 = __importDefault(require("cors"));
var index_1 = __importDefault(require("./routes/index"));
var authors_1 = __importDefault(require("./routes/authors"));
var books_1 = __importDefault(require("./routes/books"));
var images_1 = __importDefault(require("./routes/images"));
var users_1 = __importDefault(require("./routes/users"));
var database_1 = require("./configs/database");
var cors_2 = require("./configs/cors");
var configs_1 = require("./configs");
var express_session_1 = __importDefault(require("express-session"));
var connect_mongodb_session_1 = __importDefault(require("connect-mongodb-session"));
var session_1 = require("./configs/session");
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
//Store session
var sessionStore = new DBSessions({
    uri: database_1.DB_HOST,
    collection: 'sessions'
});
app.use(express_session_1.default({
    secret: session_1.SESSION,
    resave: true,
    saveUninitialized: false,
    store: sessionStore,
    cookie: {
        sameSite: false,
        maxAge: session_1.MAX_AGE,
    }
}));
//BodyParser
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
//Cors
app.use(cors_1.default({
    credentials: cors_2.CORS_WITH_CREDENTIALS,
    origin: cors_2.CORS_ALLOW_HOST,
    methods: "GET, PUT, POST, DELETE",
    optionsSuccessStatus: 200
}));
//Routes
app.use("/", index_1.default);
app.use("/authors", authors_1.default);
app.use("/books", books_1.default);
app.use("/images", images_1.default);
app.use("/users", users_1.default);
//Starting server
app.listen(configs_1.PORT, function () {
    console.log("Listening on port " + configs_1.PORT);
});
//# sourceMappingURL=app.js.map