import React, { lazy, Suspense } from 'react'
import Navbar from '../Components/Navbar'
import Footer from '../Components/Footer'

// Lazy load heavy component
const SecurityTerminal = lazy(() => import('../Components/SecurityTerminal'))

const Security = () => {
  return (
    <>
      <Navbar />

      <Suspense fallback={
        <div className="p-10 text-center font-semibold">
          Loading Security Terminal...
        </div>
      }>
        <SecurityTerminal />
      </Suspense>

      <Footer />
    </>
  )
}

export default Security