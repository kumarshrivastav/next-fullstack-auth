import bcryptjs  from 'bcryptjs';
import ConnectDB from "@/dbConfig/dbConfig"
import { sendEmail } from "@/helpers/Mailer"
import getUserDetailsFromToken from "@/helpers/getUserDetailsFromToken"
import User from "@/models/userModel"

import {NextResponse,NextRequest} from "next/server"
ConnectDB()
export async function GET(request:NextRequest){
try { 
        return NextResponse.json({message:"Password Reset Link has been sent to your mail",success:true},{status:200})
    
    
} catch (error:any) {
    return NextResponse.json({error:error.message},{status:500})
}
}