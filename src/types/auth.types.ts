import * as z from "zod"
import { signInSchema, signUpSchema, forgotPasswordEmailSchema, otpSchema, newPasswordSchema } from "@/src/schema/auth.schema";

export type SignInFormValues = z.infer<typeof signInSchema>


export type SignUpFormValues = z.infer<typeof signUpSchema>

export type ForgotPasswordEmailFormValues = z.infer<typeof forgotPasswordEmailSchema>
export type OtpFormValues = z.infer<typeof otpSchema>
export type NewPasswordFormValues = z.infer<typeof newPasswordSchema>


export interface Root {
  success: boolean
  message: string
  data: Data
}

export interface Data {
  token: string
  user: IUser
}

export interface IUser {
  id: string
  firstName: string
  lastName: string
  companyName: string
  country: string
  mobileNumber: string
  email: string
  password: string
  businessCategoryId: string
  subBusinessCategoryId: string
  passwordChangedAt: any
  role: string
  status: string
  createdAt: string
  updatedAt: string
}

export interface IDecodedToken  {
  id: string;
  name?: string;
  email?: string;
  mobileNumber?: string;
  profilePhoto?: string;
  role?: string;
  status?: string;

};

export type NavItem = {
  path: string;
  label: string;
  key: string;
};