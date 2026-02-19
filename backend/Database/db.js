import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();

const URI = process.env.MONGO_URI;

const connectDb = async () => {
    try {
        await mongoose.connect(URI);
        console.log("Connection Successful to DB");
    } catch (error) {
        console.log("Db Conection failed");    
        console.error(error.message);
        process.exit(1);
    }
}

export default connectDb;