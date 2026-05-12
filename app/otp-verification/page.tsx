"use client"

import BorderAnimation from "@/src/components/bodyanimatior";
import { useAppDispatch, useAppSelector } from "@/src/lib/store/hook";
import { MessageCircleIcon } from "lucide-react";
import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { Status } from "@/src/lib/store/types/global-types";
import { toast } from "react-toastify";
import { resendOtp, verfyOtp } from "@/src/lib/store/auth/auth-slice";


const OTPVerification = () => {
      const router = useRouter();
  
    const searchParams = useSearchParams();
    const email = searchParams.get("email") ?? "";
    const dispatch = useAppDispatch();
    const { otpStatus } = useAppSelector((state) => state.auth);
    const [otp, setOtp] = useState(["", "", "", "", "", ""]);
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
    const [timer, setTimer] = useState(60);

    useEffect(() => {
      if (timer <= 0) return;
      const interval = window.setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => window.clearInterval(interval);
    }, [timer]);

    const handleChange = (index: number, value: string) => {
      if (!/^\d*$/.test(value)) return;

      const newOtp = [...otp];
      newOtp[index] = value.slice(-1);
      setOtp(newOtp);

      if (value && index < 5) {
        inputRefs.current[index + 1]?.focus();
      }
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      const code = otp.join("");

      if (code.length !== 6) {
        toast.error("Please enter full OTP");
        return;
      }

      if (!email) {
        toast.error("Email is missing. Please open this page with ?email=your-email@example.com");
        return;
      }

      dispatch(verfyOtp(code, email));
    };
 useEffect(() => {
    if (otpStatus === Status.SUCCESS) {
      toast.success("OTP verified successfully!");
      router.push("/login");
    }

    if (otpStatus === Status.ERROR) {
      toast.error("Invalid OTP");
    }
  }, [otpStatus, router]);

  // timer countdown
  useEffect(() => {
    if (timer === 0) return;

    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timer]);
    const handleResendOtp = () => {
      if (!email) {
        toast.error("Email is missing. Cannot resend OTP.");
        return;
      }

      dispatch(resendOtp(email));
      setTimer(60);
    };
    return(
        <>
         <div className="w-full min-h-screen flex items-center justify-center p-4 bg-slate-900">
      <div className="relative w-full max-w-md">

        <BorderAnimation>
          <div className="p-8 text-center">

            <MessageCircleIcon className="w-12 h-12 mx-auto text-slate-400 mb-4" />

            <h2 className="text-2xl font-bold text-white mb-2">
              OTP Verification
            </h2>

            <p className="text-slate-400 mb-6">
              Enter the 6 digit code sent to {email || "your email"}
            </p>

            {/* OTP FORM */}
            <form onSubmit={handleSubmit} className="space-y-6">

              <div className="flex justify-between gap-2">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    ref={(el) => {
                      inputRefs.current[index] = el;
                    }}
                    type="text"
                    value={digit}
                    maxLength={1}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      handleChange(index, e.target.value)
                    }
                    className="w-12 h-12 text-center text-xl rounded-lg bg-slate-800 border border-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                ))}
              </div>

              <button
                type="submit"
                disabled={otpStatus === Status.LOADING}
                className="w-full py-3 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-semibold transition"
              >
                {otpStatus === Status.LOADING ? "Verifying..." : "Verify OTP"}
              </button>
            </form>

            {/* RESEND OTP */}
            <div className="mt-6 text-sm text-slate-400">
              {timer > 0 ? (
                <p>Resend OTP in {timer}s</p>
              ) : (
                <button
                  onClick={handleResendOtp}
                  className="text-indigo-400 hover:underline"
                >
                  Resend OTP
                </button>
              )}
            </div>

          </div>
        </BorderAnimation>

      </div>
    </div>
        
        </>
    )
}