const mongoose = require("mongoose")


const mongodbURL = "mongodb+srv://sanduniimanjula:sa12345678@cluster0.fz2mkdi.mongodb.net/fruitstore?retryWrites=true&w=majority"
mongoose.connect(mongodbURL,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
});

const connection = mongoose.connection

connection.once("open",()=>{
    console.log("Mongodb Connected!")
})

