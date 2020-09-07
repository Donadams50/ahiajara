const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
const dotenv=require('dotenv');
dotenv.config();

const db = {};
db.mongoose = mongoose;
db.url = process.env.url;

db.products = require("../products/products.model.js")(mongoose);
db.profiles = require("../members/members.model.js")(mongoose);
db.orders = require("../orders/orders.model.js")(mongoose);
db.symptoms = require("../skinissues/skinIssues.symptoms.model.js")(mongoose);
db.skinissues = require("../skinissues/skinIssues.model.js")(mongoose);
db.auths = require("../members/auth.model.js")(mongoose);
module.exports = db;

