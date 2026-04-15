"use client"

import { useParams, useRouter } from "next/navigation"
import { ResetPasswordPage } from "@/src/modules/account/components/reset-password-page"

type AccountType = "user" | "affiliate" | "business"

export default function ResetPasswordPageRoute() {
  const params = useParams()
  const router = useRouter()
  const accountType = (params.type as AccountType) || "user"

  const handleSuccess = () => {
    router.push(`/account/${accountType}/success`)
  }

  return <ResetPasswordPage onSuccess={handleSuccess} />
}
