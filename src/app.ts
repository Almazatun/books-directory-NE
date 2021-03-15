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
import {container} from 'tsyringe';
import {AuthorsController} from "./authors/authors_controller";
import {BooksController} from "./books/books_controller";
import {UsersController} from "./users/users_controller";
import {ImagesController} from "./images/images_controller";
import cookieParser from "cookie-parser";

//Session db
const DBSessions = mongoDBSession(session)


//Create express app
const app = express();
app.use('/public', express.static('public'))

//Config Object to Avoid Deprecation Warnings
const dbOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useMongoClient: true
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
app.use(bodyParser.urlencoded({extended: false}))

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
})

//https://github.com/expressjs/session/issues/633
app.set('trust proxy', 1);


app.use(cookieParser());
app.use(session({
        secret: SESSION,
        resave: false,
        saveUninitialized: true,
        store: sessionStore,
        cookie: {
            sameSite: "none",
            maxAge: MAX_AGE,
            //https://github.com/expressjs/session#cookiesecure
            secure: false,
            httpOnly: true
        }
    })
)

//Routes
app.use("/", IndexRouter);
app.use("/authors", container.resolve(AuthorsController).routes());
app.use("/books", container.resolve(BooksController).routes());
app.use("/images", container.resolve(ImagesController).routes());
app.use("/users", container.resolve(UsersController).routes());


//Starting server
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});
