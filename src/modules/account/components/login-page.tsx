"use client"

import React from "react"
import { useForm } from "react-hook-form"
import type { Resolver } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { FormTextInput } from "@/src/components/form/form-text-input"
import { FormCheckbox } from "@/src/components/form/form-checkbox"
import { FormActions } from "@/src/components/form/FormActions"
import { Card, CardContent, CardHeader, CardTitle } from "@/src/components/ui/card"
import { Form } from "@/src/components/form/form"



const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  rememberMe: z.boolean().default(false),
})

type LoginFormValues = z.infer<typeof loginSchema>

interface LoginPageProps {
  accountType?: "user" | "affiliate" | "business"
  onSignup: () => void
  onAccountTypeChange: (type: "user" | "affiliate" | "business") => void
  onForgotPassword?: () => void
}

export function LoginPage({ accountType = "user", onSignup, onAccountTypeChange, onForgotPassword }: LoginPageProps) {
  const selectedType = accountType

  const form = useForm<LoginFormValues>({
    // Cast resolver to the expected Resolver type to avoid type incompatibilities
    resolver: zodResolver(loginSchema) as unknown as Resolver<LoginFormValues, unknown>,
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  })

  const onSubmit = (data: LoginFormValues) => {
    console.log("Login:", data)
  }

  const handleAccountTypeChange = (type: "user" | "affiliate" | "business") => {
    onAccountTypeChange(type)
  }

  return (
    <Card className="w-full shadow-none bg-base-100 md:w-1/2 lg:w-1/3 mx-auto border-2 border-border/50">
        <CardHeader className="pb-3">
          <div className="flex gap-2 justify-center mb-4">
            <button
              onClick={() => handleAccountTypeChange("user")}
              className={`px-4 py-2 text-sm font-medium rounded transition-colors ${
                selectedType === "user"
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              User
            </button>
            <button
              onClick={() => handleAccountTypeChange("affiliate")}
              className={`px-4 py-2 text-sm font-medium rounded transition-colors ${
                selectedType === "affiliate"
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              Affiliate
            </button>
            <button
              onClick={() => handleAccountTypeChange("business")}
              className={`px-4 py-2 text-sm font-medium rounded transition-colors ${
                selectedType === "business"
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              Business
            </button>
          </div>
          <CardTitle className="text-2xl text-center">
            {selectedType === "user" && "User Login"}
            {selectedType === "affiliate" && "Affiliate Login"}
            {selectedType === "business" && "Business Login"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label className="text-sm font-medium">Email Or Phone</label>
                <FormTextInput control={form.control} name="email" placeholder="abc@gmail.com" />
              </div>

              <div>
                <label className="text-sm font-medium">Password</label>
                <FormTextInput control={form.control} name="password" type="password" placeholder="Enter your password" />
              </div>

              <div className="flex items-center justify-between">
                <FormCheckbox control={form.control} name="rememberMe" label={"Remember me"} />
                <button onClick={onForgotPassword} className="text-sm text-primary hover:underline">
                  Forgot Password?
                </button>
              </div>

              <FormActions submitLabel="Log In" showCancel={false} />

              <p className="text-center text-sm text-muted-foreground">
                Don&apos;t have an account?{" "}
                <button onClick={onSignup} className="text-primary hover:underline font-medium">
                  Sign up
                </button>
              </p>
            </form>
          </Form>
        </CardContent>
      </Card>
  )
}
