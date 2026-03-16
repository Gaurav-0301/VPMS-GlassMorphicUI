import React from 'react'
import { Route, Routes } from 'react-router-dom'

import Book  from './Pages/Book'
import Status from './Pages/Status'
import User from './Dashboards/User'
import Admin from './Dashboards/Admin'
import Host from './Dashboards/Host'
import Security from './Dashboards/Security'

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<User />} />
        <Route path="/book" element={<Book />} />
         <Route path="/status" element={<Status/>} />
         <Route path="/admin" element={<Admin />} />
         <Route path="/host" element={<Host />} />
         <Route path="/security" element={<Security />} />
      </Routes>
    </>
  )
}

export default App