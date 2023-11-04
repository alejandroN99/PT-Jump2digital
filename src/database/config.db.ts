import mongoose from "mongoose";

export const connectDb = async () => {
  try {
    const connectionURI = process.env.MONGO_DB_CNN;

    if (!connectionURI) {
      throw new Error("The environment variable MONGO_DB_CNN is not defined.");
    }

    await mongoose.connect(connectionURI);

    console.log("Database online!");
  } catch (error) {
    console.log(error);
    throw new Error("Error starting the database");
  }
};
