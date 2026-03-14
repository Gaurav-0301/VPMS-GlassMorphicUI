import React from 'react'
import { Route, Routes } from 'react-router-dom'
import UserHome from './Pages/UserHome'

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<UserHome />} />
      </Routes>
    </>
  )
}

export default App