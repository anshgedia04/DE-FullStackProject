const mongoose = require("mongoose");
require("dotenv").config();

const Db_Connect = () => {
    mongoose.connect(process.env.MONGO_URL)
                    .then(() => console.log("mongoDB conneced "))
                    .catch((err) => console.log("error in DB connect : ",err ) )
}

module.exports = Db_Connect ;