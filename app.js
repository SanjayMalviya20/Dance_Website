const express = require("express")
const app = express();
const path = require("path")
const port = 3000;
const mongoose = require("mongoose");
const bodyparser =require("body-parser");
const bodyParser = require("body-parser");

mongoose.connect('mongodb://localhost/DanceWebData');
let samschema = new mongoose.Schema({
    name: String,
    phone: Number,
    gender: String,
    email: String,
    address: String
})
let sammodel = mongoose.model("Details", samschema)
// static files show
app.use("/static", express.static("static"))

app.use(express.urlencoded(bodyParser))
// pug  stuff
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "view"))

app.get("/", (req, res) => {
    // console.log( req.params.query) 
    // render a varbiable 
    res.status(200).render("home.pug")
    
})

app.get("/contact", (req, res) => {
    
    // render a varbiable 
    res.render("contact.pug")
    
})

app.post("/contacT", (req, res) => {
    
    let data = new sammodel(req.body)
    data.save().then(() => {

        res.send("data save in database")
        // console.log("value save")
    })
    .catch(() => {
        res.send("data does not save")
        // console.log("value not save")
    })
    
    // phele say he status set he ye error he \/           
    // res.status(200).render("contact.pug") \/
})

app.listen((port), () => {
    console.log("run successfully")
})
