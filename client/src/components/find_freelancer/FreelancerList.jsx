// import React, { useEffect, useState, useMemo } from 'react';
// import { useNavigate } from 'react-router-dom';
// import Sidebar     from './Sidebar';
// import TopSearch   from './TopSearch';
// import '../find_job/ClientList.css';

// export default function FreelancerList() {
//   const navigate = useNavigate();
//   const [allFreelancers, setAllFreelancers] = useState([]); 
//   const [filters, setFilters] = useState({ skills: [], locations: [] });
//   const [query,   setQuery]   = useState('');               
//   useEffect(() => {
//     (async () => {
//       try {
//         const res  = await fetch('https://freelancer-finder.onrender.com/api/freelancers');
//         const data = await res.json();
//         if (Array.isArray(data)) setAllFreelancers(data);
//       } catch (err) {
//         console.error('Error fetching freelancers:', err);
//       }
//     })();
//   }, []);
//   const visible = useMemo(() => {
//     let list = [...allFreelancers];

//     if (filters.skills.length) {
//       list = list.filter(f => f.skills?.some(s => filters.skills.includes(s)));
//     }
//     if (filters.locations.length) {
//       list = list.filter(f => filters.locations.includes(f.location));
//     }
//     if (query) {
//       const q = query.toLowerCase();
//       list = list.filter(f => f.name.toLowerCase().includes(q));
//     }
//     return list;
//   }, [allFreelancers, filters, query]);

  
//   return (
//     <div className="job_page">
//       <Sidebar  onFilterChange={setFilters} />
//       <div className="job_listings">
       
//         <TopSearch onSearch={setQuery} />

//         <h2>Available Freelancers</h2>
//         <h3>Find talent for your next project</h3>

//         <div className="job_cards">
//           {visible.map((f, idx) => (
//             <div key={idx} className="job_card">
//               <img
//                 src={f.profileImage || '/default-avatar.png'}
//                 alt="avatar"
//                 className="job_logo"
//               />
//               <h3>{f.name}</h3>

//               <div className="job_tags">
//                 <span>{f.location}</span>
//                 {f.skills?.length ? <span>{f.skills[0]}</span> : null}
//               </div>

//               <span>Experience: {f.experience||0} year</span>
//               <p>
//                 Description:&nbsp;
//                 {f.description?.trim()
//                   ? f.description.slice(0, 150)
//                   : 'Not provided'}
//               </p>

//               <div className="job_buttons">
//                 <button>Contact</button>
//                 <button
//                   className="secondary"
//                   onClick={() => navigate(`/freelancer/${f.id}`)}
//                 >
//                   View profile
//                 </button>
//               </div>
//             </div>
//           ))}

//           {!visible.length && <p>No freelancers match your criteria.</p>}
//         </div>
//       </div>
//     </div>
//   );
// }

import React, { useEffect, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import TopSearch from './TopSearch';
import '../find_job/ClientList.css';

export default function FreelancerList() {
  const navigate = useNavigate();
  const [allFreelancers, setAllFreelancers] = useState([]); 
  const [filters, setFilters] = useState({ skills: [], locations: [] });
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFreelancers = async () => {
      try {
        setLoading(true);
        const res = await fetch('https://freelancer-finder.onrender.com/api/freelancers');
        
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        
        const data = await res.json();
        
        // Debug: Log the first freelancer's data
        if (data.length > 0) {
          console.log("Sample freelancer data:", data[0]);
          console.log("Profile image path:", data[0].profileImage);
        }
        
        setAllFreelancers(data);
      } catch (err) {
        console.error('Error fetching freelancers:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFreelancers();
  }, []);

  // const getProfileImageUrl = (profileImage) => {
  //   if (!profileImage) return '/default-avatar.png';
    
  //   // Check if it's already a full URL
  //   if (profileImage.startsWith('http')) {
  //     return profileImage;
  //   }
    
  //   // Handle different path formats
  //   const cleanPath = profileImage.replace(/^[\\/]/, ''); // Remove leading slashes or backslashes
    
  //   // Construct the full URL
  //   return `https://freelancer-finder.onrender.com/uploads/${cleanPath}`;
  // };
  const API = import.meta.env.VITE_API_URL || 'https://freelancer-finder.onrender.com';
 const getProfileImageUrl = (profileImage) => {
   if (!profileImage) return '/default-avatar.png';
   if (profileImage.startsWith('http')) return profileImage;

const file = profileImage
     .replace(/^[/\\]?uploads[/\\]?/, '')
     .replace(/\\/g, '/');

   return `${API}/uploads/${encodeURIComponent(file)}`;
};

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

  if (loading) return <div className="loading">Loading freelancers...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="job_page">
      <Sidebar onFilterChange={setFilters} />
      <div className="job_listings">
        <TopSearch onSearch={setQuery} />

        <h2>Available Freelancers</h2>
        <h3>Find talent for your next project</h3>

        <div className="job_cards">
          {visible.map((f) => (
            <div key={f._id || f.id} className="job_card">
              <img
                src={getProfileImageUrl(f.profileImage)}
                alt={`${f.name}'s profile`}
                className="job_logo"
                onError={(e) => {
                  console.warn(`Failed to load profile image: ${f.profileImage}`);
                  e.target.src = '/default-avatar.png';
                }}
              />
              <h3>{f.name}</h3>

              <div className="job_tags">
                <span>{f.location}</span>
                {f.skills?.length ? <span>{f.skills[0]}</span> : null}
              </div>

              <span>Experience: {f.experience || 0} year{f.experience !== 1 ? 's' : ''}</span>
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
                  onClick={() => navigate(`/freelancer/${f._id || f.id}`)}
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