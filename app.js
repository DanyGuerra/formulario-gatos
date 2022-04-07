require("dotenv").config();
console.log(process.env);
const express = require("express");
const app = express();
const router = express.Router();

app.use("/", router);
app.set("view engine", "ejs");
app.set("views", __dirname + "/views");
app.use(express.static(__dirname + "/public"));
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use("/", require("./routes"));

app.listen(5000, () => {});
