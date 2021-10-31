require('dotenv').config();

module.exports = {
    port: process.env.PORT || 5000,
    apiVersion: process.env.API_VERSION || 1,
    dbUser: process.env.DB_USER,
    dbPassword: process.env.DB_PASSWORD,
    dbEndpoint: process.env.DB_ENDPOINT,
    dbName: process.env.DB_NAME,
    accessToken: process.env.ACCESS_TOKEN_SECRET,
    tokenExpDays: process.env.TOKEN_EXP_DAYS
}