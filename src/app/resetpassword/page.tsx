"use client";
import axios from "axios";
// import User from "@/models/userModel";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
// eslint-disable-next-line
export default function ResetPassword(){
  const router=useRouter()
    const [password,setPassword]=useState({
        firstPwd:"",
        secondPwd:""
    })
    async function onReset() {
        try {
          const {data}=await axios.post("/api/user/resetpassword",password)
          toast.success(data.message)
          console.log(data)
          return router.push("http://localhost:3000/login")
        } catch (error:any) {
          toast.error(error.response.data.error)
          return console.log(error)
        }
    }
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <h1>Reset Your Password Here</h1>
        <label htmlFor="password">Password:</label>
        <br />
      <input
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
        type="password"
        id="password"
        name="firstPwd"
        value={password.firstPwd}
        onChange={(e) => setPassword({ ...password, firstPwd: e.target.value })}
      />
      <br />
      <label htmlFor="password">Confirm Password:</label>
        <br />
      <input
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
        type="password"
        id="password"
        name="secondPwd"
        value={password.secondPwd}
        onChange={(e) => setPassword({...password , secondPwd: e.target.value })}
      />
      <br />
      <button
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
        onClick={onReset}
      >
        {/* {disabled ? "No Login" : "Login Here"} */}Reset
      </button>
        </div>
    )
}

// http://localhost:3000/resetpassword?token=$2a$10$EQLCnsHh0RvVw6jveOdVDulFMGmBZExLk.ilJin9Qrxa/oOyW9Rfi&id=652ff04e589484b4fbbe8254

