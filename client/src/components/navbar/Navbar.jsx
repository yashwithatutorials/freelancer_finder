import React from 'react'
import Box from '@mui/material/Box';
import logo from "../images/freelancer_logo.jpg";
import './Navbar.css'
const Navbar = () => {
  return (
    <>
        <nav className='mainnav bg-zink-500/10'>
<img src={logo} alt='logo' />
<div className='mainnav1'>
    <a href='/Login' className='lo' ><h2>Log In</h2></a>  
    <a href='/Signup' className='lo'><h2>Sign Up</h2></a>
</div>
        </nav>
    </>
  )
}

export default Navbar