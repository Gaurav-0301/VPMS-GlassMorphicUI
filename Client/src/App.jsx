import React, { lazy, Suspense } from 'react'
import { Toaster } from 'react-hot-toast';
import { Route, Routes, Navigate } from 'react-router-dom'

// Lazy load ALL pages
const Book = lazy(() => import('./Pages/Book'))
const Status = lazy(() => import('./Pages/Status'))
const User = lazy(() => import('./Dashboards/User'))
const Admin = lazy(() => import('./Dashboards/Admin'))
const Host = lazy(() => import('./Dashboards/Host'))
const Security = lazy(() => import('./Dashboards/Security'))
const LoginPage = lazy(() => import('./Pages/LoginPage'))

// Keep this normal (small component)
import ProtectedRoute from './Components/ProtectedRoutes' 

const App = () => {
  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />

      {/* 🔥 Suspense wrapper for all routes */}
      <Suspense fallback={
        <div className="h-screen flex items-center justify-center text-lg font-semibold">
          Loading...
        </div>
      }>
        <Routes>

          {/* Public Routes */}
          <Route path="/" element={<User />} />
          <Route path="/book" element={<Book />} />
          <Route path="/status" element={<Status />} />
          <Route path="/login" element={<LoginPage />} />

          {/* Protected Routes */}
          <Route 
            path="/admin" 
            element={
              <ProtectedRoute allowedRole="Admin">
                <Admin />
              </ProtectedRoute>
            } 
          />
          
          <Route 
            path="/host" 
            element={
              <ProtectedRoute allowedRole="Host">
                <Host />
              </ProtectedRoute>
            } 
          />
          
          <Route 
            path="/security" 
            element={
              <ProtectedRoute allowedRole="Security">
                <Security />
              </ProtectedRoute>
            } 
          />

          {/* Catch-all */}
          <Route path="*" element={<Navigate to="/" />} />

        </Routes>
      </Suspense>
    </>
  )
}

export default App;