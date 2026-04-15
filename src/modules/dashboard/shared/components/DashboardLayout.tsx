"use client"
import type React from "react"
import { useState } from "react"
import { SidebarResponsive as Sidebar } from "./sidebarResponsive"
import AccountSidebarChildren from "./AccountSidebarChildren"
import Header from "@/src/modules/shared/header"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [sidebarOpen, setSidebarOpen] = useState(true)


  return (
    <div className="min-h-screen bg-base-100">
      <Header />

      {/* Main Content Area */}
      <div className="flex h-[calc(100vh-85px)] ">

        {/* Sidebar */}
        <Sidebar isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)}>
          <AccountSidebarChildren onToggle={() => setSidebarOpen(!sidebarOpen)} isOpen={sidebarOpen} />
        </Sidebar>

        <main className="flex-1 h-full overflow-auto  mx-4 md:mx-8">

          <div className="p-4 pb-20 min-w-fit">{children}</div>
        </main>
      </div>
    </div>
  )
}
