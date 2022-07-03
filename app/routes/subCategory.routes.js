

const express = require("express");
const subcategory_route = express();
const { authJwt } = require("../middlewares");

const bodyParser = require("body-parser");
subcategory_route.use(bodyParser.json());
subcategory_route.use(bodyParser.urlencoded({extended:true}));

const subcategory_controller = require ("../controllers/subCategory.controller");

subcategory_route.post("/subCategories", [authJwt.verifyToken, authJwt.isAdmin],subcategory_controller.create_subcategory);
subcategory_route.get("/subCategories", [authJwt.verifyToken, authJwt.isAdmin],subcategory_controller.findAll_subCategory);
subcategory_route.get("/subCategories/:id", [authJwt.verifyToken, authJwt.isAdmin],subcategory_controller.findOne_subCategory);

module.exports = subcategory_route;