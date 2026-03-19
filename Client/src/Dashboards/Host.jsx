import React, { lazy, Suspense } from 'react'

// Lazy imports
const HostPage = lazy(() => import('../Pages/HostPage'))
const Navbar = lazy(() => import('../Components/Navbar'))
const Footer = lazy(() => import('../Components/Footer'))

const Host = () => {
  return (
    <Suspense fallback={<div className="p-10 text-center">Loading...</div>}>
      <Navbar opt1={"Host"} link1={"/host"} />
      <HostPage />
      <Footer opt1={"Host"} link1={"/host"} />
    </Suspense>
  )
}

export default Host