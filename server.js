const express = require("express");
const cors = require("cors");
const dbConfig = require("./app/config/db.config");
const app = express();

var corsOptions = {
  origin: "http://localhost:8081"
};
app.use(cors(corsOptions));
// parse requests of content-type - application/json
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));




const db = require("./app/models");
const Role = db.role;


db.mongoose
.connect(`mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true
  })
  .then(() => {
    console.log("Successfully connect to MongoDB.");
    initial();

  })
  .catch(err => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });




// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Handy application." });  
});


// routes
require("./app/routes/auth.routes")(app);
require("./app/routes/user.routes")(app);
require("./app/routes/category.routes")(app);

/// subcategory route

const subcategory_route = require("./app/routes/subCategory.routes");
app.use('/api',subcategory_route);

//worker routes
const worker_route= require("./app/routes/worker.routes");
app.use('/api',worker_route);

//report worker
const report_route = require("./app/routes/report.routes");
app.use('/api',report_route);

//////contact Form route
const contact_form= require("./app/routes/contactForm.routes")
app.use('/api',contact_form);

//// order routes
const order_route =require("./app/routes/order.routes")
app.use('/api',order_route);


/////admin routers
const adminRouter = require("./app/routes/admin.routes")
app.use('/admin',adminRouter);


// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

//////// function for add admin and user to role collection 
function initial() {
  Role.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new Role({
        name: "user"
      }).save(err => {
        if (err) {
          console.log("error", err);
          
        }
        console.log("added 'user' to roles collection");
      });

      new Role({
        name: "admin"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }
        console.log("added 'admin' to roles collection");
      });

      new Role({
        name: "client"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }
        console.log("added 'client' to roles collection");
      });
      

    }
  });
}