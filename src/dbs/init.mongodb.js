"use strict";

const mongoose = require("mongoose");
const {
  db: { host, port, name },
} = require("../configs/config.mongodb");
const { countConnect } = require("../helper/check.connect");

const connectString = `mongodb://${host}:${port}/${name}`;

class Database {
  constructor() {
    this.connect();
  }

  connect(type = "mongodb") {
    mongoose.set("debug", true);
    mongoose.set("debug", { color: true });
    console.log("CONNECT STRING", connectString);
    mongoose
      .connect(connectString, { maxPoolSize: 50 })
      .then(() => console.log("CONNECT DATABASE SUCCESS", countConnect()))
      .catch((err) => console.log("CONNECT DB ERROR", err));
  }

  static getInstance() {
    if (!Database.instance) {
      Database.instance = new Database();
    }
    return Database.instance;
  }
}

const instanceMongodb = Database.getInstance();
module.exports = instanceMongodb;
