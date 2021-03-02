import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
import IndexRouter from "./routes/index";
import Authors from "./routes/authors";
import Books from "./routes/books";
import Images from "./routes/images";
import Users from './routes/users'
import {DB_HOST} from "./configs/database";
import {CORS_ALLOW_HOST, CORS_WITH_CREDENTIALS} from "./configs/cors";
import {PORT} from "./configs";
import session from "express-session";
import mongoDBSession from 'connect-mongodb-session'
import {MAX_AGE, SESSION} from "./configs/session";

//Session db
const DBSessions = mongoDBSession(session)


//Create express app
const app = express();
app.use('/public' ,express.static('public'))

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

//Store session
const sessionStore = new DBSessions({
    uri: DB_HOST,
    collection: 'sessions'
})

app.use(
    session({
        secret: SESSION,
        resave: true,
        saveUninitialized: false,
        store: sessionStore,
        cookie: {
            sameSite: false,
            maxAge: MAX_AGE,
        }
    })
)

//BodyParser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}))

//Cors
app.use(
  cors({
    credentials: CORS_WITH_CREDENTIALS,
    origin: CORS_ALLOW_HOST,
  })
);

//Routes
app.use("/", IndexRouter);
app.use("/authors", Authors);
app.use("/books", Books);
app.use("/images", Images);
app.use("/users", Users);


//Starting server
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
