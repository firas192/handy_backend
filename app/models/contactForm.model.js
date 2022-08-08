const mongoose= require("mongoose");
const contactFormSchema = mongoose.Schema({
    userName: String,
    phoneNumber: Number,
    email: String,
    service: String,
    location: String,
    messageDescription: String,
    time: String,
},{
     timestamps: true,
});
module.exports = mongoose.model("contactForm",contactFormSchema);