import mongoose, {
  Document,
  Model,
  Schema,
} from "mongoose";

export interface Transaction extends Document {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  sold: boolean;
  dateOfSale: Date;
  _id: string;
}

// export type FlatUser = FlattenMaps<Transaction> &
//   Required<{
//     _id: string;
//   }>;

const transactionSchema = new Schema<Transaction>({
  id: {
    type: Number,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  sold: {
    type: Boolean,
    required: true,
  },
  dateOfSale: {
    type: Date,
    required: true,
  },
});

const TransactionModel = (mongoose.models.Transaction ||
  mongoose.model("Transaction", transactionSchema)) as Model<Transaction>;
export default TransactionModel;
