const express = require("express");
const UserModel = require("../models/UserModel");

//create a router and an instance of our videogamemodel
const router = express.Router();

//get route for signup page
router.get("/signup", async(req, res)=>{
    res.render("template", {
        locals: {
            title: "Sign Up"
            //gameData: gameData
        },
        partials: {
            body: "partials/signup"
        }
    })
})

//get route for login page
router.get("/login", async(req, res)=>{
    res.render("template", {
        locals: {
            title: "Log In"
            //gameData: gameData
        },
        partials: {
            body: "partials/login"
        }
    })
})

//post route for signup form
router.post("/signup", async (req,res)=>{
    const {first_name, last_name, email, password, password_confirm} = req.body;
    console.log(first_name, last_name, email, password, password_confirm);

    if(password === password_confirm)
    {
        const newUser = new UserModel(null, first_name, last_name, email, password);
        const response = await newUser.addUser();
        console.log("POST ROUTE RESPONSE: ", response);
        res.redirect("/");
    }
    else
    {
        console.log("Your password and password confirmation fields do not match!");
        return;
    }
})

//post route for login form
router.post("/login", async (req,res)=>{
    const {email, password} = req.body;
    console.log(email, password);
    //do login stuff that we haven't learned yet
    res.redirect("/");
})

//get route for error page
router.get("/error", async (req, res) => {
    const {error} = req.query;
    let errorMessage = error;
    if(!error)
    {
        errorMessage = "No Error Message Defined";
    }
    res.render("template", {
        locals: {
            error: error,
        },
        partials: {
            body: "partials/error"
        }
    })
})


//export the router for use in the app
module.exports = router;