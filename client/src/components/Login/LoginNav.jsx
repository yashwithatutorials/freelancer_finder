
import React, { useState,useEffect } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import logo from "../images/freelance_logo.jpg";
import './LoginNav.css';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
const LoginNav = () => {
  const [menuOpen, setMenuOpen] = useState(false);
 const [user, setUser] = useState(null);
  const [showProfile, setShowProfile] = useState(false);
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
    //    const parsedUser = JSON.parse(storedUser);
    // console.log("Loaded user:", parsedUser);
      setUser(JSON.parse(storedUser));
    }
  }, []);
   const logout = () => {
    localStorage.removeItem("user");
    window.location.href = '/'; 

  };
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <>
      <nav className='mainnav '>
        <img src={logo} alt='logo' className='logo' />
        <div className='bar' onClick={toggleMenu}>
          <MenuIcon style={{ fontSize: "50px" }} />
        </div>
        <div className={`cont ${menuOpen ? 'show' : ''}`}>
          <div className='nav-tab'>
          <a href='/Home' className='ab'>Home</a>
            <a href='#about-section' className='ab'>About</a>
             {!user && (
    <>
      <a href='/freelancer_finder' className='ab'>Find Freelancer</a>
      <a href='/jobportal' className='ab'>Find Job</a>
    </>
  )}
          {user?.role==='client' &&  (<><a href='/freelancer_finder' className='ab'>Find Freelancer</a>
          <a href='/jobdetails' className='ab'>Job Details</a></>
          )}
          {user?.role==='freelancer' &&    (<a href='/jobportal' className='ab'>Find job</a>)}
          </div>
 {user ? (
            <div
              className="profile-wrapper"
              onClick={()=>setShowProfile(!showProfile)}>
              <div className='pro'>
              {/* <AccountCircleIcon style={{ fontSize: "50px", color: "white" }} /> */}
            <img 
 src={
  user?.profileImage
    ? (user.profileImage.startsWith('http') ? user.profileImage : `http://localhost:8080/uploads/${user.profileImage}`)
    : '/default-profile.png'
}

  alt="Profile"
  style={{borderRadius:"50%",height:"60px",width:"60px"}}
/>

               <h3 style={{color:"white",textAlign:"center"}}>{user.name}</h3>
               </div>
              {showProfile && (
                <div className="profile-dropdown">
                  {/* <p><strong>{user.name}</strong></p> */}
                  <div className='text-center' style={{padding:"10px"}}>
                  <button className='view'><a href='/ViewProfile' style={{textDecoration:"none",color:"white",fontWeight:"700"}}>View Profile</a></button>
                  <button onClick={logout} className="logout-btn">Logout</button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className='mainnav1'>
              <a href='/Login' className='lo'><button className='go1'>Log In</button></a>
              <a href='/Signup' className='lo'><button className='go2'>Sign Up</button></a>
            </div>
          )}
         
        </div>
      </nav>
    </>
  );
};

export default LoginNav;
