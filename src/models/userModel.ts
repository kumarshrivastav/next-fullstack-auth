import mongoose from "mongoose";

let userSchema=new mongoose.Schema({
    username:{type:String,required:[true,'please enter a username']},
    email:{type:String,unique:true,required:[true,'please enter a email']},
    password:{type:String,required:[true,'please enter a password']},
    isVerified:{type:String,default:false},
    isAdmin:{type:String,default:false},
    forgotPasswordToken:{type:String},
    forgotPasswordTokneExpiry:{type:Date},
    verifyToken:{type:String},
    verifyTokenExpiry:{type:Date}
})

const User=mongoose.models.users || mongoose.model("users",userSchema)
export default User;