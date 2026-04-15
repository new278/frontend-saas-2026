"use client"
import type React from "react"
import { useState } from "react"
import { SidebarResponsive as Sidebar } from "./sidebarResponsive"
import { TopBar } from "./top-bar"
import AccountSidebarChildren from "./AccountSidebarChildren"
import Header from "@/src/modules/shared/header"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [sidebarOpen, setSidebarOpen] = useState(true)

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)}>
        <AccountSidebarChildren onToggle={() => setSidebarOpen(!sidebarOpen)} isOpen={sidebarOpen} />
      </Sidebar>
    

        {/* Main Content Area */}
      <div>
          <Header/>
          <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  )
}
