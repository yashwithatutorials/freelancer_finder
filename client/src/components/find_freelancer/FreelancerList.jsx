import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar     from './Sidebar';
import TopSearch   from './TopSearch';
import '../find_job/ClientList.css';

export default function FreelancerList() {
  const navigate = useNavigate();
  const [allFreelancers, setAllFreelancers] = useState([]); 
  const [filters, setFilters] = useState({ skills: [], locations: [] });
  const [query,   setQuery]   = useState('');               
  useEffect(() => {
    (async () => {
      try {
        const res  = await fetch('https://freelancer-finder.onrender.com/api/freelancers');
        const data = await res.json();
        if (Array.isArray(data)) setAllFreelancers(data);
      } catch (err) {
        console.error('Error fetching freelancers:', err);
      }
    })();
  }, []);
  const visible = useMemo(() => {
    let list = [...allFreelancers];

    if (filters.skills.length) {
      list = list.filter(f => f.skills?.some(s => filters.skills.includes(s)));
    }
    if (filters.locations.length) {
      list = list.filter(f => filters.locations.includes(f.location));
    }
    if (query) {
      const q = query.toLowerCase();
      list = list.filter(f => f.name.toLowerCase().includes(q));
    }
    return list;
  }, [allFreelancers, filters, query]);

  
  return (
    <div className="job_page">
      <Sidebar  onFilterChange={setFilters} />
      <div className="job_listings">
       
        <TopSearch onSearch={setQuery} />

        <h2>Available Freelancers</h2>
        <h3>Find talent for your next project</h3>

        <div className="job_cards">
          {visible.map((f, idx) => (
            <div key={idx} className="job_card">
              <img
                src={f.profileImage || '/default-avatar.png'}
                alt="avatar"
                className="job_logo"
              />
              <h3>{f.name}</h3>

              <div className="job_tags">
                <span>{f.location}</span>
                {f.skills?.length ? <span>{f.skills[0]}</span> : null}
              </div>

              <span>Experience: {f.experience||0} year</span>
              <p>
                Description:&nbsp;
                {f.description?.trim()
                  ? f.description.slice(0, 150)
                  : 'Not provided'}
              </p>

              <div className="job_buttons">
                <button>Contact</button>
                <button
                  className="secondary"
                  onClick={() => navigate(`/freelancer/${f.id}`)}
                >
                  View profile
                </button>
              </div>
            </div>
          ))}

          {!visible.length && <p>No freelancers match your criteria.</p>}
        </div>
      </div>
    </div>
  );
}
