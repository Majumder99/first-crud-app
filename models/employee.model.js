const mongoose = require("mongoose");

var employeeSchema = new mongoose.Schema({
  fullName: {
    type: String,
  },
  email: {
    type: String,
  },
  mobile: {
    type: String,
  },
  city: {
    type: String,
  },
});

//this schema will stored in the plural version of model name which is employees
mongoose.model("Employee", employeeSchema);
