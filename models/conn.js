require("dotenv").config();

//Get connection variables from .env
const host = process.env.DB_HOST;
const database = process.env.DB_NAME;
const user = process.env.DB_USER;
const password = process.env.DB_PASSWORD;

//??? something with pg-promise
const pgp = require("pg-promise")({
    query: function(event) {
        //console.log("QUERY: ", event.query);
    }
})

//set up the options object with our variables
const options = {
    host,
    database,
    user,
    password
}

//connect to the DB?? with our options
const db = pgp(options);

//export the db for use in our models
module.exports = db;