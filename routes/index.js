const express = require("express");

//create a router and an instance of our videogamemodel
const router = express.Router();
//create route for home page
router.get("/", async (req, res)=>{
    res.render("template", {
        locals: {
            title: "Video Game Review Blog",
        },
        partials: {
            body: "partials/home"
        }
    })
})

//export the router for use in the app
module.exports = router;