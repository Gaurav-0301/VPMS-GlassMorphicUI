import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = (props) => {
  return (
    <>
      <div className="navbar bg-white text-black shadow-sm">
  <div className="navbar-start">
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
      </div>
      <ul
        tabIndex="-1"
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
        <Link to={props.link1}>{props.opt1}</Link>
        <Link to={props.link2}>{props.opt2}</Link>
        <Link to={props.link3}>{props.opt3}</Link>
      </ul>
    </div>
    <a className="btn btn-ghost text-xl">GateKeeper</a>
  </div>
  <div className=" font-semibold navbar-center hidden lg:flex">
  <ul className="menu menu-horizontal flex items-center gap-8 px-5">
    <li>
      <Link to={props.link1}>{props.opt1}</Link>
    </li>

    <li>
     <Link to={props.link2}>{props.opt2}</Link>
    </li>

    <li>
      <Link to={props.link3}>{props.opt3}</Link>
    </li>
  </ul>
</div>
  <div className="navbar-end pr-10">
    <a className="btn">Button</a>
  </div>
</div>
    </>
  )
}

export default Navbar
