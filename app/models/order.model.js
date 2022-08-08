const mongoose= require("mongoose");
const orderSchema = mongoose.Schema({
    worker_id:{
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true
    },

    date_order: Date,
},{
    timestamps: true,
});
module.exports = mongoose.model("order",orderSchema);