import React from 'react'
import './Jobportal.css'
const Jobportal = () => {
  return (
    <>
       <div className='portal_container'>
       <div className='search_bar'>
        <input type='text' placeholder='Search for jobs'
        
         className='max-sm:text-xs p-2 rounded outline-none w-full'/>
        <input type='text' placeholder='Search for location'
     
         className='max-sm:text-xs p-2 rounded outline-none w-full'/>
        <button >Search</button>
       </div>
        <div className='sidebar'>
            <h1>Filters</h1>
                 
            <h2 style={{color:"skyblue"}}>By Skills</h2>
            <div className='filt'>
            <input type='checkbox' style={{border:"3px solid black",width:"20px",marginRight:"30px"}}/>
            <h3>Frontend Developer</h3>
            </div>
            <div className='filt'>
            <input type='checkbox' style={{border:"3px solid black",width:"20px",marginRight:"30px"}}/>
            <h3>Backend Developer</h3>
            </div>
            <div className='filt'>
            <input type='checkbox' style={{border:"3px solid black",width:"20px",marginRight:"30px"}}/>
            <h3>Fullstack Developer</h3>
            </div>
            <div className='filt'>
            <input type='checkbox' style={{border:"3px solid black",width:"20px",marginRight:"30px"}}/>
            <h3>Data Analyst</h3>
            </div>
            <div className='filt'>
            <input type='checkbox' style={{border:"3px solid black",width:"20px",marginRight:"30px"}}/>
            <h3>Graphic Designer</h3>
            </div>
            <div className='filt'>
            <input type='checkbox' style={{border:"3px solid black",width:"20px",marginRight:"30px"}}/>
            <h3>Photographer</h3>
            </div>
            <div className='filt'>
            <input type='checkbox' style={{border:"3px solid black",width:"20px",marginRight:"30px"}}/>
            <h3>Video Editing</h3>
            </div>
            <div className='filt'>
            <input type='checkbox' style={{border:"3px solid black",width:"20px",marginRight:"30px"}}/>
            <h3>Social Media Management</h3>
            </div>
            <div className='filt'>
            <input type='checkbox' style={{border:"3px solid black",width:"20px",marginRight:"30px"}}/>
            <h3>Financial Advisor</h3>
            </div>
            <div className='filt'>
            <input type='checkbox' style={{border:"3px solid black",width:"20px",marginRight:"30px"}}/>
            <h3>Online Tutor</h3>
            </div>
            <h2 style={{color:"skyblue"}}>Location</h2>
            <div className='filt'>
            <input type='checkbox' style={{border:"3px solid black",width:"20px",marginRight:"30px"}}/>
            <h3>Delhi</h3>
            </div>
            <div className='filt'>
            <input type='checkbox' style={{border:"3px solid black",width:"20px",marginRight:"30px"}}/>
            <h3>Mumbai</h3>
            </div>
            <div className='filt'>
            <input type='checkbox' style={{border:"3px solid black",width:"20px",marginRight:"30px"}}/>
            <h3>Hyderabad</h3>
            </div>
            <div className='filt'>
            <input type='checkbox' style={{border:"3px solid black",width:"20px",marginRight:"30px"}}/>
            <h3>Bangalore</h3>
            </div>
            <div className='filt'>
            <input type='checkbox' style={{border:"3px solid black",width:"20px",marginRight:"30px"}}/>
            <h3>Chennai</h3>
            </div>
            <div className='filt'>
            <input type='checkbox' style={{border:"3px solid black",width:"20px",marginRight:"30px"}}/>
            <h3>Kolkata</h3>
            </div>
            <div className='filt'>
            <input type='checkbox' style={{border:"3px solid black",width:"20px",marginRight:"30px"}}/>
            <h3>Punjab</h3>
            </div>
            <div className='filt'>
            <input type='checkbox' style={{border:"3px solid black",width:"20px",marginRight:"30px"}}/>
            <h3>Maharastra</h3>
            </div>
            <div className='filt'>
            <input type='checkbox' style={{border:"3px solid black",width:"20px",marginRight:"30px"}}/>
            <h3>Assam</h3>
            </div>
        </div>

       </div> 
    </>
  )
}

export default Jobportal