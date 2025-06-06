import React from 'react'
import './Footer.css'
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookRoundedIcon from '@mui/icons-material/FacebookRounded';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';
import YouTubeIcon from '@mui/icons-material/YouTube';
const Footer = () => {
  return (
    <>
        <footer className="footer">
      <div className="footer-container">
        <div className="footer-column">
          <h2 className="logo" >Freelancer</h2>
          <ul>
            <li>🌐 India / English</li>
            <li>❓ Help & Support</li>
            <li>♿ Accessibility</li>
          </ul>
        </div>
        <div className="footer-column">
          <h3 >Freelancer</h3>
          <ul>
            <li>Categories</li>
            <li>Projects</li>
            <li>Contests</li>
            <li>Freelancers</li>
            <li>Enterprise</li>
            <li>Innovation Challenges</li>
            <li>AI Development</li>
            <li>Preferred Freelancer</li>
            <li>Project Management</li>
            <li>Local Jobs</li>
            <li>Photo Anywhere</li>
            <li>Showcase</li>
            <li>API for Developers</li>
            <li>Get Verified</li>
            <li>Desktop App</li>
          </ul>
        </div>

        
        <div className="footer-column">
          <h3 >About</h3>
          <ul>
            <li>About us</li>
            <li>How it Works</li>
            <li>Security</li>
            <li>Investor</li>
            <li>Sitemap</li>
            <li>Stories</li>
            <li>News</li>
            <li>Team</li>
            <li>Awards</li>
            <li>Press Releases</li>
            <li>Careers</li>
          </ul>
        </div>
        <div className="footer-column">
          <h3 >Terms</h3>
          <ul>
            <li>Privacy Policy</li>
            <li>Terms and Conditions</li>
            <li>Copyright Policy</li>
            <li>Code of Conduct</li>
            <li>Fees and Charges</li>
          </ul>
        </div>

      
        {/* <div className="footer-column">
          <h3 style={{fontSize:"30px"}}>Partners</h3>
          <ul>
            <li>Escrow.com</li>
            <li>Loadshift</li>
            <li>Warrior Forum</li>
          </ul>
        </div> */}

        
        </div>
      <div className="footer-column text-center">
      <h1 style={{color:"#3fa9f5",marginTop:"30px"}}>Follow Us on</h1>
                <div className='hl'>
                <FacebookRoundedIcon sx={{color:'#0047AB',fontSize:"39px"}} className='fa'/>
                <InstagramIcon sx={{color:'#c13584',fontSize:"39px"}} className='fa'/>
                <LinkedInIcon sx={{color:'#0CAFFF',fontSize:"39px"}} className='fa'/>
                <TwitterIcon sx={{color:'Aqua',fontSize:"39px"}} className='fa'/>
                <YouTubeIcon sx={{color:'red',fontSize:"39px"}} className='fa'/>
            </div>
            </div>
    </footer>
    </>
  )
}

export default Footer