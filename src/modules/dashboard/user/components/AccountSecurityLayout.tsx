"use client"

import React, { useState } from "react"
import { ShieldCheck, ShieldOff } from "lucide-react"
import Modal from "@/src/components/ui/modal"
import { Button } from "@/src/components/ui/button"

const AccountSecurityLayout: React.FC<{ basePath?: string }> = () => {
  const [enabled, setEnabled] = useState(true)
  const [saving, setSaving] = useState(false)
  const method = "abc@gmail.com"

  const [modalAction, setModalAction] = useState<"on" | "off" | null>(null)

  const openConfirm = (action: "on" | "off") => {
    setModalAction(action)
  }

  const doTurnOff = async () => {
    setSaving(true)
    // Simulate API call
    await new Promise((r) => setTimeout(r, 700))
    setEnabled(false)
    setSaving(false)
    setModalAction(null)
  }

  const doTurnOn = async () => {
    setSaving(true)
    // Simulate API call
    await new Promise((r) => setTimeout(r, 500))
    setEnabled(true)
    setSaving(false)
    setModalAction(null)
  }

  return (
    <div className="flex justify-center px-4 my-5 ">
      <div className="w-full md:w-1/3 mx-auto">
        <div className="bg-base-100 rounded-2xl shadow border p-8 text-center">
          <div className="mx-auto w-20 h-20 rounded-full bg-linear-to-br from-sky-50 to-cyan-50 flex items-center justify-center shadow-inner mb-4">
            {enabled ? (
              <ShieldCheck className="w-10 h-10 text-sky-600" />
            ) : (
              <ShieldOff className="w-10 h-10 text-slate-400" />
            )}
          </div>

          <h3 className="text-lg font-semibold">Two‑Factor Authentication</h3>
          <p className="text-sm text-slate-500 mt-2 mb-6">Select the phone number or email you want to verify the OTP on</p>

          <div className="flex flex-col items-center gap-3">
            <div className="w-full">
              <label className="block text-xs text-slate-400 mb-1">Selected method</label>
              <div className="w-full bg-slate-50 border rounded-md px-3 py-2 text-sm text-slate-700 text-left">{method}</div>
            </div>

            <div className="w-full flex items-center justify-between gap-3 mt-3">
              <div className="text-sm text-slate-600">{enabled ? 'Disable 2FA' : 'Enable 2FA'}</div>
              <div className="flex items-center gap-2">
                <Button
                  variant={enabled ? "outline" : "default"}
                  onClick={() => openConfirm('off')}
                >
                  OFF
                </Button>

                <Button
                  variant={enabled ? "default" : "outline"}
                  onClick={() => openConfirm('on')}
                >
                  ON
                </Button>
              </div>
            </div>

            <p className="text-xs text-slate-500 mt-4">Turning off 2‑step verification will remove the extra security on your account.</p>
          </div>
        </div>
      </div>

      <Modal isOpen={modalAction !== null} onClose={() => setModalAction(null)} title={modalAction === 'off' ? 'Turn off 2‑step Verification' : 'Enable 2‑step Verification'} size="sm">
        <div className="text-sm text-slate-700 mb-4">
          {modalAction === 'off' ? (
            <>Turning off 2‑step verification will remove the extra security on your account. Are you sure you want to continue?</>
          ) : (
            <>Enabling 2‑step verification will add an extra layer of security to your account. Do you want to enable it now?</>
          )}
        </div>
        <div className="flex justify-end gap-3">
          <Button variant="outline" onClick={() => setModalAction(null)}>Cancel</Button>
          {modalAction === 'off' ? (
            <Button className="bg-rose-600 text-white" onClick={doTurnOff} disabled={saving}>{saving ? 'Turning off...' : 'Turn off'}</Button>
          ) : (
            <Button  onClick={doTurnOn} disabled={saving}>{saving ? 'Turning on...' : 'Turn on'}</Button>
          )}
        </div>
      </Modal>
    </div>
  )
}

export default AccountSecurityLayout