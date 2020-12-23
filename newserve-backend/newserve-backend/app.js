var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors = require("cors");
var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");

var corsOptions = {
  origin: "*",
  optionsSuccessStatus: 200,
};
var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(cors(corsOptions));
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
var pondsRouter = require("./routes/ponds");
app.use("/ponds", pondsRouter);
var productsRouter = require("./routes/products");
app.use("/products", productsRouter);
var categoriesRouter = require("./routes/categories");
app.use("/categories", categoriesRouter);
var fishRouter = require("./routes/fishs");
app.use("/fish", fishRouter);
var timelineRouter = require("./routes/timeline");
app.use("/timeline", timelineRouter);
var guidesRouter = require("./routes/guides");
app.use("/guides", guidesRouter);
var stockRouter = require("./routes/stock");
app.use("/stock", stockRouter);
var cartRouter = require("./routes/cart");
app.use("/cart", cartRouter);
var authenRouter = require("./routes/authen");
app.use("/authen", authenRouter);
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

module.exports = app;
