"use client";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
export default function VerifyEmailPage() {
  const [token, setToken] = useState("");
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);
  const verifyUserEmail = async () => {
    try {
      await axios.post("/api/user/verifyemail", { token });
      setVerified(true);
    } catch (error: any) {
      setError(true);
      toast.error(error.response.data.error);
      console.log(error.response.data.error);
    }
  };

  useEffect(() => {
    const searchUrl = window.location.search.split("=")[1];
    setToken(searchUrl || "");
  }, []);
  useEffect(() => {
    if (token.length > 0) {
      verifyUserEmail();
    }
    // eslint-disable-next-line
  }, [token]);

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <h1 className="text-4xl">Verified Email</h1>
        <h2 className="bg-orange-500 text-black p-2">
          {token ? token : "No Token"}
        </h2>
      </div>
      {verified && (
        <div>
          <h2 className="text-2xl">Email Verified</h2>
          <Link className="text-blue-500" href="/login">
            Login
          </Link>
        </div>
      )}
      {error && (
        <div>
          <h2 className="text-2xl bg-red-500 text-black">Email Verified</h2>
        </div>
      )}
    </>
  );
}
