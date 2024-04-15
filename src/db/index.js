import mongoose from "mongoose"; // Importing the mongoose library for MongoDB interaction
import { DB_Name } from "../constants.js"; // Importing the DB_Name constant from the "../constants" file

const connectDB = async () => { // Defining an asynchronous function named "connectDB"
  try {
    const connectionInstance = await mongoose.connect( // Establishing a connection to the MongoDB database
      `${process.env.MONGO_URI} / ${DB_Name}` // Using the MONGO_URI environment variable and the DB_Name constant to form the connection string
    );
    console.log(`MongoDB Connected !! DB Host : ${connectionInstance.connection.host}`); // Logging a success message with the host of the connected database
  } catch (error) {
    console.log("Connection FAILED", error); // Logging an error message if the connection fails
    process.exit(1); // Exiting the process with a non-zero exit code to indicate an error
  }
};

export default connectDB; // Exporting the connectDB function as the default export