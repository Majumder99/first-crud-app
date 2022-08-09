const express = require("express");
const mongoose = require("mongoose");
const Employee = mongoose.model("Employee");
const { ObjectId } = require("mongodb");
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
  if (req.body._id === "") {
    insertRecord(req, res);
  } else {
    updateRecord(req, res);
  }
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
    .catch((err) => {
      res.render("employee/addOrEdit", {
        viewTitle: "Insert Employee",
        employee: req.body,
      });
    });
};

const updateRecord = (req, res) => {
  const employee = req.body;
  if (ObjectId.isValid(req.body._id)) {
    db.collection("employees")
      .updateOne(
        { _id: ObjectId(req.body._id) },
        {
          $set: {
            fullName: employee.fullName,
            email: employee.email,
            mobile: employee.mobile,
            city: employee.city,
          },
        }
      )
      .then(() => {
        res.redirect("employee/list");
      });
  } else {
    res.status(500).json({ id: req.body._id });
  }
};

router.get("/list", (req, res) => {
  let employee = [];

  db.collection("employees")
    .find()
    .forEach((emp) => employee.push(emp))
    .then(() => {
      res.render("employee/list", {
        list: employee,
      });
    })
    .catch((err) => res.status(500).json({ err }));
});

router.get("/:id", (req, res) => {
  if (ObjectId.isValid(req.params.id)) {
    db.collection("employees")
      .findOne({ _id: ObjectId(req.params.id) })
      .then((doc) => {
        res.render("employee/addOrEdit", {
          viewTitle: "Update Employee",
          employee: doc,
        });
      })
      .catch((err) => res.status(500).json({ err }));
  } else {
    res.status(500).json("Id is not valid");
  }
});

module.exports = router;
