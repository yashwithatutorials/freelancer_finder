
import React from 'react'
import Sidebar from './Sidebar'
import TopSearch from './TopSearch'
import FreelancerList from './FreelancerList'
import './Freelancer_finder.css'
const Freelance_finder = () => {
  return (
    <>
       <div className='freelancer_find'> 
        <TopSearch/>
        {/* <Sidebar/> */}
        {/* <ClientList/> */}
        <FreelancerList/>
        </div>
    </>
  )
}

export default Freelance_finder