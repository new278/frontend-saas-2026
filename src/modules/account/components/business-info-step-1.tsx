"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/src/components/ui/card"
import { Button } from "@/src/components/ui/button"
import { FormTextInput } from "@/src/components/form/form-text-input"
import { FormSelect } from "@/src/components/form/form-select"
import { Form } from "@/src/components/form/form"
import { UploadFile } from "@/src/components/form/UploadFile"
import { FormMultiSelect } from "@/src/components/form/form-multiselect"

const schema = z.object({
  businessType: z.string().min(1, "Business type is required"),
  businessName: z.string().min(2, "Business name is required"),
  logo: z.any().optional(),
  categories: z.array(z.string()).min(1, "Select at least one category"),
  subcategories: z.array(z.string()).optional(),
  requiredSkills: z.array(z.string()).optional(),
})

type FormValues = z.infer<typeof schema>

interface Props {
  onNext: (data: Partial<FormValues>) => void
  onBack: () => void
  initialData?: any
}

export function BusinessInfoStep1({ onNext, onBack, initialData = {} }: Props) {
  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      businessType: initialData.businessType || "Technology",
      businessName: initialData.businessName || "",
      logo: initialData.logo || "",
      categories: initialData.categories || [],
      subcategories: initialData.subcategories || [],
      requiredSkills: initialData.requiredSkills || [],
    } as any,
  })

  const onSubmit = (data: FormValues) => onNext(data)

  const categoryOptions = [
    { value: "Technology", label: "Technology" },
    { value: "SaaS", label: "SaaS" },
    { value: "Marketing", label: "Marketing" },
    { value: "Finance", label: "Finance" },
    { value: "Healthcare", label: "Healthcare" },
  ]

  const subcategoryOptions = [
    { value: "Web Development", label: "Web Development" },
    { value: "Mobile App", label: "Mobile App" },
    { value: "UI/UX", label: "UI/UX" },
    { value: "Data Science", label: "Data Science" },
  ]

  const skillOptions = [
    { value: "React", label: "React" },
    { value: "Node", label: "Node.js" },
    { value: "Python", label: "Python" },
    { value: "Design", label: "Design" },
  ]

  return (
    <Card className="w-full shadow-none bg-base-100 md:w-1/2 lg:w-1/3 mx-auto border-2 border-border/50">
      <CardHeader>
        <CardTitle>Business Details</CardTitle>
        <CardDescription>Step 1 — basic business details</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="text-sm font-medium">Business Type</label>
              <FormSelect control={form.control} name="businessType" placeholder="Select type" options={[
                { value: "Technology", label: "Technology" },
                { value: "Construction", label: "Construction" },
                { value: "Real Estate", label: "Real Estate" },
                { value: "Commercial & Industrial", label: "Commercial & Industrial" },
                { value: "Visa & Travel", label: "Visa & Travel" },
                { value: "Education", label: "Education" },
                { value: "Careers", label: "Careers" },
                { value: "Healthcare", label: "Healthcare" },
                { value: "Marketplace", label: "Marketplace" },
                { value: "Business", label: "Business" },
                { value: "Investment", label: "Investment" },
                { value: "Donations", label: "Donations" },
              ]} />
            </div>

            <div>
              <label className="text-sm font-medium">Business Name</label>
              <FormTextInput control={form.control} name="businessName" placeholder="Business name" />
            </div>

            <div>
              <UploadFile control={form.control} name="logo" label="Upload Logo (50–150px; PNG/SVG)" accept="image/*" uploadImmediately={false} />
            </div>

            <div>
              <label className="text-sm font-medium">Categories</label>
              <FormMultiSelect control={form.control} name="categories" options={categoryOptions} placeholder="Select categories" />
            </div>

            <div>
              <label className="text-sm font-medium">Subcategories</label>
              <FormMultiSelect control={form.control} name="subcategories" options={subcategoryOptions} placeholder="Select subcategories" />
            </div>

            <div>
              <label className="text-sm font-medium">Required Skills</label>
              <FormMultiSelect control={form.control} name="requiredSkills" options={skillOptions} placeholder="Select skills" />
            </div>

            <div className="flex gap-3 pt-6">
              <Button type="button" variant="outline" onClick={onBack} className="flex-1">Back</Button>
              <Button type="submit" className="flex-1">Next</Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
