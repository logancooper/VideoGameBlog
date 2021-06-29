const db = require("./conn");

class VideoGameModel {
    constructor(id, name, slug, description, background, metacritic) {
        this.id = id;
        this.name = name;
        this.slug = slug;
        this.description = description;
        this.background = background;
        this.metacritic = metacritic;
    }

    static async getAllGameData()
    {
        try {
            const response = await db.any(
                //wait for db query
                `SELECT * FROM videogames`
            )
            //console.log("SQL RESPONSE IS: ", response);
            return response;
        }
        catch(error)
        {
            console.error("ERROR: ", error);
            return error;
        }
    }

    static async getBySlug(slug)
    {
        try {
            const response = await db.any(
                //wait for db query
                `SELECT * FROM videogames WHERE slug = '${slug}'`
            )
            //console.log("SQL RESPONSE IS: ", response);
            return response;
        }
        catch(error)
        {
            console.error("ERROR: ", error);
            return error;
        }
    }

    static async getReviewData(slug)
    {
        try {
            const response = await db.any(
                //wait for db query
                //Get the reviews that have a gameID matching the gameID of the video game with the provided slug
                `SELECT * 
                FROM reviews 
                INNER JOIN videogames 
                ON videogames.slug = '${slug}' 
                AND videogames.id = reviews.gameID
                INNER JOIN users
                ON users.id = reviews.userID;`
            )
            console.log("SQL RESPONSE IS: ", response);
            return response;
        }
        catch(error)
        {
            console.error("ERROR: ", error);
            return error;
        }
    }

    async addEntry()
    {
        console.log(this.name, this.slug, this.description);
        try {
            const response = await db.result(
                `INSERT INTO videogames 
                (name, slug, description, backgroundimage, metacritic)
                VALUES
                ('${this.name}', '${this.slug}', '${this.description}', '${this.background}', '${this.metacritic}');`
            );
        }
        catch (error){
            console.error("ERROR: ", error);
            return error;
        }
    }
}

module.exports = VideoGameModel;