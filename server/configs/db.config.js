const mongoose = require('mongoose');
const { dbUser, dbPassword, dbEndpoint, dbName} = require('./app.config');

const mongoDB = async () => {
    try{
        const db = await mongoose.connect(`mongodb+srv://${dbUser}:${dbPassword}@${dbEndpoint}/${dbName}?retryWrites=true&w=majority`);
        console.log("MoggoDB connected");
        return db;
    }catch (error) {
        console.log(error);
    }
}
module.exports = mongoDB();