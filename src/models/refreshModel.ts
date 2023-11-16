import mongoose from "mongoose";
let refreshSchema = new mongoose.Schema({
  refreshToken: { type: String, required: true },
  userId: { type: String, required: true },
},{timestamps:true});

const RefreshModel=mongoose.models.refreshes || mongoose.model("refreshes",refreshSchema)
export default RefreshModel
