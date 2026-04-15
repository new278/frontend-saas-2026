

"use client"

import React, { useState } from "react"
import Image from "next/image"
import { Card, CardContent, CardHeader } from "@/src/components/ui/card"
// Use a simple img-based avatar to avoid a missing Avatar component
// Badge removed; using inline status pill for simpler styling
import { Button } from "@/src/components/ui/button"
import { Form } from "@/src/components/form/form"
import { useForm } from "react-hook-form"
import { FormTextInput } from "@/src/components/form/form-text-input"
import { Camera } from "lucide-react"

const demoProfile = {
  fullName: "Abhijit Kumar",
  phone: "+91-1234567895",
  email: "abhijit@gmail.com",
  currency: "USD",
  avatar: "https://lh3.googleusercontent.com/a-/ALV-UjUcIWda3ZrzBMAJl37_GUwH9bvPyroMBoqo3x1hKRyIO-LD96s=s240-p-k-rw-no",
  status: "Active",
}


const ProfilePageLayout = () => {
  const [editing, setEditing] = useState(false)
  const [profile, setProfile] = useState(demoProfile)

  const form = useForm({
    defaultValues: {
      fullName: profile.fullName,
      phone: profile.phone,
      email: profile.email,
      currency: profile.currency,
    },
  })

  // demo phone/email entries to match the UI in screenshots
  const [phones, setPhones] = useState(
    [{ id: String(Date.now()), value: profile.phone, verified: true, primary: true }]
  )
  const [emails, setEmails] = useState(
    [{ id: String(Date.now() + 1), value: profile.email, verified: true, primary: true }]
  )

  // verification UI state
  const [verifyTarget, setVerifyTarget] = useState<{ type: "phone" | "email"; id: string } | null>(null)
  const [verifyCode, setVerifyCode] = useState("")
  const [timeLeft, setTimeLeft] = useState(0)

  // start verification flow for an entry
  const startVerification = (type: "phone" | "email", id: string) => {
    setVerifyTarget({ type, id })
    setVerifyCode("")
    setTimeLeft(119) // 2 minutes
    console.log(`Starting verification for ${type}:${id}`)
  }

  // resend OTP (demo) — reset timer
  const resendVerification = () => {
    setTimeLeft(119)
    console.log("Resend OTP (demo)")
  }

  // submit OTP — demo verifies when 6 digits entered
  const submitVerification = () => {
    if (verifyCode.trim().length === 6 && verifyTarget) {
      const { type, id } = verifyTarget
      if (type === "phone") {
        setPhones((s) => s.map((p) => (p.id === id ? { ...p, verified: true } : p)))
      } else {
        setEmails((s) => s.map((e) => (e.id === id ? { ...e, verified: true } : e)))
      }
      setVerifyTarget(null)
      setVerifyCode("")
      setTimeLeft(0)
      console.log("Verification success (demo)")
    }
  }

  // countdown timer for OTP
  React.useEffect(() => {
    if (!verifyTarget) return
    if (timeLeft <= 0) return
    const t = setInterval(() => setTimeLeft((v) => Math.max(0, v - 1)), 1000)
    return () => clearInterval(t)
  }, [verifyTarget, timeLeft])

  const addPhone = () => setPhones((s) => [...s, { id: String(Date.now()), value: "", verified: false, primary: false }])
  const updatePhone = (id: string, value: string) => setPhones((s) => s.map((p) => (p.id === id ? { ...p, value } : p)))
  const deletePhone = (id: string) => setPhones((s) => s.filter((p) => p.id !== id))
  const setPrimaryPhone = (id: string) => setPhones((s) => s.map((p) => ({ ...p, primary: p.id === id })))

  const addEmail = () => setEmails((s) => [...s, { id: String(Date.now()), value: "", verified: false, primary: false }])
  const updateEmail = (id: string, value: string) => setEmails((s) => s.map((e) => (e.id === id ? { ...e, value } : e)))
  const deleteEmail = (id: string) => setEmails((s) => s.filter((e) => e.id !== id))
  const setPrimaryEmail = (id: string) => setEmails((s) => s.map((e) => ({ ...e, primary: e.id === id })))

  type ProfileFormValues = {
    fullName?: string
    phone?: string
    email?: string
    currency?: string
  }

  const onSave = (values: ProfileFormValues) => {
    // demo save: replace with backend call later
    setProfile((prev) => ({ ...prev, ...values }))
    console.log("Save profile (demo):", values)
    setEditing(false)
  }

  return (
    <div className="flex justify-center mt-5 px-4 w-full  items-start">
      <Card className="w-full md:w-3/4 lg:w-1/2 bg-base-100 shadow overflow-visible rounded-lg">
        {
          !editing && (

            <CardHeader className="relative -mt-6 py-4 bg-sky-100  ">
              <div className="flex items-center justify-between">
                <div className="relative">
                  <div className="h-32 w-32 rounded-full overflow-hidden ring-4 ring-white shadow-lg">
                    <Image src={profile.avatar} alt={profile.fullName} fill className="object-cover rounded-full" />
                  </div>
                  <div className="mt-3 absolute bottom-0 left-20">
                    <span className="inline-flex items-center gap-2 rounded-full bg-white  p-1 shadow-sm text-sm">
                      <span className={`h-3 w-3 rounded-full ${profile.status === 'Active' ? 'bg-green-500' : 'bg-gray-400'}`} />
                      <span className="text-sm font-medium text-gray-700">{profile.status}</span>
                    </span>
                  </div>
                </div>

                <div>
                  {!editing ? (
                    <Button onClick={() => setEditing(true)} >Edit</Button>
                  ) : (
                    <Button onClick={() => setEditing(false)} variant="ghost">Cancel</Button>
                  )}
                </div>
              </div>
            </CardHeader>
          )
        }

        <CardContent className="p-5">
          {!editing ? (
            <div className="">
              <div className="max-w-4xl mx-auto">
                <dl className="grid grid-cols-1 gap-y-6 gap-x-8">
                  <div className="flex items-start gap-4">
                    <dt className="text-sm font-medium w-36">Full Name</dt>
                    <dd className="">{profile.fullName}</dd>
                  </div>
                  <div className="flex items-start gap-4">
                    <dt className="text-sm font-medium w-36">Mobile Number</dt>
                    <dd className="">{profile.phone}</dd>
                  </div>
                  <div className="flex items-start gap-4">
                    <dt className="text-sm font-medium w-36">Currency</dt>
                    <dd className="">{profile.currency}</dd>
                  </div>
                  <div className="flex items-start gap-4">
                    <dt className="text-sm font-medium w-36">Email</dt>
                    <dd className="">{profile.email}</dd>
                  </div>
                </dl>
              </div>
            </div>
          ) : (
            <div className="max-w-4xl mx-auto">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSave)} className="space-y-6">

                  <div className="relative flex items-center justify-center mb-4">
                    <Image
                      src={profile.avatar || "/default-avatar.png"}
                      alt="Profile"
                      width={200}
                      height={200}
                      className="h-[200px] w-[200px] rounded-full border-[5px] border-primaryBlue object-cover"
                    />

                    <label
                      htmlFor="profileImage"
                      className="absolute -bottom-3 left-1/2 -translate-x-1/2 -translate-y-1 rounded-full cursor-pointer z-10"
                    >
                      <div className="h-10 w-10 flex items-center justify-center rounded-full bg-white/90 text-primaryBlue shadow-md">
                        <Camera className="text-lg" />
                      </div>
                      <input
                        id="profileImage"
                        type="file"
                        accept="image/*"
                        className="sr-only"
                      />
                    </label>
                  </div>

                  <div className="grid grid-cols-1 gap-4">
                    <FormTextInput control={form.control} name="fullName" placeholder="Full name" />
                  </div>

                  <div className="mt-2">
                    <h4 className="text-sm  mb-2">Phone Numbers</h4>
                    {phones.map((p) => (
                      <div key={p.id} className="mb-3">
                        <div className="flex items-center gap-3 mb-2 bg-white border rounded-lg p-2">
                          <input value={p.value} onChange={(e) => updatePhone(p.id, e.target.value)} className="flex-1 rounded px-3 py-2 outline-none" />
                          {!p.verified && verifyTarget?.type === "phone" && verifyTarget.id === p.id ? (
                            <>
                              <div className="flex items-center relative  gap-2">
                                <input
                                  value={verifyCode}
                                  onChange={(e) => setVerifyCode(e.target.value.replace(/\D/g, "").slice(0, 6))}
                                  placeholder="000000"
                                  className="w-32 rounded border px-3 py-2 text-center"
                                />
                                <button type="button" onClick={() => submitVerification()} className="px-3 py-2 bg-blue-600 text-white rounded text-sm">Verify</button>
                                <div className="absolute mt-28">
                                  {timeLeft > 0 ? (
                                    <span className="text-sm ml-2">Resend available in {Math.floor(timeLeft / 60).toString().padStart(2, '0')}:{(timeLeft % 60).toString().padStart(2, '0')}</span>
                                  ) : (
                                    <Button variant={'outline'} onClick={() => resendVerification()} className="">Resend</Button>
                                  )}
                                </div>
                              </div>

                            </>
                          ) : (
                            <>
                              <button type="button" onClick={() => startVerification("phone", p.id)} className={`px-3 py-2 rounded text-sm ${p.verified ? 'bg-green-50 text-green-700 border' : 'bg-slate-100'}`}>
                                {p.verified ? 'Verified' : 'Verify'}
                              </button>
                              <button type="button" onClick={() => deletePhone(p.id)} className="px-3 py-2 bg-rose-600 text-white rounded text-sm">Delete</button>
                              <input type="checkbox" checked={p.primary} onChange={() => setPrimaryPhone(p.id)} title="Set primary" />
                            </>
                          )}
                        </div>
                      </div>
                    ))}
                    <div>
                      <button type="button" onClick={addPhone} className="text-sm text-primary underline">Add phone</button>
                    </div>
                  </div>

                  <div className="mt-4">
                    <h4 className="text-sm  mb-2">Emails</h4>
                    {emails.map((e) => (
                      <div key={e.id} className="mb-3">
                        <div className="flex items-center gap-3 mb-2 b border rounded-lg p-2">
                          <input value={e.value} onChange={(ev) => updateEmail(e.id, ev.target.value)} className="flex-1 rounded px-3 py-2 outline-none" />
                          {!e.verified && verifyTarget?.type === "email" && verifyTarget.id === e.id ? (
                            <div className="flex items-center relative gap-2">
                              <input
                                value={verifyCode}
                                onChange={(ev) => setVerifyCode(ev.target.value.replace(/\D/g, "").slice(0, 6))}
                                placeholder="000000"
                                className="w-32 rounded border px-3 py-2 text-center"
                              />
                              <button type="button" onClick={() => submitVerification()} className="px-3 py-2 bg-blue-600 text-white rounded text-sm">Verify</button>
                              <div className="absolute mt-28">
                                {timeLeft > 0 ? (
                                  <span className="text-sm ml-2">Resend available in {Math.floor(timeLeft / 60).toString().padStart(2, '0')}:{(timeLeft % 60).toString().padStart(2, '0')}</span>
                                ) : (
                                  <Button variant={'outline'} onClick={() => resendVerification()} className="">Resend</Button>
                                )}
                              </div>
                            </div>
                          ) : (
                            <>
                              <button type="button" onClick={() => startVerification("email", e.id)} className={`px-3 py-2 rounded text-sm ${e.verified ? 'bg-green-50 text-green-700 border' : 'bg-slate-100'}`}>
                                {e.verified ? 'Verified' : 'Verify'}
                              </button>
                              <button type="button" onClick={() => deleteEmail(e.id)} className="px-3 py-2 bg-rose-600 text-white rounded text-sm">Delete</button>
                              <input type="checkbox" checked={e.primary} onChange={() => setPrimaryEmail(e.id)} title="Set primary" />
                            </>
                          )}
                        </div>
                      </div>
                    ))}
                    <div>
                      <button type="button" onClick={addEmail} className="text-sm text-primary underline">Add email</button>
                    </div>
                  </div>

                  <div className="flex justify-end gap-3 pt-4">
                    <Button type="button" variant="outline" onClick={() => { setEditing(false); form.reset(); }}>Cancel</Button>
                    <Button type="submit" >Update</Button>
                  </div>
                </form>
              </Form>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

export default ProfilePageLayout