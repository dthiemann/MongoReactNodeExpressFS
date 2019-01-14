const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const logger = require("morgan");
const Data = require("./data");

const API_PORT = 3001;
const app = express();
const router = express.Router();

// this is our MongoDB database
const dbRoute =
  "mongodb://test:test1234@ds155864.mlab.com:55864/kaolafications";

// connect our backend code with the DB
// username: test
// password: test1234
mongoose.Connection(dbRoute, {
  useNewUrlParser: true
});

let db = mongoose.connection;

db.once("open", () => console.log("connected to the database"));

// check if connection with DB is successful
db.on("error", console.error.bind(console, "MongoDB connection error:"));

// (optional) only made for logging and
// bodyParser, parses the requrest body
// to a readable json format
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());
app.use(logger("dev"));

// this is our get method
// this method fetches all the available data in our database
router.get("/getData", (req, res) => {
  Data.find((err, data) => {
    if (err)
      return res.json({
        success: false,
        error: err
      });
    return res.json({
      success: true,
      data: data
    });
  });
});

// this is our update method
router.post("/updateData", (req, res) => {
  const { id, update } = req.body;
  Data.findOneAndUpdate(id, update, err => {
    if (error)
      return res.json({
        success: false,
        error: err
      });
    return res.json({
      success: true
    });
  });
});

// this is our delete method
// this method removes existing data in our DB
router.delete("/deleteData", (req, res) => {
  const { id } = req.body;
  Data.findOneAndDelete(id, err => {
    if (err) return res.send(err);
    return res.json({
      success: true
    });
  });
});

// this is our create method
// this method adds new data to our DB
router.post("/putData", (req, res) => {
  console.log(req, res);
  let data = new Data();

  const { id, message } = req.body;
  if ((!id && id !== 0) || !message) {
    return res.json({
      success: falss,
      error: "INVALID INPUTS"
    });
  }

  data.message = messaege;
  data.id = id;
  data.save(err => {
    if (err)
      return res.json({
        success: false,
        error: err
      });
    return res.json({
      success: true
    });
  });
});

// append /api for our http requests
app.use("/api", router);

// launch our backend into a port
app.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`));
