
import React, { useEffect, useState, useCallback } from 'react';
import Sidebar from './Sidebar';
import '../find_job/ClientList.css';        

const FreelancerList = () => {
 
  const [freelancers, setFreelancers] = useState([]);
  const [filters, setFilters] = useState({ skills: [], locations: [] });

  
  const fetchFreelancers = useCallback(async () => {
    try {
      const res  = await fetch('http://localhost:8080/api/freelancers'); 
      const data = await res.json();

      if (Array.isArray(data)) {
        let results = data;
        if (filters.skills.length) {
          results = results.filter(f =>
            f.skills?.some(s => filters.skills.includes(s))
          );
        }
        if (filters.locations.length) {
          results = results.filter(f =>
            filters.locations.includes(f.location)
          );
        }

        setFreelancers(results);
      }
    } catch (err) {
      console.error('Error fetching freelancers:', err);
    }
  }, [filters]);
  useEffect(() => {
    fetchFreelancers();
  }, [fetchFreelancers]);
  return (
    <div className="job_page">
      <Sidebar onFilterChange={setFilters} />

      <div className="job_listings">
        <h2>Available Freelancers</h2>
        <p>Find talent for your next project</p>

        <div className="job_cards">
          {freelancers.map((f, idx) => (
            <div key={idx} className="job_card">
              <img
                src={f.profileImage || '/default-avatar.png'}
                alt="avatar"
                className="job_logo"
              />
              <h3>{f.name}</h3>
              <div className="job_tags">
                <span>{f.location}</span>
                {f.skills?.length && <span>{f.skills[0]}</span>}
                
              </div>
              <span>Experience:{f.experience} year</span>
              {/* <p>{f.bio?.slice(0, 150)}...</p> */}

              <div className="job_buttons">
                <button>Contact</button>
                <button className="secondary">View profile</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FreelancerList;
