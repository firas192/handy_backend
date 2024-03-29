//const dbConfig = require("../config/db.config.js");
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
const db = {};
db.mongoose = mongoose;
//db.url = dbConfig.url;
db.users = require("./user.model");
db.role = require("./role.model");
db.refreshToken = require("./refreshToken.model");
db.categorys = require("./category.model.js")(mongoose);
db.subCategory = require("./subCategory.model.js")(mongoose);
db.report= require("./report.model.js")(mongoose);
db.worker= require("./worker.model.js")(mongoose);
db.order= require("./order.model.js")(mongoose);
db.contactForm=require("./contactForm.model.js")(mongoose);
db.ROLES = ["user", "admin","client"];
module.exports = db;
