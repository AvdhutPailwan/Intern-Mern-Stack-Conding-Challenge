
import mongoose from "mongoose";
import TransactionModel from '@/models/transaction.model';

type ConnectionObject = {
  isConnected?: number;
};

const connection: ConnectionObject = {};

const mongoURI = process.env.MONGODB_URI as string;

async function dbConnect(): Promise<void> {
  if (connection.isConnected) {
    // console.log("Already Connected to database.");
    return;
  }

  try {
    const db = await mongoose.connect(mongoURI, {});
    connection.isConnected = db.connections[0].readyState;
    const transactionDataResponse = await fetch("https://s3.amazonaws.com/roxiler.com/product_transaction.json");

    const transactionData = await transactionDataResponse.json();

    await TransactionModel.deleteMany({});
    await TransactionModel.insertMany(transactionData);
    console.log("Databse connected successfully.");
  } catch (error) {
    console.error("Database connection failed!", error);
    process.exit(1);
  }
}

export default dbConnect;
