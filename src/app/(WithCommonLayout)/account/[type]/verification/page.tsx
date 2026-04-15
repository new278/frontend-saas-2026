"use client"

import { useParams, useRouter } from "next/navigation"
import { VerificationPage } from "@/src/modules/account/components/verification-page"

type AccountType = "user" | "affiliate" | "business"

export default function VerificationPageRoute() {
  const params = useParams()
  const router = useRouter()
  const accountType = (params.type as AccountType) || "user"

  const handleSuccess = () => {
    router.push(`/account/${accountType}/success`)
  }

  return <VerificationPage onSuccess={handleSuccess} />
}
