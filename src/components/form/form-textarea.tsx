"use client"

import { Textarea } from "@/src/components/ui/textarea"
import { FormControl, FormField, FormItem, FormMessage } from "./form"
import type { Control, FieldPath } from "react-hook-form"
import React from "react"

interface FormTextareaProps {
  control: Control<any>
  name: FieldPath<any>
  placeholder?: string
  className?: string
}

export function FormTextarea({ control, name, placeholder = "", className = "" }: FormTextareaProps) {
  return (
    <FormField control={control} name={name} render={({ field }) => (
      <FormItem>
        <FormControl>
          <Textarea placeholder={placeholder} {...field} className={className} />
        </FormControl>
        <FormMessage />
      </FormItem>
    )} />
  )
}

export default FormTextarea
