const express = require("express");
require("./db/mongoose");
const bodyParser = require("body-parser");

const cors = require("cors");
const userRouter = require("./routes/user");
const fs = require("fs");
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(userRouter);

const port = 5000;

app.post("/addcart", (req, res) => {
  var data = fs.readFileSync("cart.json");
  var myObject = JSON.parse(data);

  let newData = req.body;

  myObject.push(newData);

  var newData2 = JSON.stringify(myObject);
  fs.writeFile("cart.json", newData2, (err) => {
    if (err) throw err;
    console.log("New data added");
  });
});

app.get("/getcart", (req, res) => {
  var data = fs.readFileSync("cart.json");
  var myObject = JSON.parse(data);
  res.send(myObject);
});

app.post("/deleteItem", (req, res) => {
  var data = fs.readFileSync("cart.json");
  var myObject = JSON.parse(data);
  let index = req.body;
  var newObj = [];
  console.log(index["name"]);
  for (let i = 0; i < myObject.length; i++) {
    let obj = myObject[i];

    if (obj.name == index["name"]) {
      continue;
    } else {
      newObj.push(obj);
    }
  }
  var newData2 = JSON.stringify(newObj);
  fs.writeFile("cart.json", newData2, (err) => {
    if (err) throw err;
    console.log("New data added");
  });
  res.send(newObj);
});

app.listen(port, () => {
  console.log("Server is up and running on port " + port);
});
