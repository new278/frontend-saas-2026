"use client"

import { useParams, useRouter } from "next/navigation"
import { OnboardingFlow } from "@/src/modules/account/components/onboarding-flow"

type AccountType = "user" | "affiliate" | "business"

export default function OnboardingPageRoute() {
  const params = useParams()
  const router = useRouter()
  const accountType = (params.type as AccountType) || "user"

  const handleNext = () => {
    router.push(`/account/${accountType}/verification`)
  }

  return <OnboardingFlow accountType={accountType} initialData={{}} onNext={handleNext} />
}
