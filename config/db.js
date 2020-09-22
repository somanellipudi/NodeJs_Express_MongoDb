const dotenv = require('dotenv')
dotenv.config();
console.log("Message : mongo db url = ", process.env.MONGO_DB_URL);
module.exports = process.env.MONGO_DB_URL;
