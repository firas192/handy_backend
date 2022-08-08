const Report =  require("../models/report.model");
const Worker =  require("../models/worker.model");
//const db =require("../models");


//////// client can declarate report of any worker deal with him
exports.create_report = async function (req, res) {
    // Validate request
   try {

    if (!req.body) {
      res.status(400).send({ message: "Content can not be empty!" });
      return;
    }
    // Create a report
    else {
      const report = new Report({
      worker_id: req.body.worker_id,
      description: req.body.description,
 
    });
   
    // Save report in the database

      const report_data = await report.save();

      await  Worker.findOneAndUpdate(
       {_id : report_data.worker_id},   
       {$push : {All_report : report_data._id}});


       res.status(200).send({ message: "Success!" });
      
      }
    }catch(error){
      res.status(400).send({sucess:false,msg:error.message});
       }
      
    };


 ///////////only admin can get all report of worker 


 exports.findAll_report = (req, res) => {
  const id = req.params._id;
  var condition = id ? { name: { $regex: new RegExp(id), $options: "i" } } : {};
  Report.find(condition)
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

