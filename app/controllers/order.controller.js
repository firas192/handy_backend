const Order = require("../models/order.model");
const Worker =  require("../models/worker.model");
exports.create_order = async function (req, res) {
    // Validate request
   try {

    if (!req.body) {
      res.status(400).send({ message: "Content can not be empty!" });
      return;
    }
    // Create/////////////////////////// habaset lahna bash nzed faza mteaa waket 
    else {
        let expiredAt = new Date();
        expiredAt.setSeconds(
            expiredAt.getSeconds()
          );
      const order = new Order({
      worker_id: req.body.worker_id,
      description: req.body.description,
      order_data: expiredAt.getTime()
 
    });
   
    // Save report in the database

      const order_data = await order.save();

      await  Worker.findOneAndUpdate(
       {_id : order_data.worker_id},   
       {$push : {All_order : order_data._id}});


       res.status(200).send({ message: "Success!" });
      
      }
    }catch(error){
      res.status(400).send({sucess:false,msg:error.message});
       }
      
    };
