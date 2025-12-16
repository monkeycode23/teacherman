


import React from 'react'
import {Toaster} from 'sonner'
import { Outlet } from 'react-router'

import Sidebar from '../../components/sidebar'

export default function GeneralLayout({children}:any) {
  
  return (
    <div className='flex h-screen bg-gray-50'>
      <Sidebar></Sidebar>
    <main className="flex-1 overflow-auto">
      {children}
    </main>
        <Toaster richColors position="top-right" />
    </div>
  )
}
