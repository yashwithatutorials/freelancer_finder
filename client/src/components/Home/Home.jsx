import React,{useState} from 'react'
import './Home.css'
import backgroundvideo from '../images/freelancer_video.mp4'
import About from './About'
import Domains from './Domains'
const Home = () => {
  const [activeTab, setActiveTab] = useState('browse');

  const content = {
    browse: {
      text: 'Build your freelancing career on fli freelance, with \nthousands of jobs posted every week.',
      button: 'Explore recently posted jobs',
    },
    talent: {
      text: 'Find top-rated freelancers and agencies for your projects — fast and easy.',
      button: 'Find talent now',
    },
  };
  return (
    <>
        <div className='video-wrapper'>
            <video autoPlay loop muted className='background-video'>
                <source src={backgroundvideo} type='video/mp4'/>
            </video>
            <div className='text-overlay'>
              
              <h1 style={{fontSize:"48px"}}>A Successful Freelancer-Client Relationship is Built on <span style={{color:"rgb(8, 186, 8)",fontSize:"50px"}}>Trust, Communication, and Mutual Respect</span>.</h1>
       <div className="hero-container">
      <div className="hero-card">
        <div className="toggle-tabs">
         <div className={`slider ${activeTab === 'talent' ? 'left' : 'right'}`} />
        <div className='mainbtn'>
          <button
            className={`toggle-btn ${activeTab === 'talent' ? 'active' : ''}`}
            onClick={() => setActiveTab('talent')}
          >
            Find talent
          </button>
          <button
            className={`toggle-btn ${activeTab === 'browse' ? 'active' : ''}`}
            onClick={() => setActiveTab('browse')}
          >
            Browse jobs
          </button>
          </div>
        </div>
         <div className="fade-in">
        <p className="hero-text">
          {content[activeTab].text.split('\n').map((line, i) => (
            <span key={i}>
              {line}
              <br />
            </span>
          ))}
        </p>
        <button className="cta-button">{content[activeTab].button}</button>
      </div>
      </div>
    </div>
            </div>

        </div>
        <About id="about-section" />
        <Domains id="domain-section"/>
        
    </>
  )
}

export default Home