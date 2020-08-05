require("dotenv").config();
var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const favicon = require("serve-favicon");
const hbs = require("hbs");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((x) => {
    console.log(
      `Connected to Mongo! Database name: "${x.connections[0].name}"`
    );
  })
  .catch((err) => {
    console.error("Error connecting to mongo", err);
  });
var authRouter = require("./routes/auth");
var indexRouter = require("./routes/index");
var profileRouter = require('./routes/profile');
var editprofileRouter = require('./routes/edit-profile');
var searchRouter = require('./routes/search')
var songRouter = require('./routes/song-display')
var homeRouter = require('./routes/home')
var addRouter = require('./routes/add');

var app = express();
// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");
// Middleware Setup
app.use(session({
  secret: process.env.SESSION_SECRET,
  cookie: {
    maxAge: 6000000000
  },
  store: new MongoStore({
    mongooseConnection: mongoose.connection,
    ttl: 24 * 60 * 60 // 1 day
  }),
  resave: true,
  saveUninitialized: true
}));
//res.locals es el objeto que usamos para pasar datos a las vistas
app.use((req, res, next) => {

  if (req.session.currentUser) {
    res.locals.currentUserInfo = req.session.currentUser;
    res.locals.isUserLoggedIn = true;
  } else {
    res.locals.isUserLoggedIn = false;
  }

  next();
});
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
hbs.registerPartials(__dirname + '/views/partials')
//app.use(favicon(path.join(__dirname, "public", "images", "favicon.ico")));
//colocamos las rutas públicas primero
app.use("/auth", authRouter);
app.use("/", indexRouter);
app.use('/profile', profileRouter);
app.use('/edit', editprofileRouter);
app.use('/', searchRouter);
app.use('/', songRouter);
app.use('/', homeRouter)
app.use('/', addRouter);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});
// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.render("error");
});
//Default value for local title
app.locals.title = 'K-Recorder'

module.exports = app;