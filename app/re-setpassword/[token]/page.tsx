import BorderAnimation from "@/src/components/bodyanimatior";
import { useAppDispatch, useAppSelector } from "@/src/lib/store/hook";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { use, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { resetPassword } from "@/src/lib/store/auth/auth-slice";
import { Status } from "@/src/lib/store/types/global-types";

const ResetPassword = () => {

const dispatch = useAppDispatch()
  const router = useRouter();

  const params = useParams();
  const token = params.token as string;

  const searchParams = useSearchParams();
  const email = searchParams.get("email");
const { resetPasswordStatus } = useAppSelector((state) => state.auth)
const [password, setPassword] = useState("")
const [confirmPassword, setConfirmPassword] = useState("")
const [showPassword, setShowPassword] = useState(false)
const [showConfirm, setShowConfirm] = useState(false)
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      toast.error("Email not found in URL");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    dispatch(
      resetPassword({
        email,
        token: token,
        newPassword: password,
      })
    );
  };
   useEffect(() => {
    if (resetPasswordStatus === Status.SUCCESS) {
      toast.success("Password reset successful!");
      router.push("/login");
    } else if (resetPasswordStatus === Status.ERROR) {
      toast.error("Password reset failed. Try again.");
    }
  }, [resetPasswordStatus, router]);

    return(
    //     <>
        
    //       <div className="w-full min-h-screen flex items-center justify-center bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 p-4">
    //   <div className="w-full max-w-md">
    //     <BorderAnimation>
    //       <form
    //         onSubmit={handleSubmit}
    //         className="bg-slate-800 p-8 rounded-2xl shadow-xl space-y-6 backdrop-blur-sm border border-slate-700"
    //       >
    //         <h2 className="text-3xl font-bold text-white text-center mb-2">
    //           Reset Password
    //         </h2>
    //         <p className="text-slate-400 text-center mb-6">
    //           Enter a new password to secure your account.
    //         </p>

    //         {/* New Password */}
    //         <div className="relative">
    //           <input
    //             type={showPassword ? "text" : "password"}
    //             placeholder="New Password"
    //             value={password}
    //             onChange={(e) => setPassword(e.target.value)}
    //             required
    //             className="w-full p-4 rounded-lg bg-slate-700 text-white border border-slate-600 focus:outline-none focus:ring-2 focus:ring-pink-500 transition pr-12"
    //           />
    //           <button
    //             type="button"
    //             onClick={() => setShowPassword(!showPassword)}
    //             className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition"
    //           >
    //             {showPassword ? <EyeIcon className="w-5 h-5" /> : <EyeOffIcon className="w-5 h-5" />}
    //           </button>
    //         </div>

    //         {/* Confirm Password */}
    //         <div className="relative">
    //           <input
    //             type={showConfirm ? "text" : "password"}
    //             placeholder="Confirm Password"
    //             value={confirmPassword}
    //             onChange={(e) => setConfirmPassword(e.target.value)}
    //             required
    //             className="w-full p-4 rounded-lg bg-slate-700 text-white border border-slate-600 focus:outline-none focus:ring-2 focus:ring-pink-500 transition pr-12"
    //           />
    //           <button
    //             type="button"
    //             onClick={() => setShowConfirm(!showConfirm)}
    //             className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition"
    //           >
    //             {showConfirm ? <EyeIcon className="w-5 h-5" /> : <EyeOffIcon className="w-5 h-5" />}
    //           </button>
    //         </div>

    //         {/* Reset Button */}
    //         <button
    //           type="submit"
    //           disabled={resetPasswordStatus === Status.LOADING}
    //           className={`w-full p-4 text-white font-semibold rounded-lg shadow-md transition-all duration-300 ${
    //             resetPasswordStatus === Status.LOADING
    //               ? "bg-pink-400 cursor-not-allowed"
    //               : "bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600"
    //           }`}
    //         >
    //           {resetPasswordStatus === Status.LOADING ? "Resetting..." : "Reset Password"}
    //         </button>

    //         <p className="text-center text-slate-400 text-sm mt-4">
    //           Remember your password?{" "}
    //           <a
    //             href="/login"
    //             className="text-pink-400 hover:text-pink-500 font-medium transition-colors"
    //           >
    //             Login
    //           </a>
    //         </p>
    //       </form>
    //     </BorderAnimation>
    //   </div>
    // </div>
        
    //     </>
    <div className="w-full min-h-screen flex items-center justify-center bg-[#ecf7ed] p-4">

  <div className="w-full max-w-md">



      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-xl space-y-6 border border-[#326E3B]/10"
      >

        {/* Heading */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-[#326E3B]">
            Reset Password
          </h2>

          <p className="text-gray-600 text-sm mt-2">
            Enter a new password to secure your account.
          </p>
        </div>

        {/* New Password */}
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="New Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full p-4 rounded-lg bg-gray-50 text-gray-900 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#326E3B] transition pr-12"
          />

          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-[#326E3B]"
          >
            {showPassword ? (
              <EyeIcon className="w-5 h-5" />
            ) : (
              <EyeOffIcon className="w-5 h-5" />
            )}
          </button>
        </div>

        {/* Confirm Password */}
        <div className="relative">
          <input
            type={showConfirm ? "text" : "password"}
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="w-full p-4 rounded-lg bg-gray-50 text-gray-900 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#326E3B] transition pr-12"
          />

          <button
            type="button"
            onClick={() => setShowConfirm(!showConfirm)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-[#326E3B]"
          >
            {showConfirm ? (
              <EyeIcon className="w-5 h-5" />
            ) : (
              <EyeOffIcon className="w-5 h-5" />
            )}
          </button>
        </div>

        {/* Reset Button */}
        <button
          type="submit"
          disabled={resetPasswordStatus === Status.LOADING}
          className={`w-full p-4 text-white font-semibold rounded-lg shadow-md transition-all duration-300 ${
            resetPasswordStatus === Status.LOADING
              ? "bg-green-300 cursor-not-allowed"
              : "bg-[#326E3B] hover:bg-[#25522d]"
          }`}
        >
          {resetPasswordStatus === Status.LOADING
            ? "Resetting..."
            : "Reset Password"}
        </button>

        {/* Login Link */}
        <p className="text-center text-gray-600 text-sm">
          Remember your password?{" "}
          <a
            href="/login"
            className="text-[#326E3B] hover:underline font-medium"
          >
            Login
          </a>
        </p>

      </form>

  

  </div>
</div>
    )
}


export default ResetPassword;