const express = require("express");
const order_route = express();
const { authJwt } = require("../middlewares");

const bodyParser = require("body-parser");
order_route.use(bodyParser.json());
order_route.use(bodyParser.urlencoded({extended:true}));

const order_controller= require("../controllers/order.controller");

order_route.post("/order", [authJwt.verifyToken, authJwt.isClient],order_controller.create_order);  

module.exports = order_route;