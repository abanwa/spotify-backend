import mongoose from "mongoose";

const connectDB = async () => {
  try {
    // the /spotify is our project name in the mongobd databse. we are using mongoose drive to connect our databse and not nodejs
    await mongoose.connect(`${process.env.MONGOBD_URI}/spotify`);
    const connection = mongoose.connection;

    connection.on("connected", () => {
      console.log("connection established");
    });

    connection.on("error", (error) => {
      console.log(`Something went wrong with MongoDB connection ${error}`);
    });
  } catch (err) {
    console.log(`Something is wrong ${err.message}`);
    process.exit(1);
  }
};

export default connectDB;
