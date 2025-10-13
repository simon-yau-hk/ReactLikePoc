// app/dashboard/page.tsx
'use client'
import ProtectedRoute from '@/components/ProtectRoute'

export default function DashboardPage({children}: {children: React.ReactNode}) {
  return (
    <ProtectedRoute>
     {children}
    </ProtectedRoute>
  )
}