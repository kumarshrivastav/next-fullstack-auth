"use client";
// import { sendEmail } from "@/helpers/Mailer";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function ProfilePage() {
  const router = useRouter();
//   var userRes:any;
    const [user,setUser]=useState({
        id:"",username:"",email:""
    })
    async function initialTime() {
        try {
            const {data} =await axios.get("/api/user/me")
            console.log(data)
            setUser({id:data?.data?._id,username:data?.data?.username,email:data?.data?.email})
        } catch (error:any) {
            toast.error(error.message)
            console.log(error.message)
        }
    }
    async function resetPassword() {
    try {
      const {data}=await axios.get('/api/user/resetpassword')
      // const resetPwdRes=await sendEmail({email:user?.email,emailType:"RESET",userId:user?.id})
      toast.success('password reset link has been sent your email')
      console.log(data)
    } catch (error:any) {
      toast.error(error.message)
      console.log(error)
    }
    }
    const logout = async () => {
    try {
      const { data } = await axios.get("/api/user/logout");
      toast.success(data.message);
      return router.push("/login");
    } catch (error: any) {
      toast.error(error?.response?.data?.error);
    }
  };
  useEffect(()=>{
    initialTime()
  },[])
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h2>Profile Page</h2>
      <h4>{user ? user.username :"No User"}</h4>
      <button
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
        onClick={logout}
      >
        Logout
      </button>
      <br />
      <button
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
      >
        <Link href={`/profile/${user?.id}`}>Check your profile</Link>
      </button>

      <br />
      <button
        className="p-2 border border-gray-300 bg-green-500 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
        onClick={resetPassword}
      >
        RESET PASSWORD
      </button>
    </div>
  );
}
