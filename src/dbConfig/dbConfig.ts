import mongoose from "mongoose";
export default async function ConnectDB() {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_CONNECTION_STRING_URL!);
    console.log(`MongoDB Connected at ${conn.connection.host}`);
  } catch (error: any) {
    console.log(`DB Error: ${error.message}`);
  }
}
