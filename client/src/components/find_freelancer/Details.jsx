
// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import "./Details.css";

// const Details = () => {
//   const { id } = useParams();            
//   const navigate = useNavigate();
//   const [freelancer, setFreelancer] = useState(null);
//   const [otherFreelancers, setOtherFreelancers] = useState([]);
//   const getId = (f) => String(f._id ?? f.id);

//   useEffect(() => {
//     const fetchFreelancers = async () => {
//       try {
//         const res = await fetch("https://freelancer-finder.onrender.com/api/freelancers");
//         const data = await res.json();

//         const current = data.find((f) => getId(f) === id);
//         const others  = data.filter((f) => getId(f) !== id);

//         setFreelancer(current);
//         setOtherFreelancers(others);
//       } catch (err) {
//         console.error("Error fetching freelancers:", err);
//       }
//     };

//     fetchFreelancers();
//   }, [id]);         

//   if (!freelancer) return <p>Loading...</p>;
//   return (
//     <div className="free_det">
//       <div className="card">
//         <div className="name">
//           <img src={freelancer.profileImage || "/default-avatar.png"} alt="Profile" />
//           <div>
//             <h2>{freelancer.name}</h2>
//             <p><strong>Email:</strong> {freelancer.email}</p>
//           </div>
//         </div>

//         <div className="loc">
//           <h3><strong>Location:</strong> {freelancer.location || "Not specified"}</h3>
//           <h3><strong>Experience:</strong> {freelancer.experience} years</h3>
//           <h3><strong>Domain:</strong> {freelancer.skills?.join(", ")}</h3>
//           <h3><strong>Projects:</strong>{freelancer.projects||"not Done any projects till now"}</h3>
//           <h3><strong>Description:</strong> {freelancer.description || "N/A"}</h3>

//           {freelancer.resume && (
//             <a href={freelancer.resume} target="_blank" rel="noopener noreferrer" download className="download">
//               📥 Download Resume
//             </a>
//           )}
//         </div>
//       </div>
//       <div className="other-freelancers">
//         <h3>Other Freelancers</h3>

//         {otherFreelancers.slice(0, 3).map((f) => (
//           <div
//             key={getId(f)}
//             className="other-card"
//             onClick={(e) =>{ 
//               e.stopPropagation();
//               navigate(`/freelancer/${getId(f)}`)}}
//           >
//             <img src={f.profileImage || "/default-avatar.png"} alt={f.name} />
//             <h4>{f.name}</h4>
//             <p>{f.location}</p>
//             <p>Experience: {f.experience||0} years</p>
//             <p>{f.skills?.slice(0, 2).join(", ")}</p>

//             <div className="job_buttons">
//               <button>Contact</button>
//               <button
//                 className="secondary"
//                 onClick={(e) => {
//                   e.stopPropagation();                 
//                   navigate(`/freelancer/${getId(f)}`); 
//                 }}
//               >
//                 View profile
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Details;



import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./Details.css";

const Details = () => {
  const { id } = useParams();            
  const navigate = useNavigate();
  const [freelancer, setFreelancer] = useState(null);
  const [otherFreelancers, setOtherFreelancers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const getId = (f) => String(f._id ?? f.id);

  useEffect(() => {
    const fetchFreelancers = async () => {
      try {
        setIsLoading(true);
        const res = await fetch("https://freelancer-finder.onrender.com/api/freelancers");
        const data = await res.json();

        const current = data.find((f) => getId(f) === id);
        const others  = data.filter((f) => getId(f) !== id);

        setFreelancer(current);
        setOtherFreelancers(others);
      } catch (err) {
        console.error("Error fetching freelancers:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFreelancers();
  }, [id]);         

  if (isLoading) return <div className="loading">Loading...</div>;
  if (!freelancer) return <div className="not-found">Freelancer not found</div>;
  
  return (
    <div className="details-container">
      <div className="main-content">
        <div className="freelancer-card">
          <div className="freelancer-header">
            <img 
              src={freelancer.profileImage || "/default-avatar.png"} 
              alt="Profile" 
              className="profile-image"
            />
            <div className="freelancer-info">
              <h2>{freelancer.name}</h2>
              <p className="email">{freelancer.email}</p>
            </div>
          </div>

          <div className="freelancer-details">
            <div className="detail-item">
              <strong>Location:</strong> {freelancer.location || "Not specified"}
            </div>
            <div className="detail-item">
              <strong>Experience:</strong> {freelancer.experience} years
            </div>
            <div className="detail-item">
              <strong>Skills:</strong> {freelancer.skills?.join(", ")}
            </div>
            <div className="detail-item">
              <strong>Projects:</strong> {freelancer.projects || "No projects yet"}
            </div>
            <div className="detail-item description">
              <strong>Description:</strong> {freelancer.description || "N/A"}
            </div>

            {freelancer.resume && (
              <a 
                href={freelancer.resume} 
                target="_blank" 
                rel="noopener noreferrer" 
                download 
                className="resume-link"
              >
                📥 Download Resume
              </a>
            )}
          </div>
        </div>
      </div>

      <div className="sidebar">
        <h3 className="sidebar-title">Other Freelancers</h3>
        <div className="other-freelancers-grid">
          {otherFreelancers.slice(0, 3).map((f) => (
            <div
              key={getId(f)}
              className="other-freelancer-card"
              onClick={() => navigate(`/freelancer/${getId(f)}`)}
            >
              <img 
                src={f.profileImage || "/default-avatar.png"} 
                alt={f.name} 
                className="other-profile-image"
              />
              <h4>{f.name}</h4>
              <p className="other-location">{f.location}</p>
              <p className="other-experience">Experience: {f.experience || 0} years</p>
              <p className="other-skills">{f.skills?.slice(0, 2).join(", ")}</p>

              <div className="action-buttons">
                <button className="contact-btn">Contact</button>
                <button
                  className="profile-btn"
                  onClick={(e) => {
                    e.stopPropagation();                 
                    navigate(`/freelancer/${getId(f)}`); 
                  }}
                >
                  View profile
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Details;