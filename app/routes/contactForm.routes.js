const { verifySignUp } = require("../middlewares");
const controller = require("../controllers/auth.controller");
const express = require("express");
const contactForm_route = express();
const contactForm_controller = require("../controllers/contactForm.controller.js");
const { authJwt } = require("../middlewares");

const bodyParser = require("body-parser");
contactForm_route.use(bodyParser.json());
contactForm_route.use(bodyParser.urlencoded({extended:true}));


contactForm_route.post("/client/contactForm",[authJwt.verifyToken, authJwt.isClient],contactForm_controller.create_formulaire);

contactForm_route.get("/admin/contactForm", [authJwt.verifyToken, authJwt.isAdmin],contactForm_controller.findAll_formulair);
contactForm_route.get("/admin/contactForm/:id", [authJwt.verifyToken, authJwt.isAdmin],contactForm_controller.findOne_formulaire);
// contactForm_route.put("/subCategories/:id",[authJwt.verifyToken, authJwt.isAdmin], contactForm_controller.update_subCategory);
contactForm_route.delete("/admin/contactForm/:id",[authJwt.verifyToken, authJwt.isAdmin], contactForm_controller.delete_formulaire);
contactForm_route.delete("admin/contactForm/:id",[authJwt.verifyToken, authJwt.isAdmin], contactForm_controller.deleteAll_formulaire);

module.exports = contactForm_route;

