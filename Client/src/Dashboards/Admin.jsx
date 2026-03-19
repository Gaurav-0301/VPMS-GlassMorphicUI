import React, { lazy, Suspense } from 'react'

// Lazy load Admin Panel
const AdminPannel = lazy(() => import('../Pages/AdminPannel'))

const Admin = () => {
  return (
    <Suspense fallback={
      <div className="p-10 text-center font-semibold">
        Loading Admin Panel...
      </div>
    }>
      <AdminPannel />
    </Suspense>
  )
}

export default Admin