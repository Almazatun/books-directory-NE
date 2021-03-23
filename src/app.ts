import 'reflect-metadata';
import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
import IndexRouter from "./routes/index";
import {DB_HOST} from "./configs/database";
import {CORS_ALLOW_HOST, CORS_WITH_CREDENTIALS} from "./configs/cors";
import {PORT} from "./configs";
import session from "express-session";
import mongoDBSession from 'connect-mongodb-session'
import {MAX_AGE, SESSION} from "./configs/session";
import cookieParser from "cookie-parser";
import {userController} from "./user";
import {bookController} from "./book";
import {imageController} from "./image";
import {authorController} from "./author";

//Session db
const DBSessions = mongoDBSession(session);


//Create express app
const app = express();

app.use(cookieParser());
app.use('/public', express.static('public'));

//Config Object to Avoid Deprecation Warnings
const dbOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
};

//MongoDB
//Connection database
mongoose.connect(DB_HOST, dbOptions);

//Store Connection Object
const db = mongoose.connection;

//Connection events
db.once("open", () => {
    console.log("Connected to MongoDB database...");
}).on("error", (err: string) => {
    console.log(err);
});

//BodyParser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

//Cors
app.use(
    cors({
        credentials: CORS_WITH_CREDENTIALS,
        origin: CORS_ALLOW_HOST,
        methods: "GET, PUT, POST, DELETE",
        optionsSuccessStatus: 200
    })
);

//Store session
const sessionStore = new DBSessions({
    uri: DB_HOST,
    collection: 'sessions'
});

app.use(session({
        name: 'cls',
        secret: SESSION,
        resave: false,
        saveUninitialized: false,
        store: sessionStore,
        cookie: {
            maxAge: MAX_AGE,
            httpOnly: true,
            secure: false
        }
    })
);

//Routes
app.use("/", IndexRouter);
app.use("/authors", authorController.routes());
app.use("/books", bookController.routes());
app.use("/images", imageController.routes());
app.use("/users", userController.routes());


//Starting server
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});
