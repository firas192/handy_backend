const mongoose = require("mongoose");
const validator = require("validator");


const User = mongoose.model(
  "User",
  new mongoose.Schema({
    userName: String,
    firstName: String,
    lastName: String,
    phoneNumber: Number,
    email: String,
    service: String,
    location: String,
    messageDescription: String,
    time: String,
    password: String,
    confirmPassword: String,
    verifCode : String,
    roles: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Role"
      }
    ],
    active : Boolean,
  })
);

module.exports = User;



















/*  const validator = require("validator");
module.exports = mongoose => {
    var schema = mongoose.Schema(
      {
        firstName: String,
        lastName: String,
        phoneNumber: Number,
        email: String,
        service: String,
        location: String,
        messageDescription: String,
        time: String,
        roles: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Role"
              },
        password: String,
        confirmPassword: {
          type: String,
          required: [true, "Please confirm your password"],
          validate: {
            // This only works on CREATE and SAVE!!!
            validator: function (el) {
              return el === this.password;
            },
            message: "Passwords are not the same!",
          },
        },

      },
      { timestamps: true }
    );
    schema.method("toJSON", function() {
      const { __v, _id, ...object } = this.toObject();
      object.id = _id;
      return object;
    });
    const User = mongoose.model("user", schema);
    return User;
  }; */
 





























/* const mongoose = require("mongoose");
const User = mongoose.model(
  "User",
  new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    roles: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Role"
      }
    ]
  })
);
module.exports = User;








 */



















