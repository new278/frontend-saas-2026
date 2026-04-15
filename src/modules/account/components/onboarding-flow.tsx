"use client"

import { useState } from "react"
import { PersonalInfoStep } from "@/src/modules/account/components/personal-info-step"
import { AffiliateInfoStep } from "@/src/modules/account/components/affiliate-info-step"
import { IdentityVerificationStep } from "@/src/modules/account/components/identity-verification-step"
import { BusinessInfoStep1 } from "@/src/modules/account/components/business-info-step-1"
import { BusinessInfoStep2 } from "@/src/modules/account/components/business-info-step-2"
import { BusinessInfoStep3 } from "@/src/modules/account/components/business-info-step-3"
import { StepIndicator } from "@/src/modules/account/components/step-indicator"

interface OnboardingFlowProps {
  accountType: "user" | "affiliate" | "business"
  initialData?: any
  onNext: (data: any) => void
}

export function OnboardingFlow({ accountType, initialData = {}, onNext }: OnboardingFlowProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormData] = useState(initialData)

  // Build per-account steps so business accounts get Business Information split across 3 steps
  const steps =
    accountType === "business"
      ? [
          { title: "Personal Information", component: PersonalInfoStep },
          { title: "Business — Details", component: BusinessInfoStep1 },
          { title: "Business — Documents", component: BusinessInfoStep2 },
          { title: "Business — Services", component: BusinessInfoStep3 },
          { title: "Identity verification", component: IdentityVerificationStep },
        ]
      : accountType === "affiliate"
      ? [
          { title: "Personal Information", component: PersonalInfoStep },
          { title: "Affiliate Information", component: AffiliateInfoStep },
          { title: "Identity verification", component: IdentityVerificationStep },
        ]
      : [
          { title: "Personal Information", component: PersonalInfoStep },
          { title: "Identity verification", component: IdentityVerificationStep },
        ]

  const CurrentStep = steps[currentStep].component

  const handleNext = (stepData: any) => {
    const newData = { ...formData, ...stepData }
    setFormData(newData)

    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      onNext(newData)
    }
  }

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  return (
     <div className="w-full space-y-6">
        <StepIndicator steps={steps.map((s) => s.title)} currentStep={currentStep} />
        <CurrentStep
          onNext={handleNext}
          onBack={handleBack}
          initialData={formData}
          accountType={accountType}
          isLastStep={currentStep === steps.length - 1}
        />
      </div>
  )
}
