import { NextRequest } from 'next/server';
// import jwt  from "jsonwebtoken";
import * as jose from 'jose'
export default async function getUserDetailsFromToken(request:NextRequest){
    try {
        const accessTokenSecret = new TextEncoder().encode(
            process.env.ACCESS_TOKEN_SECRET_KEY
          );
        const accessToken:any=request.cookies.get('accessToken')?.value || ''
        if(accessToken){
            // const payload:any=jwt.verify(accessToken,process.env.ACCESS_TOKEN_SECRET_KEY!)
            const {payload} =await jose.jwtVerify(accessToken,accessTokenSecret)
            // console.log(payload)
            return payload
        }
    } catch (error:any) {
        throw new Error(error.message)
    }
}