const db = require("./conn");

class UserModel {
    constructor(id, first_name, last_name, email, password) {
        this.id = id;
        this.first_name = first_name;
        this.last_name = last_name;
        this.email = email;
        this.password = password;
    }

    async addUser()
    {
        console.log(this.first_name, this.last_name, this.email, this.password);
        try {
            const response = await db.result(
                `INSERT INTO users 
                (first_name, last_name, email, password)
                VALUES
                ('${this.first_name}', '${this.last_name}', '${this.email}', '${this.password}');`
            );
        }
        catch (error){
            console.error("ERROR: ", error);
            return error;
        }
    }
}

module.exports = UserModel;