
import React, { useState,useEffect } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import logo from "../images/sb_works.jpg";
import './LoginNav.css';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
const LoginNav = () => {
  const [menuOpen, setMenuOpen] = useState(false);
 const [user, setUser] = useState(null);
  const [showProfile, setShowProfile] = useState(false);
   const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);
  const showNotification = (message, success) => {
    setPopupMessage(message);
    setIsSuccess(success);
    setShowPopup(true);
    setTimeout(() => {
      setShowPopup(false);
    }, 3000);
  };

   const logout = () => {
    localStorage.removeItem("user");
    window.location.href = '/'; 
     showNotification("Logged out successfully!", true);
    setTimeout(() => {
      window.location.href = '/';
    }, 1000);

  };
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <>
    {showPopup && (
        <div className={`popup-notification ${isSuccess ? 'success' : 'error'}`}>
          {popupMessage}
        </div>
      )}
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
      <a href='/Login' className='ab'>Find Freelancer</a>
      <a href='/Login' className='ab'>Find Job</a>
    </>
  )}
          {user?.role==='client' &&  (<><a href='/freelancer_finder' className='ab'>Find Freelancer</a>
          <a href='/jobdetails' className='ab'>Job Details</a></>
          )}
          {user?.role==='freelancer' &&    (
            <>
            
            <a href='/jobportal' className='ab'>Find job</a>
             <a href='/appliedjobs' className='ab'>Applied Jobs</a>
            </>)}
          </div>
 {user ? (
            <div
              className="profile-wrapper"
              onClick={()=>setShowProfile(!showProfile)}>
              <div className='pro'>
             
            <img 
 src={
  user?.profileImage
    ? (user.profileImage.startsWith('http') ? user.profileImage : `https://freelancer-finder.onrender.com/uploads/${user.profileImage}`)
    : '/default-profile.png'
}

  alt="Profile"
  style={{borderRadius:"50%",height:"60px",width:"60px"}}
/>

               <h3 style={{color:"white",textAlign:"center"}}>{user.name}</h3>
               </div>
              {showProfile && (
                <div className="profile-dropdown">
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
