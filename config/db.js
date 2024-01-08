const mongoose = require('mongoose');

const connectDB = async () => {
    // try {
    //     const conn = await mongoose.connect(process.env.MONGO_URL);
    //     console.log(`Connected To MongoDB Database ${conn.connection.host}`);
    // } catch (error) {
    //     console.error(`Error in MongoDB: ${error}`);
    // }
    mongoose
    .connect("mongodb://127.0.0.1:27017/ecommerce-app", { useNewUrlParser: true });
  mongoose.connection.once("open", () => {
    console.log("Database is connected");
  });
};

module.exports = connectDB;
