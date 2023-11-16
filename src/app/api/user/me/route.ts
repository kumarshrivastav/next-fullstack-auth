import { NextRequest, NextResponse } from 'next/server';
import ConnectDB from "@/dbConfig/dbConfig"
import getUserDetailsFromToken from '@/helpers/getUserDetailsFromToken';
import User from '@/models/userModel';
ConnectDB()
export async function GET(request:NextRequest){
try {
    const payload=await getUserDetailsFromToken(request)
    
    const user=await User.findById(payload?.id).select("-password")
    // console.log("user",user)
    return NextResponse.json({
        data:user
    })
} catch (error:any) {
    return NextResponse.json({
        error:error.message,
        success:false
    })
}
}