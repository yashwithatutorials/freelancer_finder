// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import "./ManageJob.css";

// const ManageJob = () => {
//   const [jobs, setJobs]       = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError]     = useState(null);

//   const email = JSON.parse(localStorage.getItem("user") || "{}").email;


//   useEffect(() => {
//     if (!email) { setError("User e‑mail missing."); setLoading(false); return; }

//     axios
//       .get("http://localhost:8080/api/jobs", { params: { email } })
//       .then(res => { setJobs(res.data); setLoading(false); })
//       .catch(err => { console.error(err); setError("Failed to load jobs"); });
//   }, [email]);

//   const handleDelete = async (id) => {
//     if (!window.confirm("Delete this job posting?")) return;

//     try {
//       await axios.delete(`http://localhost:8080/api/jobs/${id}`);
//       setJobs(prev => prev.filter(j => j._id !== id));
//     } catch (err) {
//       console.error(err);
//       alert("Delete failed – see console for details.");
//     }
//   };

 
//   if (loading) return <p className="status">Loading…</p>;
//   if (error)   return <p className="status error">{error}</p>;
//   if (!jobs.length) return <p className="status">You haven’t posted any jobs yet.</p>;

//   return (
//     <div className="manage‑jobs">
//       <h2>Your Posted Jobs</h2>

//       <div className="card‑grid">
//         {jobs.map(job => (
//           <article key={job._id} className="job‑card">
//             <header>
//               <h3>{job.jobTitle}</h3>
//               <p className="meta">{job.jobCategory} • {job.jobLocation}</p>
//             </header>

//             <p className="desc">{job.jobDescription}</p>

//             <details>
//               <summary>Responsibilities</summary>
//               <ul>
//                 {(job.jobRequirement || []).map((item, i) => <li key={i}>{item}</li>)}
//               </ul>
//             </details>

//             <details>
//               <summary>Skills Required</summary>
//               <ul>
//                 {(job.skillsRequired || []).map((s, i) => <li key={i}>{s}</li>)}
//               </ul>
//             </details>
//             <button
//               className="delete‑btn"
//               onClick={() => handleDelete(job._id)}
//             >
//               Delete Job
//             </button>
//           </article>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default ManageJob;


import React, { useEffect, useState } from "react";
import axios from "axios";
import "./ManageJob.css";

const ManageJob = () => {
  const [jobs, setJobs]       = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState(null);

  const email = JSON.parse(localStorage.getItem("user") || "{}").email;

  useEffect(() => {
    if (!email) { setError("User e‑mail missing."); setLoading(false); return; }

    axios
      .get("http://localhost:8080/api/jobs", { params: { email } })
      .then(res => { setJobs(res.data); setLoading(false); })
      .catch(err => { console.error(err); setError("Failed to load jobs"); });
  }, [email]);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this job posting?")) return;

    try {
      await axios.delete(`http://localhost:8080/api/jobs/${id}`);
      setJobs(prev => prev.filter(j => j._id !== id));
    } catch (err) {
      console.error(err);
      alert("Delete failed – see console for details.");
    }
  };

  if (loading)        return <p className="status">Loading…</p>;
  if (error)          return <p className="status error">{error}</p>;
  if (!jobs.length)   return <p className="status">You haven’t posted any jobs yet.</p>;

  return (
    <div className="manage-jobs">
      <h2 style={{background:"none"}}>Your Posted Jobs</h2>
<h3>Your Posted jobs</h3>
      <div className="card-grid">
      
        {jobs.map(job => (
          <article key={job._id} className="job-card">
            <header>
              <h3>{job.jobTitle}</h3>
              <p className="meta">{job.category} • {job.location}</p>
            </header>

            <p className="desc">Description:  {job.jobDescription}</p>

            {/* <details>
              <summary>Responsibilities</summary>
              <ul>
                {(job.jobRequirement || []).map((item, i) => <li key={i}>{item}</li>)}
              </ul>
            </details>

            <details>
              <summary>Skills Required</summary>
              <ul>
                {(job.skillsRequired || []).map((s, i) => <li key={i}>{s}</li>)}
              </ul>
            </details> */}
<h4>Responsibilities</h4>
<ul>
  {(job.jobRequirement || []).map((item, i) => <li key={i}>{item}</li>)}
</ul>

<h4>Skills Required</h4>
<ul>
  {(job.skillsRequired || []).map((s, i) => <li key={i}>{s}</li>)}
</ul>


            <button className="delete-btn" onClick={() => handleDelete(job._id)}>
              Delete Job
            </button>
          </article>
        ))}
      </div>
    </div>
  );
};

export default ManageJob;
