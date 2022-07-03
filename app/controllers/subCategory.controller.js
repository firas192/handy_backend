const SubCategory = require ("../models/subCategory.model");


const create_subcategory = async(req,res)=>{

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
                category_id:req.body.category_id,
                sub_category:req.body.sub_category,
                description:req.body.description,
                price:req.body.price
             });
             const sub_cat_data = await subCategory.save();
             res.status(200).send({sucess:true,msg:"sub-category detail",data:sub_cat_data});
        }
        

      

    }catch(error){
        res.status(400).send({sucess:false,msg:error.message});
    }
}

  // Retrieve all Tutorials from the database.
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
            err.message || "Some error occurred while retrieving category."
        });
      });
  };
// Find a single Tutorial with an id
  const findOne_subCategory = (req, res) => {
    const id = req.params.id;
    SubCategory.findById(id)
      .then(data => {
        if (!data)
          res.status(404).send({ message: "Not found Category with id " + id });
        else res.send(data);
      })
      .catch(err => {
        res
          .status(500)
          .send({ message: "Error retrieving Category with id=" + id });
      });
  };














module.exports= {
    create_subcategory,
    findAll_subCategory,
    findOne_subCategory
}