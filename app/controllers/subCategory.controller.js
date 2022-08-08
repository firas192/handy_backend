const SubCategory = require ("../models/subCategory.model");
const Category = require("../models/category.model");
const db = require("../models");

const create_subcategory =  async function (req ,res){

    try{
        const check_sub = await SubCategory.find({category_id:req.body.category_id});/// cheack if sub category exist or not  bash ken famma wahda kifha matzedsh 

        if(check_sub.length > 0){

            let checking = false;
            for(let i = 0;i<check_sub.length;i++){
                if(check_sub[i]['sub_category'].toLowerCase() === req.body.sub_category.toLowerCase() ){
                        checking = true;
                        break;
                }
            }
            if(checking === false){
                const subCategory = new SubCategory({
                    category_id:req.body.category_id,
                    sub_category:req.body.sub_category,
                    description:req.body.description,
                    price:req.body.price
                 });
                 const sub_cat_data = await subCategory.save();

                 res.status(200).send({sucess:true,msg:"sub-category detail",data:sub_cat_data});
            }
            else {
                res.status(200).send({sucess:true,msg:"This sub-category("+req.body.sub_category+")is already exist"});

            }
        }
        else{
            const subCategory = new SubCategory({
                category_id: req.body.category_id,
                sub_category: req.body.sub_category,
                description: req.body.description,
                price:req.body.price
             });

  ////////////function for update database category to add id of subcategory to category parent
       
             const sub_cat_data = await subCategory.save();
              
              await  db.categorys.findOneAndUpdate(
                {_id : sub_cat_data.category_id},
                {$push : {subCategories : sub_cat_data._id}}, );
        
        res.status(200).send({sucess:true,msg:"sub-category detail",data:sub_cat_data});
           }
        
    }catch(error){
        res.status(400).send({sucess:false,msg:error.message});
    }
}




  // Retrieve all subCategory from the database.

  const findAll_subCategory = (req, res) => {
    const sub_category = req.query.sub_category;
    var condition = sub_category ? { name: { $regex: new RegExp(sub_category), $options: "i" } } : {};
    SubCategory.find(condition)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving subcategory."
        });
      });
  };


// Find a single subCategory with an id


  const findOne_subCategory = (req, res) => {
    const id = req.params.id;
    SubCategory.findById(id)
      .then(data => {
        if (!data)
          res.status(404).send({ message: "Not found subCategory with id " + id });
        else res.send(data);
      })
      .catch(err => {
        res
          .status(500)
          .send({ message: "Error retrieving subCategory with id=" + id });
      });
  };


  // Update a subCategory by the id in the request


const update_subCategory = (req, res) => {
    if (!req.body) {
      return res.status(400).send({
        message: "Data to update can not be empty!"
      });
    }
    const id = req.params.id;
    SubCategory.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot update subCategory with idnew=${id}. Maybe subCategory was not found!`
          });
        } else res.send({ message: "subCategory was updated successfully." });
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating subCategory with id=" + id
        });
      });
  };

  //Delete a Tutorial with the specified id:

  const delete_subCategory = (req, res) => {
    const id = req.params.id;
    SubCategory.findByIdAndRemove(id)
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot delete subCategory with id=${id}. Maybe subCategory was not found!`
          });
        } else {
          res.send({
            message: "subCategory was deleted successfully!"
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete subCategory with id=" + id
        });
      });
  };

//Delete all subCategory from the database:

const deleteAll_subCategory = (req, res) => {
    SubCategory.deleteMany({})
      .then(data => {
        res.send({
          message: `${data.deletedCount} subCategory were deleted successfully!`
        });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all subCategory."
        });
      });
  };










module.exports= {
  
    create_subcategory,
    findAll_subCategory,
    findOne_subCategory,
    update_subCategory,
    delete_subCategory,
    deleteAll_subCategory
}