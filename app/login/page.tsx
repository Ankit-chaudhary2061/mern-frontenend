"use client";

import BorderAnimation from "@/src/components/bodyanimatior";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "@/src/lib/store/hook";
import { MessageCircleIcon } from "lucide-react";
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
    <>
      <div className="w-full min-h-screen flex items-center justify-center p-4 bg-slate-900">
        <div className="relative w-full max-w-5xl">
          <BorderAnimation>
            <div className="flex flex-col md:flex-row w-full">

              {/* LEFT SIDE */}
              <div className="md:w-1/2 p-8 flex items-center justify-center md:border-r border-slate-700">
                <div className="w-full max-w-md">

                  {/* Heading */}
                  <div className="text-center mb-8">
                    <MessageCircleIcon className="w-12 h-12 mx-auto text-slate-400 mb-4" />

                    <h2 className="text-2xl font-bold text-slate-200">
                      Login to Your Account
                    </h2>

                    <p className="text-slate-400">
                      Enter your credentials to continue
                    </p>
                  </div>

                  {/* FORM */}
                  <form
                    onSubmit={handleSubmit}
                    className="space-y-6"
                  >
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
                      disabled={
                        loginStatus === Status.LOADING
                      }
                      className="w-full p-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold transition"
                    >
                      {loginStatus === Status.LOADING
                        ? "Logging in..."
                        : "Login"}
                    </button>
                  </form>

                  {/* FORGOT PASSWORD */}
                  {/* FORGOT PASSWORD */}
<div className="text-right mt-3">
  <button
    type="button"
    onClick={handleForgotPassword}
    className="text-blue-400 hover:text-blue-500 hover:underline text-sm font-medium transition-colors"
  >
    Forgot password?
  </button>
</div>

{/* CREATE ACCOUNT */}
<div className="mt-6 text-center border-t border-slate-700 pt-6">
  <p className="text-slate-400 text-sm">
    Don&apos;t have an account?
  </p>

  <button
    type="button"
    onClick={() => router.push("/register")}
    className="mt-3 w-full p-3 rounded-lg bg-slate-700 hover:bg-slate-600 text-white font-semibold transition"
  >
    Create New Account
  </button>
</div>

                </div>
              </div>

              {/* RIGHT SIDE */}
              <div className="md:w-1/2 hidden md:flex items-center justify-center p-8">
                <div className="text-center text-slate-300">
                  <h3 className="text-3xl font-bold mb-4">
                    Welcome Back!
                  </h3>

                  <p className="text-slate-400">
                    Connect with your friends and start chatting instantly.
                  </p>
                </div>
              </div>

            </div>
          </BorderAnimation>
        </div>
      </div>
    </>
  );
};

export default Login;