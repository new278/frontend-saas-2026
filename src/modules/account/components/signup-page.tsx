"use client"

import { FormActions } from "@/src/components/form/FormActions"
import { Form } from "@/src/components/form/form"
import { FormCheckbox } from "@/src/components/form/form-checkbox"
import { FormTextInput } from "@/src/components/form/form-text-input"
import { Card, CardContent, CardHeader, CardTitle } from "@/src/components/ui/card"
import { zodResolver } from "@hookform/resolvers/zod"
import Link from "next/link"
import { useMemo, useState } from "react"
import type { Resolver } from "react-hook-form"
import { useForm } from "react-hook-form"
import * as z from "zod"


// Build a conditional signup schema depending on account type
const createSignupSchema = (accountType: "user" | "affiliate" | "business") => {
  const contact = z
    .string()
    .refine((val) => {
      const isEmail = z.string().email().safeParse(val).success
      const isPhone = /^\d{10,}$/.test(val)
      return isEmail || isPhone
    }, "Provide a valid email or phone number")

  const base = {
    contact,
    password: z.string().min(8, "Password must be at least 8 characters"),
    agreeToTerms: z.boolean().refine((val) => val, "You must agree to the terms"),
  }

  // User account requires full name and currency
  if (accountType === "user") {
    return z.object({
      fullName: z.string().min(2, "Full name is required"),
      currency: z.string(),
      ...base,
    })
  }

  // Affiliate and business accounts simplified
  return z.object(base)
}

interface SignupPageProps {
  accountType: "user" | "affiliate" | "business"
  onNext: (data: Record<string, unknown>) => void
  onAccountTypeChange?: (type: "user" | "affiliate" | "business") => void
}

export function SignupPage({ accountType, onNext, onAccountTypeChange }: SignupPageProps) {
  const [submitErrors, setSubmitErrors] = useState<string | null>(null)
  const schema = useMemo(() => createSignupSchema(accountType), [accountType])
  const form = useForm<Record<string, unknown>>({
    resolver: zodResolver(schema) as unknown as Resolver<Record<string, unknown>>,
    defaultValues: {
      fullName: "",
      currency: "USD",
      contact: "",
      password: "",
      agreeToTerms: false,
    },
  })

  const onSubmit = (data: Record<string, unknown>) => {
    // clear previous errors
    setSubmitErrors(null)
    console.log("Signup submit:", { accountType, data })
    try {
      onNext(data)
    } catch (err) {
      console.error(err)
    }
  }

  const onInvalid = (errors: Record<string, unknown>) => {
    const firstKey = Object.keys(errors)[0]
    let firstMsg = "Please correct the highlighted fields"
    const val = errors[firstKey]
    if (val && typeof val === "object") {
      const m = (val as Record<string, unknown>)["message"]
      if (typeof m === "string") firstMsg = m
    }
    setSubmitErrors(firstMsg)
    // focus handling can be added here if desired
    console.warn("Signup validation failed:", errors)
  }

  const getTitle = () => {
    switch (accountType) {
      case "affiliate":
        return "Create Affiliate Account"
      case "business":
        return "Create Business Account"
      default:
        return "Create Account"
    }
  }

  return (
    <Card className="w-full shadow-none bg-base-100 md:w-1/2 lg:w-1/3 mx-auto border-2 border-border/50">
        <CardHeader className="pb-3">
          <div className="flex gap-2 justify-center mb-4">
            <button
              type="button"
              onClick={() => onAccountTypeChange?.("user")}
              className={`px-4 py-2 text-sm font-medium rounded transition-colors ${
                accountType === "user" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              User
            </button>
            <button
              type="button"
              onClick={() => onAccountTypeChange?.("affiliate")}
              className={`px-4 py-2 text-sm font-medium rounded transition-colors ${
                accountType === "affiliate" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              Affiliate
            </button>
            <button
              type="button"
              onClick={() => onAccountTypeChange?.("business")}
              className={`px-4 py-2 text-sm font-medium rounded transition-colors ${
                accountType === "business" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              Business
            </button>
          </div>
          <CardTitle className="text-2xl text-center">{getTitle()}</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            {submitErrors && (
              <div className="text-sm text-red-600 bg-red-50 p-3 rounded">{submitErrors}</div>
            )}
            <form onSubmit={form.handleSubmit(onSubmit, onInvalid)} className="space-y-4">
              {accountType === "user" && (
                <div>
                  <label className="text-sm font-medium">Full Name</label>
                  <FormTextInput control={form.control} name="fullName" placeholder="Full Name" />
                </div>
              )}

              {accountType === "user" && (
                <div>
                  <label className="text-sm font-medium">Currency</label>
                  <select
                    {...form.register("currency")}
                    className="w-full mt-2 px-3 py-2 border rounded bg-white"
                  >
                    <option value="USD">USD</option>
                    <option value="INR">INR</option>
                    <option value="EUR">EUR</option>
                    <option value="GBP">GBP</option>
                  </select>
                </div>
              )}

              <div>
                <label className="text-sm font-medium">Email Or Phone</label>
                <FormTextInput control={form.control} name="contact" placeholder="abc@gmail.com or 0912345678" />
              </div>

              <div>
                <label className="text-sm font-medium">Password</label>
                <FormTextInput control={form.control} name="password" type="password" placeholder="Enter password" />
              </div>

              <FormCheckbox control={form.control} name="agreeToTerms" label={"By signing up, you agree to our Terms, Privacy Policy and Cookies Policy"} />

              <FormActions submitLabel="Sign Up" showCancel={false} />

              <p className="text-center text-sm text-muted-foreground">
                Have an account already?{" "}
                <Link href={`/account/${accountType}/login`} className="text-primary hover:underline font-medium">
                  Log in
                </Link>
              </p>
            </form>
          </Form>
        </CardContent>
      </Card>
  )
}
