// import jwt  from 'jsonwebtoken';
import {NextRequest,NextResponse} from "next/server"
// import Token from "./app/token/Token"
import getUserDetailsFromToken from './helpers/getUserDetailsFromToken';

export async function middleware(request:NextRequest){
    const path=request?.nextUrl?.pathname
    const isPublicRoute=path==="/login" || path==="/signup"
    const accessToken:any=request.cookies.get('accessToken') || ''
    if(isPublicRoute && accessToken){
        return NextResponse.redirect(new URL("/profile",request.nextUrl))
    }
   
    if(!isPublicRoute && !accessToken){
        return NextResponse.redirect(new URL("/login",request.nextUrl))
    }
}

export const config={
    matcher:[
        "/","/login","/signup","/profile","/verifyemail","/resetpassword"
    ]
}