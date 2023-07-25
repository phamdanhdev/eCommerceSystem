require("dotenv").config()
const compression = require("compression");
const express = require("express");
const { default: helmet } = require("helmet");
const morgan = require("morgan");
const app = express();

// init middleware
app.use(morgan("dev"));
app.use(helmet());
app.use(compression());
app.use(express.json()); //Khong can dung bodyparser nua, express da update roi
//Mo rong url
app.use(express.urlencoded({
    extended: true
}))

// init db
require("./dbs/init.mongodb");
// const { checkOverload } = require("./helper/check.connect");
// checkOverload();
// init routes
app.use("/", require('./routes'))

// handling error

module.exports = app;