const { authJwt } = require("../middlewares");
const user_controller = require("../controllers/user.controller");
const categories_controller = require("../controllers/category.controller.js");
module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
 // app.get("/api/client/workerList", [authJwt.verifyToken, authJwt.isClient],user_controller.findAll_Worker);
 // app.get("/api/client/categoryList",[authJwt.verifyToken, authJwt.isClient],categories_controller.findAll);


};























/* 

module.exports = app => {
    const users = require("../controllers/user.controller.js");
    var router = require("express").Router();
    // Create a new Tutorial
    router.post("/", users.create);
    // Retrieve all workers
    router.get("/", users.findAll);
    // Retrieve all published workers
    router.get("/published", users.findAllPublished);
    // Retrieve a single Tutorial with id
    router.get("/:id", users.findOne);
    // Update a Tutorial with id
    router.put("/:id", users.update);
    // Delete a Tutorial with id
    router.delete("/:id", users.delete);
    // Create a new Tutorial
    router.delete("/", users.deleteAll);

    app.use('/api/users', router);
  };
 */