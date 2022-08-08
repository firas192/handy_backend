const mongoose= require("mongoose");
const reportSchema = mongoose.Schema({
    worker_id:{
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true
    },

    
});
module.exports = mongoose.model("report",reportSchema);