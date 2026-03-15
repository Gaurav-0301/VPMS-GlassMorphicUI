import React from 'react'
import Navbar from '../Components/Navbar'
import Footer from '../Components/Footer'
import Analysis from '../Sections/Analysis'

const AdminPannel = () => {
  return (
    <>
      <Navbar opt1={"AdminPannel"} opt2={"Host"} opt3={"SecurityTerminal"} link1={"/adminpannel"} link2={"/host"} link3={"/securityterminal"}/>
      <Analysis/>
      <Footer/>
    </>
  )
}

export default AdminPannel
