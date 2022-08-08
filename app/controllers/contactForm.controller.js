const Formulair =require ("../models/contactForm.model");
const User = require ("../models/user.model");

//////// client can contacts us form make service 

const create_formulaire = (req, res) => {
    // Validate request
    if (!req.body) {
      res.status(400).send({ message: "Content can not be empty!" });
      return;
    }
    // Create a formulaire
    const formulair = new Formulair({
      userName: req.body.userName,
      phoneNumber: req.body.phoneNumber,
      email: req.body.email,
      service: req.body.service,
      location: req.body.location,
      time: req.body.time,
      messageDescription: req.body.messageDescription,
    });
    /////// if username exist in data base of user safe formular if not doen safe 
    User.findOne( {userName: req.body.userName}, function(err,user){
  
          var message;
          if(user) {
            
            console.log(user)
            message = "user exists";
            console.log(message)
            formulair
            .save(formulair)
            .then(data => {
              res.send(data);
            })
            .catch(err => {
              res.status(500).send({
                message:
                  err.message || "Some error occurred while creating the Category."
              });
            });

      
          } else {
            

            res.send("user DOES NOT exists ")
          }

    });





    // Save formulair in the database
 
  };






  


  // Retrieve all Formulair from the database.

  const findAll_formulair = (req, res) => {
    const useName = req.query.userName;
    var condition = useName ? { name: { $regex: new RegExp(useName), $options: "i" } } : {};
    Formulair.find(condition)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving Formulair."
        });
      });
  };


// Find a single subCategory with an id


  const findOne_formulaire = (req, res) => {
    const id = req.params.id;
    Formulair.findById(id)
      .then(data => {
        if (!data)
          res.status(404).send({ message: "Not found Formulair with id " + id });
        else res.send(data);
      })
      .catch(err => {
        res
          .status(500)
          .send({ message: "Error retrieving Formulair with id=" + id });
      });
  };



//Delete a Tutorial with the specified id:

const delete_formulaire = (req, res) => {
    const id = req.params.id;
    Formulair.findByIdAndRemove(id)
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot delete Formulair with id=${id}. Maybe subCategory was not found!`
          });
        } else {
          res.send({
            message: "Formulair was deleted successfully!"
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Formulair with id=" + id
        });
      });
  };

//Delete all subCategory from the database:

const deleteAll_formulaire = (req, res) => {
    Formulair.deleteMany({})
      .then(data => {
        res.send({
          message: `${data.deletedCount} Formulair were deleted successfully!`
        });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all Formulair."
        });
      });
  };



  module.exports = {
    create_formulaire,
    deleteAll_formulaire,
    delete_formulaire,
    findAll_formulair,
    findOne_formulaire

  
  };