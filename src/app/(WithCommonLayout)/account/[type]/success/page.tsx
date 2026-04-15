"use client"

import { useParams, useRouter } from "next/navigation"
import { SuccessPage } from "@/src/modules/account/components/success-page"

type AccountType = "user" | "affiliate" | "business"

export default function SuccessPageRoute() {
  const params = useParams()
  const router = useRouter()
  const accountType = (params.type as AccountType) || "user"

  const handleDone = () => {
    router.push(`/account/${accountType}/login`)
  }

  return <SuccessPage onDone={handleDone} />
}
