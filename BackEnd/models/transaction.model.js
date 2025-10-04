import { model } from 'mongoose'
import { transactionSchema } from "../Schemas/transaction.schema.js";

const Transaction = model("Transaction", transactionSchema);


export default Transaction;