const express = require("express");
const router = express.Router();
const User = require("../models/user");

//check user login-authenticaton
router.post("/users/login",async (req,res)=>{
  try{
    const user = await User.findByCredentials(req.body.username,req.body.password)
    res.send(user)
  }catch(error){
    res.status(401).send(error);
  }
})





//create new user
router.post("/users", async (req, res) => {
  console.log(req.body);
  const user = new User(req.body);

  try {
    await user.save();
    res.status(201).send(user);
  } catch (error) {
    res.status(400).send(error);
  }
});

//get all users
router.get("/users", async (req, res) => {
  try {
    const users = await User.find({});
    //const users = await User.find({ _id: "6422a81d79fa9487d3f25c07" });
    res.status(200).send(users);
  } catch (error) {
    res.status(400).send(error);
  }
  const users = await User.find({});
});

//get user of id
router.get("/users/:id", async (req, res) => {
  const _id = req.params.id;

  try {
    const user = await User.findById(_id);

    if (!user) {
      return res.status(404).send();
    }

    res.status(200).send(user);
  } catch (error) {
    res.status(400).send(error);
  }
});

//update user
router.patch("/users/:id", async(req,res)=>{
    try{
        const updatedUser = await User.findByIdAndUpdate(req.params.id,req.body,{
            new:true
        });
        if (!updatedUser) {
            return res.status(404).send();
          }
      
          res.status(200).send(updatedUser);

    }catch (error) {
        res.status(400).send(error);
      }
});

//delete user
router.delete("/users/:id",async (req,res)=>{
    try{
        const deletedUser = await User.findByIdAndDelete(req.params.id)
        if (!deletedUser) {
            return res.status(404).send();
          }
      
          res.status(200).send(deletedUser);

    }catch (error) {
        res.status(400).send(error);
      }
})



module.exports = router;
