import getUserDetailsFromToken from '@/helpers/getUserDetailsFromToken';
import RefreshModel from '@/models/refreshModel';
import { NextRequest,NextResponse } from 'next/server';
export async function GET(request:NextRequest){
    try {

        const response=NextResponse.json({
            message:"User Logout Successfully",
            success:true
        })
        const payload=await getUserDetailsFromToken(request)
        await RefreshModel.findByIdAndDelete(payload?.id)
        response.cookies.delete('accessToken')
        response.cookies.delete('refreshToken')
        return response
    } catch (error:any) {
        return NextResponse.json({
            error:error.message,
            success:false
        })
    }
}