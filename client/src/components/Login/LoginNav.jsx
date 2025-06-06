import React from 'react'
import Box from '@mui/material/Box';
import logo from "../images/freelance_logo.jpg"
import './LoginNav.css'
const LoginNav = () => {
  return (
    <>
        <nav className='mainnav bg-zink-500/10'>
<img src={logo} alt='logo' className='logo'/>
<div className='nav-tabs'>
<a href='#' className='ab'>About</a>
<a href='#' className='ab'>Find Freelancer</a>
<a href='#' className='ab'>Find job</a>
</div>
<div className='mainnav1'>
    <a href='/Login' className='lo' ><button  className='go1'>Log In</button></a>  
    <a href='/Signup' className='lo'><button  className='go2'>Sign Up</button></a>
</div>
        </nav>
    </>
  )
}

export default LoginNav