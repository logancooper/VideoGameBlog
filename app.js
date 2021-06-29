"use strict"

//set up http module
const http = require("http");
const hostname = "127.0.0.1";
const port = "3000";

//set up express app
const express = require("express");
const app = express();

//????
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(express.static("public"));

//ser up es6Renderer
const es6Renderer = require("express-es6-template-engine");
app.engine("html", es6Renderer);
app.set("views", "./views");
app.set("view engine", "html");

//create server using express app
const server = http.createServer(app);

//tell server to listen
server.listen(port, hostname, ()=> {
    console.log(`Server is running at http://${hostname}:${port}`);
})

//import routers
const rootController = require("./routes/index");
const userController = require("./routes/users");
const gamesController = require("./routes/games");

//tell the app to use those routers for a given path
app.use("/", rootController);
app.use("/users", userController);
app.use("/games", gamesController);
