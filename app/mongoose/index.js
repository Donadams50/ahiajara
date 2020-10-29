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
db.dispatchs = require("../orders/dispatch.model.js")(mongoose);
db.symptoms = require("../skinIssues/skinissues.symptoms.model.js")(mongoose);
db.skinissues = require("../skinIssues/skinissues.model.js")(mongoose);
db.auths = require("../members/auth.model.js")(mongoose);
db.bespokes = require("../bespoke/bespoke.model.js")(mongoose);
db.entrys = require("../bespoke/entry.model.js")(mongoose);
db.carts = require("../cart/cart.model.js")(mongoose);
db.questionaires = require("../questionaire/questionaire.model.js")(mongoose);
db.questionaireentrys = require("../questionaire/questionaireentry.model.js")(mongoose);
db.requestedproducts = require("../requestedproduct/requestedproduct.model.js")(mongoose);
db.adverts = require("../products/ads.model.js")(mongoose);
db.newskinissues = require("../skinIssues/newskinissues.model.js")(mongoose);
db.notifications = require("../notification/notification.model.js")(mongoose);
module.exports = db;

