const express = require("express");
const report_route = express();
const { authJwt } = require("../middlewares");

const bodyParser = require("body-parser");
report_route.use(bodyParser.json());
report_route.use(bodyParser.urlencoded({extended:true}));

const report_controller = require ("../controllers/report.controller");

report_route.post("/report", [authJwt.verifyToken, authJwt.isClient],report_controller.create_report);

report_route.get("/report/list", [authJwt.verifyToken, authJwt.isAdmin],report_controller.findAll_report);

module.exports = report_route;