const express = require("express");
const worker_route = express();

const { authJwt } = require("../middlewares");
const bodyParser = require("body-parser");
worker_route.use(bodyParser.json());
worker_route.use(bodyParser.urlencoded({extended:true}));


const worker_controller = require ("../controllers/worker.controller");


worker_route.post("/worker",worker_controller.create_worker);
worker_route.delete("/worker/:id",[authJwt.verifyToken, authJwt.isAdmin],worker_controller.delete_worker);
worker_route.get("/worker/list",[authJwt.verifyToken, authJwt.isAdminClient],worker_controller.findAll_Worker);
worker_route.get("/worker/list/:id",[authJwt.verifyToken, authJwt.isAdminClient],worker_controller.findOne_worker);
worker_route.put("/worker/:id",[authJwt.verifyToken, authJwt.isAdmin],worker_controller.update_worker);
module.exports = worker_route;
