const { authJwt } = require("../middlewares");



module.exports = app => {
    const categories = require("../controllers/category.controller.js");
    var router = require("express").Router();
    // Create a new Category
  router.post("/", [authJwt.verifyToken, authJwt.isAdmin],categories.create);
     // admin and client can Retrieve all Categorys
  router.get("/list", [authJwt.verifyToken, authJwt.isAdminClient],categories.findAll);
   // admin and client can Retrieve a single Category with id
  router.get("/list/:id", [authJwt.verifyToken, authJwt.isAdminClient],categories.findOne);
   // Update a Category with id
  router.put("/:id",[authJwt.verifyToken, authJwt.isAdmin], categories.update);
  // Delete a Category with id
  router.delete("/:id", [authJwt.verifyToken, authJwt.isAdmin],categories.delete);
    // Delete all Category 
  router.delete("/", [authJwt.verifyToken, authJwt.isAdmin],categories.deleteAll);

  app.use('/api/categories', router);
  };
  