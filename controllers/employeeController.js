const express = require("express");
const mongoose = require("mongoose");
const Employee = mongoose.model("Employee");
var router = express.Router();

var app = express();
require("../models/db");
const { connectToDb, getDb } = require("../models/db");
let db;
connectToDb((err) => {
  if (!err) {
    db = getDb();
  }
});

router.get("/", (req, res) => {
  res.render("employee/addOrEdit", {
    viewTitle: "Insert Employee",
  });
});

router.post("/", (req, res) => {
  insertRecord(req, res);
});

const insertRecord = (req, res) => {
  var employee = new Employee();
  employee.fullName = req.body.fullName;
  employee.email = req.body.email;
  employee.mobile = req.body.mobile;
  employee.city = req.body.city;
  db.collection("employees")
    .insertOne(employee)
    .then(() => {
      res.redirect("employee/list");
    })
    .catch((err) => res.status(500).json(err));
};

router.get("/list", (req, res) => {
  res.json("from list");
});

module.exports = router;
