const mongoose= require("mongoose");
const workerSchema = mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    surname:{
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    phoneNumber: {
        type: Number,
        required: true
   
    },
    email: {
        type: String,
        required: true
   
    },
    profession: {
        type: String,
        required: true
   
    },
    experienceExp: {
        type: String,
        required: true
   
    },
    All_report: [String],
    All_order: [String]
});
module.exports = mongoose.model("worker",workerSchema);