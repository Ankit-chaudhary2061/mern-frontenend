import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthState, User } from "./auth-slice-types";
import { Status } from "../types/global-types";
import { AppDispatch } from "../store";
import { Logindata } from "@/app/login/login-types";
import api from "../../http/api";
import { RegisterData } from "@/app/register/register-types";

const initialState: AuthState = {
  user: null,

  loginStatus: Status.IDLE,
  registerStatus: Status.IDLE,
  otpStatus: Status.IDLE,

  forgotPasswordStatus: Status.IDLE,
  resetPasswordStatus: Status.IDLE,

  
}

const authSlice = createSlice({
    name:'auth',
    initialState,
    reducers:{
       setUser(state:AuthState, action:PayloadAction<User> ){
state.user = action.payload
       } ,
       setLoginStatus(state:AuthState, action:PayloadAction<Status>){
        state.loginStatus = action.payload
       },
       setRegisterStatus(state:AuthState, action:PayloadAction<Status>){
        state.registerStatus = action.payload
       },
       setOtpStatus(state:AuthState, action:PayloadAction<Status>){
        state.otpStatus = action.payload
       },
       setForgotPasswordStatus(state:AuthState, action:PayloadAction<Status>){
        state.forgotPasswordStatus = action.payload
       },
       setResetPasswordStatus(state:AuthState, action:PayloadAction<Status>){
        state.resetPasswordStatus = action.payload
       },
        clearUser(state: AuthState) {
    state.user = null
  },
   setToken(state: AuthState, action: PayloadAction<string>) {
    if (state.user) {
      state.user.token = action.payload
    }
  },
    }
})


export const { setUser,
  setLoginStatus,
  setRegisterStatus,
  setToken,
  setOtpStatus,
  setForgotPasswordStatus,
  setResetPasswordStatus,clearUser} =authSlice.actions
export default authSlice.reducer


export function loginUser(data:Logindata){
  return async function loginUserThunk(dispatch:AppDispatch){
try {
   dispatch(setLoginStatus(Status.LOADING))
   const response = await  api.post("/login", data)
   const user:User = response.data.user
   const token:string = response.data.token
   dispatch(setUser(user))
   dispatch(setToken(token))
   dispatch(setLoginStatus(Status.SUCCESS))
} catch (error) {
   dispatch(setLoginStatus(Status.ERROR))
}
  }
}

export function registerUser(data:RegisterData){
  return async function registerUserThunk(dispatch:AppDispatch){
try {   dispatch(setRegisterStatus(Status.LOADING))
   await  api.post("/register", data)
   dispatch(setRegisterStatus(Status.SUCCESS))
} catch (error) {
   dispatch(setRegisterStatus(Status.ERROR))
}   }
}
export function logoutUser(){
  return async function logoutUserThunk(dispatch:AppDispatch){
try {
   await api.post("/logout")
   dispatch(clearUser())
} catch (error) {
   console.error("Logout failed", error)
}
  }}
  export function verfyOtp(otp:string){
    return async function verifyOtpThunk(dispatch:AppDispatch){
try {
   dispatch(setOtpStatus(Status.LOADING))
   await api.post("/verify-otp", { otp })
   dispatch(setOtpStatus(Status.SUCCESS))
} catch (error) {
   dispatch(setOtpStatus(Status.ERROR))
}
    }}
  
export function resendOtp(email:string){
  return async function resendOtpThunk(dispatch:AppDispatch){
try {
   await api.post("/resend-otp", { email })
} catch (error) {
   console.error("Resend OTP failed", error)
}
  } }

export function forgotPassword(email:string){
  return async function forgotPasswordThunk(dispatch:AppDispatch){
try {
   dispatch(setForgotPasswordStatus(Status.LOADING))
   await api.post("/forgot-password", { email })
   dispatch(setForgotPasswordStatus(Status.SUCCESS))
} catch (error) {
   dispatch(setForgotPasswordStatus(Status.ERROR))
}
  } }

export function resetPassword(password:string, token:string){
  return async function resetPasswordThunk(dispatch:AppDispatch){
try {
   dispatch(setResetPasswordStatus(Status.LOADING))
   await api.post("/reset-password", { password, token })
   dispatch(setResetPasswordStatus(Status.SUCCESS))
} catch (error) {
   dispatch(setResetPasswordStatus(Status.ERROR))
}
  } }
  