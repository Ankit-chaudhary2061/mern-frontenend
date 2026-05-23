"use client";

import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "@/src/lib/store/hook";
import { Eye, EyeOff } from "lucide-react";
import { useEffect, useState } from "react";
import { Logindata } from "./login-types";
import {
  forgotPassword,
  loginUser,
} from "@/src/lib/store/auth/auth-slice";
import { Status } from "@/src/lib/store/types/global-types";
import { useRouter } from "next/navigation";

export const Login = () => {
  const dispatch = useAppDispatch();
   const router = useRouter();

  const { loginStatus, forgotPasswordStatus , user} = useAppSelector(
    (store) => store.auth
  );

  const [data, setData] = useState<Logindata>({
    email: "",
    password: "",
  });

  const [isForgotPassword, setIsForgotPassword] =
    useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    dispatch(loginUser(data));
  };

  const handleForgotPassword = () => {
    if (!data.email) {
      toast.error("Please enter your email first.");
      return;
    }

    setIsForgotPassword(true);
    dispatch(forgotPassword(data.email));
  };

useEffect(() => {
  // LOGIN SUCCESS
 if (loginStatus === Status.SUCCESS) {
    toast.success("Login successful!");

    const timer = setTimeout(() => {
      router.push("/");
    }, 500);

    return () => clearTimeout(timer);
  }

  if (loginStatus === Status.ERROR) {
    toast.error("Login failed. Check your credentials.");
  }

  // FORGOT PASSWORD SUCCESS
  if (forgotPasswordStatus === Status.SUCCESS && isForgotPassword) {
    toast.success("Reset link sent to your email!");
    setIsForgotPassword(false);
    return;
  }

  // FORGOT PASSWORD ERROR
  if (forgotPasswordStatus === Status.ERROR && isForgotPassword) {
    toast.error("Failed to send reset link.");
    setIsForgotPassword(false);
  }
}, [loginStatus, forgotPasswordStatus, user, router]);

  return (
//     <>
//       <div className="w-full min-h-screen flex items-center justify-center p-4 bg-[#ecf7ed]">
//         <div className="relative w-full max-w-5xl">
        
//             <div className="flex flex-col md:flex-row w-full bg-white rounded-[2rem] shadow-2xl overflow-hidden">

//               {/* LEFT SIDE */}
//               <div className="md:w-1/2 p-8 flex items-center justify-center md:border-r border-[#326E3B]/20 bg-[#f8fff4]">
//                 <div className="w-full max-w-md">

//                   {/* Heading */}
//                   <div className="text-center mb-8">
//                     <MessageCircleIcon className="w-12 h-12 mx-auto text-[#326E3B] mb-4" />

//                     <h2 className="text-2xl font-bold text-[#326E3B]">
//                       Login to Your Account
//                     </h2>

//                     <p className="text-[#52655a]">
//                       Enter your credentials to continue
//                     </p>
//                   </div>

//                   {/* FORM */}
//                   <form
//                     onSubmit={handleSubmit}
//                     className="space-y-6"
//                   >
//                     <input
//                       type="email"
//                       name="email"
//                       placeholder="Email"
//                       value={data.email}
//                       onChange={handleChange}
//                       className="w-full p-3 rounded-lg bg-white text-slate-900 border border-[#326E3B]/20 focus:outline-none focus:ring-2 focus:ring-[#326E3B]"
//                     />

//                     <input
//                       type="password"
//                       name="password"
//                       placeholder="Password"
//                       value={data.password}
//                       onChange={handleChange}
//                       className="w-full p-3 rounded-lg bg-white text-slate-900 border border-[#326E3B]/20 focus:outline-none focus:ring-2 focus:ring-[#326E3B]"
//                     />

//                     <button
//                       type="submit"
//                       disabled={
//                         loginStatus === Status.LOADING
//                       }
//                       className="w-full p-3 rounded-lg bg-[#326E3B] hover:bg-[#25522d] text-white font-semibold transition"
//                     >
//                       {loginStatus === Status.LOADING
//                         ? "Logging in..."
//                         : "Login"}
//                     </button>
//                   </form>

//                   {/* FORGOT PASSWORD */}
// <div className="text-right mt-3">
//   <button
//     type="button"
//     onClick={handleForgotPassword}
//     className="text-[#326E3B] hover:text-[#25522d] hover:underline text-sm font-medium transition-colors"
//   >
//     Forgot password?
//   </button>
// </div>

// {/* CREATE ACCOUNT */}
// <div className="mt-6 text-center border-t border-[#326E3B]/20 pt-6">
//   <p className="text-[#52655a] text-sm">
//     Don&apos;t have an account?
//   </p>

//   <button
//     type="button"
//     onClick={() => router.push("/register")}
//     className="mt-3 w-full p-3 rounded-lg border border-[#326E3B] text-[#326E3B] font-semibold hover:bg-[#326E3B] hover:text-white transition"
//   >
//     Create New Account
//   </button>
// </div>

//                 </div>
//               </div>

//               {/* RIGHT SIDE */}
//               <div className="md:w-1/2 hidden md:flex items-center justify-center p-8 bg-[#326E3B]">
//                 <div className="text-center text-white">
//                   <h3 className="text-3xl font-bold mb-4">
//                     Welcome Back!
//                   </h3>

//                   <p className="text-[#d7e8d8]">
//                     Connect with your friends and start chatting instantly.
//                   </p>
//                 </div>
//               </div>

//             </div>
      
//         </div>
//       </div>
//     </>
<div className="w-full min-h-screen flex items-center justify-center bg-[#ecf7ed]">
  
  <div className="container mx-auto px-[200px]">
    
    <div className="flex flex-col md:flex-row w-full bg-white rounded-[2rem] shadow-2xl overflow-hidden">

      {/* LEFT SIDE */}
      <div className="md:w-1/2 p-10 flex items-center justify-center md:border-r border-[#326E3B]/20 bg-[#f8fff4]">
        
        <div className="w-full max-w-md">

          {/* Heading */}
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-[#326E3B]">
              Login to Your Account
            </h2>

            <p className="text-[#52655a]">
              Enter your credentials to continue
            </p>
          </div>

          {/* FORM */}
          <form onSubmit={handleSubmit} className="space-y-6">

            <input
              type="email"
              name="email"
              placeholder="Email"
              value={data.email}
              onChange={handleChange}
              className="w-full p-3 rounded-lg bg-white text-slate-900 border border-[#326E3B]/20 focus:outline-none focus:ring-2 focus:ring-[#326E3B]"
            />

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={data.password}
                onChange={handleChange}
                className="w-full p-3 rounded-lg bg-white text-slate-900 border border-[#326E3B]/20 focus:outline-none focus:ring-2 focus:ring-[#326E3B]"
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute inset-y-0 right-3 flex items-center text-[#326E3B]"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
              </button>
            </div>

            <button
              type="submit"
              disabled={loginStatus === Status.LOADING}
              className="w-full p-3 rounded-lg bg-[#326E3B] hover:bg-[#25522d] text-white font-semibold transition"
            >
              {loginStatus === Status.LOADING
                ? "Logging in..."
                : "Login"}
            </button>
          </form>

          {/* FORGOT PASSWORD */}
          <div className="text-right mt-3">
            <button
              type="button"
              onClick={handleForgotPassword}
              className="text-[#326E3B] hover:underline text-sm font-medium"
            >
              Forgot password?
            </button>
          </div>

          {/* CREATE ACCOUNT */}
          <div className="mt-6 text-center border-t border-[#326E3B]/20 pt-6">
            <p className="text-[#52655a] text-sm">
              Don&apos;t have an account?
            </p>

            <button
              type="button"
              onClick={() => router.push("/register")}
              className="mt-3 w-full p-3 rounded-lg border border-[#326E3B] text-[#326E3B] font-semibold hover:bg-[#326E3B] hover:text-white transition"
            >
              Create New Account
            </button>
          </div>

        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="md:w-1/2 hidden md:flex items-center justify-center p-10 bg-[#326E3B]">
        <div className="text-center text-white">
          <h3 className="text-3xl font-bold mb-4">
            Welcome Back!
          </h3>

          <p className="text-[#d7e8d8]">
            Connect with us  and start buying products instantly.
          </p>
        </div>
      </div>

    </div>
  </div>
</div>
  );
};

export default Login;