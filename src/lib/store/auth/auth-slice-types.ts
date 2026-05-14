import { Status } from "../types/global-types";



export interface User {
  _id:string
  username: string;
  email: string;
 
  profileImage?: { url: string; public_id?: string };
  role?: string;

  token?: string;

  
}

export interface AuthState {
  user: User | null;

  loginStatus: Status;
  registerStatus: Status;
  otpStatus: Status;

  forgotPasswordStatus: Status;
  resetPasswordStatus: Status;
  logoutStatus: Status;

 
}