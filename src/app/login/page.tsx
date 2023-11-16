"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
export default function LoginPage() {
  const [disabled, setDisabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  useEffect(()=>{
    if(user.email.length>4 && user.password.length>4){
      setDisabled(false)
    }else{
      setDisabled(true)
    }
  },[user])
  const onLogin = async () => {
    if (!user.email || !user.password) {
      return toast.error("please provide all fields");
    }
    try {
      setLoading(true)
      const { data } = await axios.post("/api/user/login", user);
      console.log(data);
      toast.success(data.message);
      router.push("/profile");
    } catch (error: any) {
      toast.error(error.response.data.error);
      console.log(error);
    }finally{
      setLoading(false)
    }
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>{loading ? "Processing":"LoginPage"}</h1>
      <label htmlFor="username">username:</label>
      <br />
      <input
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
        type="text"
        id="username"
        name="username"
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
      />
      <br />
      <label htmlFor="password">Password:</label>
      <br />
      <input
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
        type="password"
        id="password"
        name="password"
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
      />
      <br />
      <button
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
        onClick={onLogin}
      >
        {disabled ? "No Login" : "Login Here"}
      </button>
      <br />
      <p>
        Not Registered Yet? <Link href="/signup">SignUp Here</Link>
      </p>
    </div>
  );
}
