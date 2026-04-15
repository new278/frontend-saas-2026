"use client"
import { SignupPage } from "@/src/modules/account/components/signup-page"
import { useParams, useRouter } from "next/navigation"

type AccountType = "user" | "affiliate" | "business"

export default function RegistrationPageRoute() {
  const params = useParams()
  const router = useRouter()
  const accountType = (params.type as AccountType) || "user"

  const handleNext = () => {
    router.push(`/account/${accountType}/otp-verification`)
  }

  const handleAccountTypeChange = (newType: AccountType) => {
    router.push(`/account/${newType}/registration`)
  }

  return (
    <SignupPage accountType={accountType} onNext={handleNext} onAccountTypeChange={handleAccountTypeChange} />
  )
}
