"use client"

import { Input } from "@/src/components/ui/input"
import { FormControl, FormField, FormItem, FormMessage } from "./form"
import type { Control, FieldPath } from "react-hook-form"

interface FormTextInputProps {
  control: Control<any>
  name: FieldPath<any>
  placeholder: string
  type?: "text" | "email" | "number" | "password" | "date"
}

export function FormTextInput({
  control,
  name,
  placeholder,
  type = "text",
}: FormTextInputProps) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormControl>
            <Input
              type={type}
              placeholder={placeholder}
              {...field}
              className="bg-white text-slate-900 placeholder:text-slate-500 border-0"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
