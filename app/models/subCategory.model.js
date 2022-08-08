/* const subCategorySchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'category',
        required:true
    },
})
module.exports = mongoose.model('subCategory', subCategorySchema); */

const mongoose= require("mongoose");
const subCategorySchema = mongoose.Schema({
    category_id:{
        type: String,
        required: true
    },
    sub_category:{
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price : {
        type: String,
        required: true
   
    },
    
});
module.exports = mongoose.model("subCategory",subCategorySchema);