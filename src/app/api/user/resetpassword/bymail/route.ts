import bcryptjs  from 'bcryptjs';
import ConnectDB from "@/dbConfig/dbConfig"
import { sendEmail } from "@/helpers/Mailer"
import getUserDetailsFromToken from "@/helpers/getUserDetailsFromToken"
import User from "@/models/userModel"

import {NextResponse,NextRequest} from "next/server"
ConnectDB()
export async function POST(request:NextRequest){
try {
    const reqBody=await request.json()
    const {firstPwd,secondPwd}=reqBody
    if(firstPwd===secondPwd){
        const payload=await getUserDetailsFromToken(request)
        console.log("USERID:",payload?.id,"EMAIL:",payload?.email)
        const salt=await bcryptjs.genSalt(10)
        const hashPwd=await bcryptjs.hash(firstPwd,salt)
        const updateUserPwd=await User.findByIdAndUpdate(payload?.id,{$set:{password:hashPwd}})
        return NextResponse.json({message:"Password Reset Successfully",success:true,updateUserPwd})
    }else{
        return NextResponse.json({message:'password did not matched'},{status:401})
    }
    
} catch (error:any) {
    return NextResponse.json({error:error.message},{status:500})
}
}