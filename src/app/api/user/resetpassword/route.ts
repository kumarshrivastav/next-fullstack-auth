import bcryptjs  from 'bcryptjs';
import ConnectDB from "@/dbConfig/dbConfig"
import { sendEmail } from "@/helpers/Mailer"
import getUserDetailsFromToken from "@/helpers/getUserDetailsFromToken"
import User from "@/models/userModel"

import {NextResponse,NextRequest} from "next/server"
ConnectDB()
export async function GET(request:NextRequest){
try {
        // const payload=await getUserDetailsFromToken(request)
        // console.log("USERID:",payload?.id,"EMAIL:",payload?.email)
        // const resetRes=sendEmail({email:payload?.email,emailType:"RESET",userId:payload?.id})    
        const {userId}:any=request.body
        console.log('userId:',userId)
        return NextResponse.json({message:"Password Reset Link has been sent to your mail",success:true},{status:200})
    
    
} catch (error:any) {
    return NextResponse.json({error:error.message},{status:500})
}
}

// const searchUrl = window.location.search.split("=")[1];