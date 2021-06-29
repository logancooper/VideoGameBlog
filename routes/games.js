const express = require("express");
const fetch = require("node-fetch");
const { default: slugify } = require("slugify");
const VideoGameModel = require("../models/VideoGameModel");
const ReviewModel = require("../models/ReviewModel");
//create a router and an instance of our videogamemodel
const router = express.Router();

let currentGameSlug = null;

//create get route to get all of the game data or a specific game's data on the games route
router.get("/:slug?", async (req, res)=>{

    if(!!req.params.slug)
    {
        const slug = req.params.slug;
        //console.log(slug);
        const gameData = await VideoGameModel.getBySlug(slug);
        const reviewData = await VideoGameModel.getReviewData(slug);
        //console.log(reviewData);
        res.render("template", {
            locals: {
                title: "Game Details",
                gameData: gameData,
                reviewData: reviewData
            },
            partials: {
                body: "partials/game-details"
            }
        })
        currentGameSlug = slug;
    }
    else
    {
        const gameData = await VideoGameModel.getAllGameData();
        res.render("template", {
            locals: {
                title: "Reviewed Games",
                gameData: gameData
            },
            partials: {
                body: "partials/games"
            }
        })
    }
})

//post route for search form
router.post("/search", async (req,res)=>{
    //slugify the provided name
    const {name} = req.body;
    const slug = slugify(name, {
        replacement: "-",
        lower: true,
        strict: true
    });
    fetchGame(slug);
    res.redirect("/games");
})

//post route for search form
router.post("/review", async (req,res)=>{
    //Get the review from the input
    const {review} = req.body;
    //get game ID by searching DB with current game slug, return matching ID
    const returnedGames = await VideoGameModel.getBySlug(currentGameSlug);
    const currentGame = returnedGames[0];
    const gameID = currentGame.id;

    console.log(currentGameSlug);
    console.log(currentGame);
    console.log(gameID);

    //get userID by searching user DB with current username? Fill in with default value for now.
    const userID = 1;

    //Create review model with current game ID, current user ID, and input text
    const newReview = new ReviewModel(null, userID, gameID, review);

    newReview.addReview();
})

//callback to run fetch or post results
async function importGameData(gameData)
{
    console.log(gameData);
    if(gameData.redirect == true)
    {
        fetchGame(gameData.slug);
    }
    else
    {
        if(gameData.detail !== "Not found.")
        {
            const newGame = new VideoGameModel(null, gameData.name, gameData.slug, gameData.description, gameData.background_image, gameData.metacritic_url);
            const response = await newGame.addEntry();
            console.log("POST ROUTE RESPONSE: ", response);
        }
        else
        {
            console.log("No entry found");
        }

    }
}

//fetch callback for game search
function fetchGame(slug)
{
    //fetch game details using the API key & slug
    fetch("https://api.rawg.io/api/games/" + slug + "?key=70d93bd037344b34ac25e6c2e8aedc08")
    .then(function (response){ 
        // Listen for the RESPONSE from the fetch() - Promise #1
        return response.json();
    })
    .then(function (data){
        //Listens for the DATA from response.json() - Promise #2
        importGameData(data);
        return data;
    })
    .catch(function (error) {
        // Listens for a REJECTION from the fetch() promise
        console.error ('ERROR:', error);
        return error;
    })
}

//export the router for use in the app
module.exports = router;