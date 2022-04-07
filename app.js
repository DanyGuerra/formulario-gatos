require("dotenv").config();
const express = require("express");
const path = require("path");
const app = express();
const router = express.Router();

app.use("/", router);
app.use(express.static(path.resolve(__dirname, "./client/build")));
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use("/", require("./routes"));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./client/build", "index.html"));
});

app.listen(5000, () => {});
