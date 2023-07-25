"use strict"

const mongoose = require("mongoose");
const os = require("os");
const process = require("process");

const CHECK_SECOND = 5000;

const MAX_CONNECTION_EACH_CORE = 5;

let intervalId = null;

const countConnect = () => {
    const numConnection = mongoose.connections.length;
    console.log(`Number of connections: ${numConnection}`);
    return numConnection;
}

const checkOverload = () => {
    intervalId = setInterval(() => {
        console.log("CHECK OVERLOAD ............")
        const numConnection = mongoose.connections.length;
        const numCores = os.cpus().length;
        const memoryUsage = process.memoryUsage().rss/1024/1024;
        console.log(`MEMORY USAGE: ${memoryUsage} MB`)
        if (numConnection > numCores * MAX_CONNECTION_EACH_CORE) {
            console.log("CONNECTION OVERLOAD DETECTED!");
        }
    }, CHECK_SECOND)
}

const clearCheckOverload = () => clearInterval(intervalId);

module.exports = {
    countConnect,
    checkOverload,
    clearCheckOverload
}