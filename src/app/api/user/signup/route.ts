import ConnectDB from "@/dbConfig/dbConfig";
import { sendEmail } from "@/helpers/Mailer";
import User from "@/models/userModel";
import bcryptjs from "bcryptjs"
import {NextResponse,NextRequest} from "next/server"
ConnectDB()
export async function POST(request:NextRequest){
    try {
        const reqBody=await request.json()
        const {username,email,password}=reqBody
        if(!username || !email || !password){
            return NextResponse.json({error:'please provide all fields'},{status:401})
        }
        // check user exist or not
        const user=await User.findOne({email})
        if(user){
            return NextResponse.json({error:'User Already Exists'},{status:401})
        }
        // hashed password
        const salt=await bcryptjs.genSalt(10)
        const hashPwd=await bcryptjs.hash(password,salt)
        // create user
        const newUser=await User.create({username,email,password:hashPwd})
        // save user
        const savedUser=await newUser.save()
        // send verification email
        await sendEmail({email,emailType:"VERIFY",userId:savedUser._id})
        // send response
        return NextResponse.json({
            message:"User Registered Successfully",
            success:true,
            savedUser
        })

    } catch (error:any) {
        return NextResponse.json({error:error.message},{status:500})
    }
}