require("./models/db");

const express = require("express");
const employeeController = require("./controllers/employeeController");
const path = require("path");
const exphbs = require("express-handlebars");

var app = express();
app.set("views", path.join(__dirname, "/views/"));
app.engine(
  ".hbs",
  exphbs.engine({
    extname: ".hbs",
    defaultLayout: "mainLayout",
    layoutsDir: __dirname + "/views/layouts/",
  })
);
app.set("view engine", ".hbs");

const { connectToDb, getDb } = require("./models/db");

//db connection
let db;
connectToDb((err) => {
  if (!err) {
    app.listen(3000, () => {
      console.log("App listening on port 3000");
    });
    db = getDb();
  }
});

// app.get("/", (req, res) => {
//   res.status(200).json("simple text");
// });

app.use("/employee", employeeController);
