import RefreshModelOperation from "@/DbOperation/RefreshModelOperation";
import Token from "@/app/token/Token";
import ConnectDB from "@/dbConfig/dbConfig";
import RefreshModel from "@/models/refreshModel";
import User from "@/models/userModel";
import bcryptjs from "bcryptjs"
import {NextResponse,NextRequest} from "next/server"
ConnectDB()
export async function POST(request:NextRequest){
    try {
        const reqBody=await request.json()
        const {email,password}=reqBody
        if(!email || !password){
            return NextResponse.json({error:'please provide all fields'},{status:401})
        }
        // check user exist or not
        const user=await User.findOne({email})
        if(!user){
            return NextResponse.json({error:'User Not Exists'},{status:401})
        }
        // compare password
        const isValidPwd=await bcryptjs.compare(password,user.password)
        if(!isValidPwd){
            return NextResponse.json({error:"Invalid Password"},{status:401})
        }
        // generate token
        const payload={
            id:user._id,
            username:user.username,
            email:user.email
        }
        const {accessToken,refreshToken} =await Token.generateToken(payload)
        await RefreshModelOperation.storeRefeshTokenToDb(refreshToken,user._id)
        const response=NextResponse.json({
            message:"User Login Successfully",
            success:true
        })
        // set cookies to client browser
        response.cookies.set('accessToken',accessToken,{httpOnly:true,maxAge:1000*60*60})
        response.cookies.set('refreshToken',refreshToken,{httpOnly:true,maxAge:1000*60*60*24*365})
        // navigate to profile
        return response
    } catch (error:any) {
        return NextResponse.json({error:error.message},{status:500})
    }
}