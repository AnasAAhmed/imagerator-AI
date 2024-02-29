import MobNav from '@/components/shared/MobNav'
import Sidebar from '@/components/shared/Sidebar'
import React from 'react'
import { Toaster } from "@/components/ui/toaster";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="root">
      <Sidebar />
      <MobNav />
      <div className="root-container">
        <div className="wrapper">
          {children}
        </div>
      </div>
      <Toaster/>
    </main>
  )
}

export default Layout

