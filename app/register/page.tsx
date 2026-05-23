"use client"

import { useAppDispatch, useAppSelector } from "@/src/lib/store/hook"
import { Eye, EyeOff } from "lucide-react"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import { RegisterData } from "./register-types"
import { registerUser } from "@/src/lib/store/auth/auth-slice"
import { Status } from "@/src/lib/store/types/global-types"
import Link from "next/link"
import { useRouter } from "next/navigation"


const Register = ()=>{
  const router =  useRouter()
   const dispatch = useAppDispatch()
   const { registerStatus } = useAppSelector((state) => state.auth)
   const [errorMessage, setErrorMessage] = useState("");
   const [data, setData] = useState<RegisterData>({
     username: "",
     email: "",
     password: ""
   })
   const [showPassword, setShowPassword] = useState(false);
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

    useEffect(() => {
      if (registerStatus === Status.ERROR) {
        const message = "Registration failed. Email already exists. Please try again.";
        setErrorMessage(message);
        toast.error(message);

        const timeout = window.setTimeout(() => {
          setErrorMessage("");
        }, 3000);

        return () => window.clearTimeout(timeout);
      }

      if (registerStatus === Status.SUCCESS) {
        toast.success("Registration successful. Please log in.");
        setErrorMessage("");
         router.push(`/otp-verification?email=${data.email}`);

      }
    }, [registerStatus, data.email, router]);

    return (
//         <>
//         <div className="w-full min-h-screen flex items-center justify-center p-4 bg-[#ecf7ed]">
//       <div className="relative w-full max-w-5xl">

     
//           <div className="flex flex-col md:flex-row w-full bg-white rounded-[2rem] shadow-2xl overflow-hidden">

//             {/* LEFT SIDE - FORM */}
//             <div className="md:w-1/2 p-8 flex items-center justify-center md:border-r border-[#326E3B]/20 bg-[#f8fff4]">
//               <div className="w-full max-w-md">

//                 {/* Heading */}
//                 <div className="text-center mb-8">
//                   <MessageCircleIcon className="w-12 h-12 mx-auto text-[#326E3B] mb-4" />
//                   <h2 className="text-2xl font-bold text-[#326E3B]">
//                     Create an Account
//                   </h2>
//                   <p className="text-[#52655a]">
//                     Join our community today!
//                   </p>
//                 </div>

//                 {/* Form */}
//                 <form  onSubmit={handleSubmit}  className="space-y-6">

//                   <input
//                     type="text"
//                     name="username"
//                     placeholder="Username"
//                     value={data.username}
//                     onChange={handleChange}
//                     className="w-full p-3 rounded-lg bg-white text-slate-900 border border-[#326E3B]/20 focus:outline-none focus:ring-2 focus:ring-[#326E3B]"
//                   />

//                   <input
//                     type="email"
//                     name="email"
//                     placeholder="Email"
//                     value={data.email}
//                     onChange={handleChange}
//                     className="w-full p-3 rounded-lg bg-white text-slate-900 border border-[#326E3B]/20 focus:outline-none focus:ring-2 focus:ring-[#326E3B]"
//                   />

//                   <input
//                     type="password"
//                     name="password"
//                     placeholder="Password"
//                     value={data.password}
//                     onChange={handleChange}
//                     className="w-full p-3 rounded-lg bg-white text-slate-900 border border-[#326E3B]/20 focus:outline-none focus:ring-2 focus:ring-[#326E3B]"
//                   />

//                   <button
//   type="submit"
//   disabled={registerStatus === Status.LOADING}
//   className="w-full p-3 rounded-lg bg-[#326E3B] hover:bg-[#25522d] text-white font-semibold transition"
// >
//   {registerStatus === Status.LOADING ? "Registering..." : "Register"}
// </button>

//                   {/* {errorMessage && (
//                     <p className="text-red-400 text-sm text-center">
//                       {errorMessage}
//                     </p>
//                   )} */}

//                 </form>
//                {/* Link to Login */}
//                 <p className="text-center text-sm text-slate-600 mt-6">
//                   Already have an account?{" "}
//                   <Link href="/login" className="text-[#326E3B] hover:underline font-medium">
//                     Log in here
//                   </Link>
//                 </p>
//               </div>
//             </div>

//             {/* RIGHT SIDE */}
//             <div className="md:w-1/2 hidden md:flex items-center justify-center p-8 bg-[#326E3B]">
//               <div className="text-center text-white">
//                 <h3 className="text-3xl font-bold mb-4">
//                   Welcome to Friends Book
//                 </h3>
//                 <p className="text-[#d7e8d8]">
//                   Connect with friends, join chats, and share moments.
//                 </p>
//               </div>
//             </div>

//           </div>
       

//       </div>
//     </div>
        
//         </>
<div className="w-full min-h-screen flex items-center justify-center py-10 bg-[#ecf7ed]">

  <div className="container mx-auto px-[200px]">

    <div className="relative w-full max-w-5xl mx-auto">

      <div className="flex flex-col md:flex-row w-full bg-white rounded-[2rem] shadow-2xl overflow-hidden">

        {/* LEFT SIDE - FORM */}
        <div className="md:w-1/2 p-8 flex items-center justify-center md:border-r border-[#326E3B]/20 bg-[#f8fff4]">

          <div className="w-full max-w-md">

            {/* Heading */}
            <div className="text-center mb-8">

              <h2 className="text-2xl font-bold text-[#326E3B]">
                Create an Account
              </h2>

              <p className="text-[#52655a]">
                Join our  tea community today!
              </p>

            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">

              <input
                type="text"
                name="username"
                placeholder="Username"
                value={data.username}
                onChange={handleChange}
                className="w-full p-3 rounded-lg bg-white text-slate-900 border border-[#326E3B]/20 focus:outline-none focus:ring-2 focus:ring-[#326E3B]"
              />

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
                disabled={registerStatus === Status.LOADING}
                className="w-full p-3 rounded-lg bg-[#326E3B] hover:bg-[#25522d] text-white font-semibold transition"
              >
                {registerStatus === Status.LOADING
                  ? "Registering..."
                  : "Register"}
              </button>

            </form>

            {/* Login Link */}
            <p className="text-center text-sm text-slate-600 mt-6">
              Already have an account?{" "}
              <Link
                href="/login"
                className="text-[#326E3B] hover:underline font-medium"
              >
                Log in here
              </Link>
            </p>

          </div>

        </div>

        {/* RIGHT SIDE */}
        <div className="md:w-1/2 hidden md:flex items-center justify-center p-8 bg-[#326E3B]">

          <div className="text-center text-white">

            <h3 className="text-3xl font-bold mb-4">
              Welcome to Ramphok Tea Shop
            </h3>

            <p className="text-[#d7e8d8]">
              Connect with friends, join chats, and share moments.
            </p>

          </div>

        </div>

      </div>

    </div>

  </div>

</div>

    )
}

export default Register