const mongoose = require("mongoose");
require('dotenv').config({path:"config.env"})
const connectDB = async () => {
  await mongoose.connect(process.env.MONGO_URI='mongodb+srv://icon6038:Pa60aC1Tqv6qx0lA@cluster0.e2coqbw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
            useUnifiedTopology:true,
            useNewUrlParser: true,
            // useCreateIndex: true
  });

  console.log("MongoDB Connected");
};

module.exports = connectDB;