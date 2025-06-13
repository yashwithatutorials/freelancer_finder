import React, { useEffect, useState, useCallback } from 'react';
import Sidebar from './Sidebar';
import './ClientList.css';

const ClientList = () => {
  const [jobs, setJobs] = useState([]);
  const [filters, setFilters] = useState({ categories: [], locations: [] });

  const fetchJobs = useCallback(async () => {
    try {
      const res = await fetch('http://localhost:8080/api/jobs');
      const data = await res.json();

      if (Array.isArray(data)) {
        let filteredJobs = data;

        if (filters.categories.length) {
          filteredJobs = filteredJobs.filter(job =>
            filters.categories.includes(job.jobCategory)
          );
        }

        if (filters.locations.length) {
          filteredJobs = filteredJobs.filter(job =>
            filters.locations.includes(job.jobLocation)
          );
        }

        setJobs(filteredJobs);
      }
    } catch (err) {
      console.error('Error fetching jobs:', err);
    }
  }, [filters]);

  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  return (
    <div className="job_page">
      <Sidebar onFilterChange={setFilters} />
      <div className="job_listings">
        <h2>Latest Jobs</h2>
        <p>Get your desired job from top companies</p>
        <div className="job_cards">
          {jobs.map((job, idx) => (
            <div key={idx} className="job_card">
              <img src="/google-icon.png" alt="logo" className="job_logo" />
              <h3>{job.jobTitle}</h3>
              <div className="job_tags">
                <span>{job.jobLocation}</span>
                <span className="job_level">Intermediate Level</span>
              </div>
              <p>{job.jobDescription?.slice(0, 150)}...</p>
              <div className="job_buttons">
                <button>Apply now</button>
                <button className="secondary">Learn more</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ClientList;
