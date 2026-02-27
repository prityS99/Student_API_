const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const Student = new Schema({
  name: {
    type: String,
    required: true,
  },

  standard: {
    type: String,
    required: true,
  },

  address: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    default: "default.jpg",
  },
});

const StudentModel = mongoose.model("student", Student);

module.exports = StudentModel;



