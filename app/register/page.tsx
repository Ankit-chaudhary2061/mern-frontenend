"use client"

import BorderAnimation from "@/src/components/bodyanimatior"
import { useAppDispatch, useAppSelector } from "@/src/lib/store/hook"
import { MessageCircleIcon } from "lucide-react"
import { useState } from "react"
import { RegisterData } from "./register-types"
import { registerUser } from "@/src/lib/store/auth/auth-slice"
import { Status } from "@/src/lib/store/types/global-types"
import Link from "next/link"


const Register = ()=>{

   const dispatch = useAppDispatch()
   const { registerStatus } = useAppSelector((state) => state.auth)
   const [data, setData] = useState<RegisterData>({
     username: "",
     email: "",
     password: ""
   })
   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value }= e.target
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));

    


   }
   const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      dispatch(registerUser(data));
    };
    return (
        <>
        <div className="w-full min-h-screen flex items-center justify-center p-4 bg-amber-50">
      <div className="relative w-full max-w-5xl">

        <BorderAnimation>
          <div className="flex flex-col md:flex-row w-full bg">

            {/* LEFT SIDE - FORM */}
            <div className="md:w-1/2 p-8 flex items-center justify-center md:border-r border-slate-700">
              <div className="w-full max-w-md">

                {/* Heading */}
                <div className="text-center mb-8">
                  <MessageCircleIcon className="w-12 h-12 mx-auto text-slate-400 mb-4" />
                  <h2 className="text-2xl font-bold text-slate-200">
                    Create an Account
                  </h2>
                  <p className="text-slate-400">
                    Join our community today!
                  </p>
                </div>

                {/* Form */}
                <form  onSubmit={handleSubmit}  className="space-y-6">

                  <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    value={data.username}
                    onChange={handleChange}
                    className="w-full p-3 rounded-lg bg-slate-800 text-white border border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />

                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={data.email}
                    onChange={handleChange}
                    className="w-full p-3 rounded-lg bg-slate-800 text-white border border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />

                  <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={data.password}
                    onChange={handleChange}
                    className="w-full p-3 rounded-lg bg-slate-800 text-white border border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />

                  <button
  type="submit"
  disabled={registerStatus === Status.LOADING}
  className="w-full p-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold transition"
>
  {registerStatus === Status.LOADING ? "Registering..." : "Register"}
</button>

                </form>
               {/* Link to Login */}
                <p className="text-center text-sm text-slate-300 mt-6">
                  Already have an account?{" "}
                  <Link href="/login" className="text-blue-400 hover:underline font-medium">
                    Log in here
                  </Link>
                </p>
              </div>
            </div>

            {/* RIGHT SIDE */}
            <div className="md:w-1/2 hidden md:flex items-center justify-center p-8">
              <div className="text-center text-slate-300">
                <h3 className="text-3xl font-bold mb-4">
                  Welcome to friends book (text- chat cat)
                </h3>
                <p className="text-slate-400">
                  lets chat motherfucker yeta chai image rakhney ho
                </p>
              </div>
            </div>

          </div>
        </BorderAnimation>

      </div>
    </div>
        
        </>
    )
}

export default Register