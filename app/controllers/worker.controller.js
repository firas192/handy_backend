const Worker = require ("../models/worker.model");

/// worker formulaire
const create_worker = (req, res) =>{
      // Validate request
      if ( !req.body.name || !req.body.surname || !req.body.surname ||!req.body.age || !req.body.phoneNumber || !req.body.email || !req.body.profession ||!req.body.experienceExp) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
      }
 
      // Create a woker
      const worker = new Worker({
        name: req.body.name,
        surname:req.body.surname,
        age: req.body.age,
        phoneNumber: req.body.phoneNumber,
        email: req.body.email,
        profession: req.body.profession,
        experienceExp: req.body.experienceExp

       
      });
      // Save Tutorial in the database
      worker
        .save(worker)
        .then(data => {
          res.send(data);
        })
        .catch(err => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while creating the Worker."
          });
        });
    };


/////just admin can delete worker 

const delete_worker = (req, res) => {
    const id = req.params.id;
    Worker.findByIdAndRemove(id)
    .then(data => {
        if (!data) {
        res.status(404).send({
            message: `Cannot delete Worker with id=${id}. Maybe subCategory was not found!`
        });
        } else {
        res.send({
            message: "Worker was deleted successfully!"
        });
        }
    })
    .catch(err => {
        res.status(500).send({
        message: "Could not delete worker with id=" + id
        });
    });
};


//Admin can get all worker list 
const findAll_Worker = (req, res) => {
    const id = req.params._id;
    var condition = id ? { name: { $regex: new RegExp(id), $options: "i" } } : {};
    Worker.find(condition)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving Worker."
        });
      });
  };


  // Find a single Worker with an id
const findOne_worker= (req, res) => {
  const id = req.params.id;
  Worker.findById(id)
  .then(data => {
    if (!data)
      res.status(404).send({ message: "Not found Worker with id " + id });
    else res.send(data);
  })
  .catch(err => {
    res
      .status(500)
      .send({ message: "Error retrieving Worker with id=" + id });
  });
};
// Update a Worker by the id in the request
const update_worker = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const id = req.params.id;

  Worker.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update User with id=${id}. Maybe User was not found!`
        });
      } else res.send({ message: "Worker was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating User with id=" + id
      });
    });
};



module.exports ={
    create_worker,
    delete_worker,
    findAll_Worker,
    findOne_worker,
    update_worker,

    
};