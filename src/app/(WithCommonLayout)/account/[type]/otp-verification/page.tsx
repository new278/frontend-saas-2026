"use client"

import { VerificationPage } from "@/src/modules/account/components/verification-page"
import { useParams, useRouter } from "next/navigation"

type AccountType = "user" | "affiliate" | "business"

export default function OTPVerificationPageRoute() {
  const params = useParams()
  const router = useRouter()
  const accountType = (params.type as AccountType) || "user"

  const handleSuccess = () => {
    router.push(`/account/${accountType}/success`)
  }

  return <VerificationPage onSuccess={handleSuccess} />
}
