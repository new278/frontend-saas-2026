"use client";

import React, { useState } from "react";
import Modal from "@/src/components/ui/modal";
import { AlertTriangle, CheckCircle } from "lucide-react";
import { Button } from "@/src/components/ui/button";

const AccountDeleteLayout: React.FC = () => {
  const [password, setPassword] = useState("");
  const [showConfirm, setShowConfirm] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleStartDelete = () => {
    // require user to enter password before proceeding to final confirm
    if (!password) {
      // minimal UX: focus or early return — keep simple here
      return;
    }
    setShowConfirm(true);
  };

  const handleFinalDelete = () => {
    // Close confirm and show success modal (simulate async delete)
    setShowConfirm(false);
    // simulate server action then show success
    setTimeout(() => {
      setShowSuccess(true);
      setPassword("");
    }, 300);
  };

  return (
    <div className="flex justify-center my-5  px-4  items-center">
      <div className="md:w-1/3  w-full  mx-auto rounded border shadow p-6">
        <div className="p-8">
          <div className="flex flex-col  gap-6">
            <div className="flex justify-center items-center">
              <div className="h-12 w-12 rounded-full bg-amber-100 flex items-center justify-center">
                <AlertTriangle className="text-amber-600" />
              </div>
            </div>
            <div >
              <h3 className="text-xl font-semibold">Delete Account?</h3>
              <p className="text-sm text-muted-foreground mt-2">
                You are going to delete your account. Your account will be removed
                and all of your information from our database. This can&apos;t be undone.
              </p>

              <div className="mt-6">
                <label className="block text-sm font-medium mb-2">Enter your password to confirm</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full rounded-md border px-3 py-2 focus:outline-none  bg-white"
                />
              </div>

              <div className="mt-6 flex gap-3">
                <Button
                variant={'outline'}
                  onClick={() => setPassword("")}
                >
                  Cancel
                </Button>

                <button
                  type="button"
                  onClick={handleStartDelete}
                  className={`px-4 py-2 rounded-md cursor-pointer text-sm text-white bg-linear-to-br from-rose-600 to-pink-600 ${!password ? "opacity-60 cursor-not-allowed" : ""}`}
                  disabled={!password}
                >
                  Confirm Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Confirm modal */}
      <Modal
        isOpen={showConfirm}
        onClose={() => setShowConfirm(false)}
        title="Delete Account?"
        size="md"
      >
        <div className="space-y-4">
          <p>Are you sure about permanently deleting your account?</p>
          <div className="flex justify-end gap-3">
            <Button 
            variant={"outline"}
              onClick={() => setShowConfirm(false)}
            >
              No, Keep It
            </Button>
            <button
              className="px-4 py-2 rounded-md bg-linear-to-br from-rose-600 to-pink-600 text-white"
              onClick={handleFinalDelete}
            >
              Yes, Delete!
            </button>
          </div>
        </div>
      </Modal>

      {/* Success modal */}
      <Modal isOpen={showSuccess} onClose={() => setShowSuccess(false)} title="Account deletion successful?" size="sm">
        <div className="flex flex-col items-center gap-4 text-center">
          <div className="p-3 rounded-full bg-green-50">
            <CheckCircle className="text-green-600" />
          </div>
          <h4 className="font-semibold">Account deletion successful?</h4>
          <p className="text-sm text-muted-foreground">The account will be completely deleted within 45 days.</p>
          <Button
            onClick={() => setShowSuccess(false)}
          >
            Done
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default AccountDeleteLayout;