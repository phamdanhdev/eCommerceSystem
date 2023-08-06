require("dotenv").config()
const compression = require("compression");
const express = require("express");
const { default: helmet } = require("helmet");
const morgan = require("morgan");
const { asyncHandler } = require("./auth/checkAuth");
const accessController = require("./controllers/access.controller");
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

//DummyAPIKey: 494ed4f41d0909dee30517fc4c06ce7c48c4a84a0c0e54eb14f82caa9ee1f8159e1b7ac4b7c5617540cbbc89c27234bd0589726163206d2e2217d530697c80b6
app.use("/dummyAPIKey", asyncHandler(accessController.createAPIKeyDummyForDevelopment)) //This API just for development to access others API.

app.use("/", require('./routes'))

// handling error router not found
app.use((req, res, next) => {
    const error = new Error('Not Found');
    error.statusCode = 404;
    next(error);
})

// handling error from throw error
app.use((error, req, res, next) => {
    const statusCode = error.statusCode || 500;
    return res.status(statusCode).json({
        status: 'error',
        code: statusCode,
        message: error.message || 'Internal Server Error'
    })
})

module.exports = app;