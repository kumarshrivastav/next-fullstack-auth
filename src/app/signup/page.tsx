"use client";
import React, { useState, useEffect } from "react";
import axios from "axios"
import toast from "react-hot-toast"
import Link from "next/link";
import { useRouter } from "next/navigation";
export default function SignUpPage() {
  const router=useRouter()
  const [disabled, setDisabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({
    username:"",
    email: "",
    password:"",
  });
  useEffect(()=>{
    if(user.email.length>4 && user.password.length>4 && user.username.length>4){
      setDisabled(false)
    }else{
      setDisabled(true)
    }
  },[user])
  const onSignUp=async()=>{
    if(!user.username || !user.email || !user.password){
      return toast.error('please provide all fields')
    }
    try {
      setLoading(true)
      const {data} =await axios.post("/api/user/signup",user)
      toast.success(data.message)
      console.log(data)
      return router.push("/login")
    } catch (error:any) {
      toast.error(error?.response?.data?.error)
      console.log(error)
    }finally{
      setLoading(false)
    }
  }
  return (
    <div  className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>{loading ? "Processing":"SignUp Page"}</h1>
      <label htmlFor="username">Username:</label><br/>
      <input
      className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
        type="text"
        id="username"
        name="username"
        value={user.username}
        onChange={(e) => setUser({ ...user, username: e.target.value })}
      /><br/>
      <label htmlFor="email">Email:</label><br/>
      <input
      className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
        type="email"
        id="email"
        name="email"
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
      /><br/>
      <label htmlFor="password">Password:</label><br/>
      <input
      className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
        type="password"
        id="password"
        name="password"
        value={user.password}
        onChange={(e) => setUser({ ...user, password:e.target.value })}
      /><br/>
      <button className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600" onClick={onSignUp}>{disabled ? "No SignUp":"SignUp Here"}</button><br/>
      <p>Already User ? <Link href="/login">Login Here</Link></p>
    </div>
  );
}
