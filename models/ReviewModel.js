const db = require("./conn");

class ReviewModel {
    constructor(id, userID, gameID, content) {
        this.id = id;
        this.userID = userID;
        this.gameID = gameID;
        this.content = content;
    }

    async addReview()
    {
        console.log(this.userID, this.gameID, this.content);
        try {
            const response = await db.result(
                `INSERT INTO reviews 
                (userID, gameID, content)
                VALUES
                ('${this.userID}', '${this.gameID}', '${this.content}');`
            );
        }
        catch (error){
            console.error("ERROR: ", error);
            return error;
        }
    }
}

module.exports = ReviewModel;