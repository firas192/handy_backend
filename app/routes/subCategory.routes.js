const express = require("express");
const subcategory_route = express();
const { authJwt } = require("../middlewares");

const bodyParser = require("body-parser");
subcategory_route.use(bodyParser.json());
subcategory_route.use(bodyParser.urlencoded({extended:true}));

const subcategory_controller = require ("../controllers/subCategory.controller");

subcategory_route.post("/subCategories", [authJwt.verifyToken, authJwt.isAdmin],subcategory_controller.create_subcategory);
 // admin and client can Retrieve a single subCategory with id
subcategory_route.get("/subCategories", [authJwt.verifyToken, authJwt.isAdminClient],subcategory_controller.findAll_subCategory);
 // admin and client can Retrieve a single subCategory with id
subcategory_route.get("/subCategories/:id", [authJwt.verifyToken, authJwt.isAdminClient],subcategory_controller.findOne_subCategory);
subcategory_route.put("/subCategories/:id",[authJwt.verifyToken, authJwt.isAdmin], subcategory_controller.update_subCategory);
subcategory_route.delete("/subCategories/:id",[authJwt.verifyToken, authJwt.isAdmin], subcategory_controller.delete_subCategory);
subcategory_route.delete("/subCategories/:id",[authJwt.verifyToken, authJwt.isAdmin], subcategory_controller.deleteAll_subCategory);

module.exports = subcategory_route;    