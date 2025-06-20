// import React from 'react'
// import './Footer.css'
// import InstagramIcon from '@mui/icons-material/Instagram';
// import FacebookRoundedIcon from '@mui/icons-material/FacebookRounded';
// import LinkedInIcon from '@mui/icons-material/LinkedIn';
// import TwitterIcon from '@mui/icons-material/Twitter';
// import YouTubeIcon from '@mui/icons-material/YouTube';
// import img from '../images/freelance_logo.jpg';
// const Footer = () => {
//   return (
//     <>
//         <footer className="footer">
//       <div className="footer-container">
//         <div className="footer-column">
//           {/* <h2  >Freelancer</h2> */}
//           <img src={img} style={{marginBottom:"40px"}}/>
//           <ul>
//             <li>🌐 India / English</li>
//             <li>❓ Help & Support</li>
//             <li>♿ Accessibility</li>
//           </ul>
//         </div>
//         <div className="footer-column">
//           <h3 >Freelancer</h3>
//           <ul>
//             <li>Categories</li>
//             <li>Projects</li>
//             <li>Contests</li>
//             <li>Freelancers</li>
//             <li>Enterprise</li>
//             <li>Innovation Challenges</li>
//             <li>AI Development</li>
//             <li>Preferred Freelancer</li>
//             <li>Project Management</li>
//             <li>Local Jobs</li>
//             <li>Photo Anywhere</li>
//             <li>Showcase</li>
//             <li>API for Developers</li>
//             <li>Get Verified</li>
//             <li>Desktop App</li>
//           </ul>
//         </div>

        
//         <div className="footer-column">
//           <h3 >About</h3>
//           <ul>
//             <li>About us</li>
//             <li>How it Works</li>
//             <li>Security</li>
//             <li>Investor</li>
//             <li>Sitemap</li>
//             <li>Stories</li>
//             <li>News</li>
//             <li>Team</li>
//             <li>Awards</li>
//             <li>Press Releases</li>
//             <li>Careers</li>
//           </ul>
//         </div>
//         <div className="footer-column">
//           <h3 >Terms</h3>
//           <ul>
//             <li>Privacy Policy</li>
//             <li>Terms and Conditions</li>
//             <li>Copyright Policy</li>
//             <li>Code of Conduct</li>
//             <li>Fees and Charges</li>
//           </ul>
//         </div>

      
//         {/* <div className="footer-column">
//           <h3 style={{fontSize:"30px"}}>Partners</h3>
//           <ul>
//             <li>Escrow.com</li>
//             <li>Loadshift</li>
//             <li>Warrior Forum</li>
//           </ul>
//         </div> */}

        
//         </div>
//       <div className="footer-column text-center">
//       <h1 style={{color:"#3fa9f5",marginTop:"30px"}}>Follow Us on</h1>
//                 <div className='hl'>
//                 <FacebookRoundedIcon sx={{color:'#0047AB',fontSize:"39px"}} className='fa'/>
//                 <InstagramIcon sx={{color:'#c13584',fontSize:"39px"}} className='fa'/>
//                 <LinkedInIcon sx={{color:'#0CAFFF',fontSize:"39px"}} className='fa'/>
//                 <TwitterIcon sx={{color:'Aqua',fontSize:"39px"}} className='fa'/>
//                 <YouTubeIcon sx={{color:'red',fontSize:"39px"}} className='fa'/>
//             </div>
//             </div>
//     </footer>
//     </>
//   )
// }

// export default Footer


import React from 'react'
import './Footer.css'
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/FacebookRounded';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';
import YouTubeIcon from '@mui/icons-material/YouTube';
import { Instagram, Facebook, LinkedIn, Twitter, YouTube } from '@mui/icons-material';
import img from '../images/sb_works.jpg';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-wave"></div>
      
      <div className="footer-container">
        {/* Column 1 - Logo and Basic Info */}
        <div className="footer-column logo-column">
          <img src={img} alt="Freelancer Logo" className="footer-logo"/>
          <p className="footer-description">Connecting businesses with top freelance talent worldwide</p>
          
          <div className="language-selector">
            <span>🌐</span>
            <select>
              <option>India / English</option>
              <option>United States / English</option>
              <option>Europe / English</option>
            </select>
          </div>
          
          <div className="footer-contact">
            <p>❓ Help & Support</p>
            <p>♿ Accessibility</p>
          </div>
        </div>

        {/* Column 2 - Freelancer Links */}
        <div className="footer-column">
          <h3>Freelancer</h3>
          <ul>
            {['Categories', 'Projects', 'Contests', 'Freelancers', 'Enterprise', 
              'Innovation Challenges', 'AI Development', 'Preferred Freelancer'].map((item) => (
              <li key={item}><a href="#">{item}</a></li>
            ))}
          </ul>
        </div>

        {/* Column 3 - About Links */}
        <div className="footer-column">
          <h3>About</h3>
          <ul>
            {['About us', 'How it Works', 'Security', 'Investor', 'Sitemap', 
              'Stories', 'News', 'Team'].map((item) => (
              <li key={item}><a href="#">{item}</a></li>
            ))}
          </ul>
        </div>

        {/* Column 4 - Terms Links */}
        <div className="footer-column">
          <h3>Terms</h3>
          <ul>
            {['Privacy Policy', 'Terms and Conditions', 'Copyright Policy', 
              'Code of Conduct', 'Fees and Charges'].map((item) => (
              <li key={item}><a href="#">{item}</a></li>
            ))}
          </ul>
        </div>
      </div>

      {/* Social Media Section */}
      <div className="social-icons-container">
  <h3>Connect With Us</h3>
  <div className="social-icons">
    <a href="#" aria-label="Facebook">
      <FacebookIcon className="social-icon facebook" />
    </a>
    <a href="#" aria-label="Instagram">
      <InstagramIcon className="social-icon instagram" />
    </a>
    <a href="#" aria-label="LinkedIn">
      <LinkedInIcon className="social-icon linkedin" />
    </a>
    <a href="#" aria-label="Twitter">
      <TwitterIcon className="social-icon twitter" />
    </a>
    <a href="#" aria-label="YouTube">
      <YouTubeIcon className="social-icon youtube" />
    </a>
  </div>
</div>
    </footer>
  )
}

export default Footer