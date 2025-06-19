// import React, { useEffect, useState, useCallback } from "react";
// import { useParams } from "react-router-dom";        // ⭐ NEW
// import axios from "axios";
// import "./Viewjob.css";

// /* helper to build absolute URL for images */
// const fileURL = (f) =>
//   f && !f.startsWith("http")
//     ? `http://localhost:8080/${f.startsWith("uploads/") ? "" : "uploads/"}${f}`
//     : f || "/default-avatar.png";

// /* ----- local‑storage helpers (keyed per user) ----- */
// const loadLocal = (email) => {
//   try {
//     return new Set(JSON.parse(localStorage.getItem(`appliedJobs_${email}`) || "[]"));
//   } catch {
//     return new Set();
//   }
// };
// const saveLocal = (email, set) =>
//   localStorage.setItem(`appliedJobs_${email}`, JSON.stringify([...set]));

// /* ═════════════════  COMPONENT  ═════════════════ */
// export default function ViewJob() {
//   const { jobId } = useParams();                     // ⭐ NEW  (works even if route param missing)
//   const email     = localStorage.getItem("email");

//   const [jobs,     setJobs]     = useState([]);
//   const [selected, setSelected] = useState(null);
//   const [applied,  setApplied]  = useState(() => loadLocal(email));

//   /* 1️⃣  FETCH JOBS ONCE */
//   useEffect(() => {
//     (async () => {
//       const { data = [] } = await axios.get("http://localhost:8080/api/jobs");

//       /* ----- derive “server truth” for this freelancer ----- */
//       const serverApplied = new Set(
//         data
//           .filter((j) =>
//             j.applicants?.some((a) => a.freelancerEmail === email)   // 🔄 CHANGED
//           )
//           .map((j) => j._id)
//       );

//       /* merge with anything we already cached locally */
//       const merged = new Set([...loadLocal(email), ...serverApplied]);

//       setJobs(data);
//       setApplied(merged);
//       saveLocal(email, merged);

//       /* choose initial job */
//       const firstJob =
//         data.find((j) => String(j._id) === String(jobId)) || data[0] || null;
//       setSelected(firstJob);
//     })();
//   }, [email, jobId]);

//   /* 2️⃣  HANDLE APPLY */
//   const apply = useCallback(
//     async (job) => {
//       if (!email) {
//         alert("Please log in first");
//         return;
//       }
//       if (!job || applied.has(job._id)) return;

//       try {
//         await axios.post(`http://localhost:8080/api/jobs/${job._id}/apply`, {
//           userEmail: email,
//         });

//         setApplied((prev) => {
//           const next = new Set(prev).add(job._id);
//           saveLocal(email, next);
//           return next;
//         });
//       } catch (err) {
//         console.error(err);
//         alert("Server error, please try again");
//       }
//     },
//     [email, applied]
//   );

//   /* 3️⃣  DERIVED LISTS */
//   const related = selected
//     ? jobs.filter((j) => j.company === selected.company && j._id !== selected._id)
//     : [];

//   if (!selected) return <p>Loading…</p>;

//   /* guard for strings vs arrays coming from Mongo */
//   const reqList   = Array.isArray(selected.jobRequirement)
//     ? selected.jobRequirement
//     : (selected.jobRequirement || "").split(",");
//   const skillList = Array.isArray(selected.jobSkills)
//     ? selected.jobSkills
//     : (selected.jobSkills || "").split(",");

//   return (
//     <div className="viewjob-container">
//       {/* key forces React to remount when selected job changes */}
//       <article key={selected._id} className="job-details">
//         <header className="job-header">
//           <div className="job-header-left">
//             <img src={fileURL(selected.companyLogo)} alt="logo" />
//             <div>
//               <h2>{selected.jobTitle}</h2>
//               <div className="job-meta">
//                 <span>🏢 {selected.company}</span>
//                 <span>📍 {selected.location}</span>
//               </div>
//             </div>
//           </div>

//           <button
//             className="btn-apply"
//             disabled={applied.has(selected._id)}
//             onClick={() => apply(selected)}
//           >
//             {applied.has(selected._id) ? "APPLIED" : "APPLY"}
//           </button>
//         </header>

//         <h3 className="job-section-title">Job description</h3>
//         <p>{selected.jobDescription}</p>

//         <h3 className="job-section-title">Key Requirements</h3>
//         <ol>{reqList.map((r, i) => <li key={i}>{r}</li>)}</ol>

//         <h3 className="job-section-title">Skills</h3>
//         <p>{skillList.join(", ")}</p>
//       </article>

//       <aside className="related-jobs">
//         <h3 className="related-title">More jobs from {selected.company}</h3>
//         {related.map((j) => (
//           <div key={j._id} className="related-job-card">
//             <div className="related-job-header">
//               <img src={fileURL(j.companyLogo)} alt="logo" />
//               <h4>{j.jobTitle}</h4>
//             </div>
//             <p>{j.jobDescription.slice(0, 90)}…</p>

//             <button
//               className="btn-apply"
//               disabled={applied.has(j._id)}
//               onClick={() => apply(j)}
//             >
//               {applied.has(j._id) ? "APPLIED" : "APPLY"}
//             </button>

//             <button className="btn-learn" onClick={() => setSelected(j)}>
//               Learn more
//             </button>
//           </div>
//         ))}
//       </aside>
//     </div>
//   );
// }


import React, { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./Viewjob.css";

/* to absolute URL */
const fileURL = (f) =>
  f && !f.startsWith("http")
    ? `http://localhost:8080/${f.startsWith("uploads/") ? "" : "uploads/"}${f}`
    : f || "/default-avatar.png";

/* local cache { jobId : status } */
const loadLocal = (email) =>
  JSON.parse(localStorage.getItem(`jobStatuses_${email}`) || "{}");
const saveLocal = (email, o) =>
  localStorage.setItem(`jobStatuses_${email}`, JSON.stringify(o));

export default function ViewJob() {
  const { jobId } = useParams();
  const email     = localStorage.getItem("email");

  const [jobs,     setJobs]     = useState([]);
  const [selected, setSelected] = useState(null);
  const [statuses, setStatuses] = useState(() => loadLocal(email));

  /* fetch all jobs once */
  useEffect(() => {
    (async () => {
      const { data=[] } = await axios.get("http://localhost:8080/api/jobs");
      const fromServer  = {};
      data.forEach(j => {
        const a = j.applicants?.find(x => x.freelancerEmail === email);
        if (a) fromServer[j._id] = a.status;          // pending | reviewed | hired | rejected
      });
      const merged = { ...loadLocal(email), ...fromServer };
      setStatuses(merged);
      saveLocal(email, merged);

      setJobs(data);
      setSelected(
        data.find(j => String(j._id) === String(jobId)) || data[0] || null
      );
    })();
  }, [email, jobId]);

  /* apply → pending */
  const apply = useCallback(async (job) => {
    if (!email) return alert("Please log in first");
    if (!job || statuses[job._id]) return;

    try {
      await axios.post(`http://localhost:8080/api/jobs/${job._id}/apply`, { userEmail: email });
      setStatuses(prev => {
        const next = { ...prev, [job._id]: "pending" };
        saveLocal(email, next);
        return next;
      });
    } catch (err) {
      console.error(err); alert("Server error");
    }
  }, [email, statuses]);

  const related = selected
    ? jobs.filter(j => j.company === selected.company && j._id !== selected._id)
    : [];

  if (!selected) return <p>Loading…</p>;

  const pretty = (s) =>
    ({ pending:"PENDING", reviewed:"REVIEWED", hired:"HIRED", rejected:"REJECTED" }[s] || "APPLY");

  return (
    <div className="viewjob-container">
      <article key={selected._id} className="job-details">
        <header className="job-header">
          <div className="job-header-left">
            <img src={fileURL(selected.companyLogo)} alt="logo" />
            <div>
              <h2>{selected.jobTitle}</h2>
              <div className="job-meta">
                <span>🏢 {selected.company}</span>
                <span>📍 {selected.location}</span>
              </div>
            </div>
          </div>

          <button
            className={`btn-apply status-${statuses[selected._id] ?? "new"}`}
            disabled={!!statuses[selected._id]}
            onClick={() => apply(selected)}
          >
            {pretty(statuses[selected._id])}
          </button>
        </header>

        <h3 className="job-section-title">Job description</h3>
        <p>{selected.jobDescription}</p>

        <h3 className="job-section-title">Key Requirements</h3>
        <ol>
          {(selected.jobRequirement ?? []).map((r,i)=><li key={i}>{r}</li>)}
        </ol>

        <h3 className="job-section-title">Skills</h3>
        <p>{(selected.jobSkills ?? []).join(", ")}</p>
      </article>

      <aside className="related-jobs">
        <h3>More jobs from {selected.company}</h3>
        {related.slice(0,4).map(j => (
          <div key={j._id} className="related-job-card">
            <div className="related-job-header">
              <img src={fileURL(j.companyLogo)} alt="logo" />
              <h4>{j.jobTitle}</h4>
            </div>
            <p>{j.jobDescription.slice(0,90)}…</p>

            <button
              className={`btn-apply status-${statuses[j._id] ?? "new"}`}
              disabled={!!statuses[j._id]}
              onClick={() => apply(j)}
            >
              {pretty(statuses[j._id])}
            </button>

            <button className="btn-learn" onClick={() => setSelected(j)}>
              Learn more
            </button>
          </div>
        ))}
      </aside>
    </div>
  );
}


// import React, { useEffect, useState, useCallback } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";
// import "./Viewjob.css";

// /* helper to build absolute URL for images */
// const fileURL = (f) =>
//   f && !f.startsWith("http")
//     ? `http://localhost:8080/${
//         f.startsWith("uploads/") ? "" : "uploads/"
//       }${f}`
//     : f || "/default-avatar.png";

// /* local‑storage helpers */
// const saveApplied = (email, set) =>
//   localStorage.setItem(`appliedJobs_${email}`, JSON.stringify([...set]));

// export default function ViewJob() {
//   const { jobId } = useParams();            // /job/:jobId from router
//   const email = localStorage.getItem("email");

//   const [jobs,     setJobs]     = useState([]);
//   const [selected, setSelected] = useState(null);
//   const [applied,  setApplied]  = useState(new Set());

//   /* 1️⃣ fetch jobs once */
//   useEffect(() => {
//     (async () => {
//       const { data = [] } = await axios.get("http://localhost:8080/api/jobs");

//       /* derive the set of jobs this freelancer already applied to */
//       const serverApplied = new Set(
//         data
//           .filter((j) =>
//             j.applicants?.some((a) => a.freelancerEmail === email)
//           )
//           .map((j) => j._id)
//       );

//       setJobs(data);
//       setApplied(serverApplied);
//       saveApplied(email, serverApplied);
//     })();
//   }, [email]);

//   /* 2️⃣ choose the correct job whenever the list OR the URL changes */
//   useEffect(() => {
//     if (!jobs.length) return;
//     const chosen =
//       jobs.find((j) => String(j._id) === String(jobId)) || jobs[0];
//     setSelected(chosen);
//   }, [jobs, jobId]);

//   /* ------------ APPLY ------------- */
//   const apply = useCallback(
//     async (job) => {
//       if (!email) {
//         alert("Please log in first"); return;
//       }
//       if (!job || applied.has(job._id)) return;

//       await axios.post(
//         `http://localhost:8080/api/jobs/${job._id}/apply`,
//         { userEmail: email }
//       );

//       setApplied((prev) => {
//         const next = new Set(prev).add(job._id);
//         saveApplied(email, next);
//         return next;
//       });
//     },
//     [email, applied]
//   );

//   /* ------------ derived lists ------------- */
//   const related = selected
//     ? jobs.filter(
//         (j) => j.company === selected.company && j._id !== selected._id
//       )
//     : [];

//   if (!selected) return <p>Loading…</p>;

//   /* guard for strings vs arrays */
//   const reqList   = Array.isArray(selected.jobRequirement)
//     ? selected.jobRequirement
//     : (selected.jobRequirement || "").split(",");
//   const skillList = Array.isArray(selected.jobSkills)
//     ? selected.jobSkills
//     : (selected.jobSkills || "").split(",");

//   return (
//     <div className="viewjob-container">
//       {/* key forces React to remount when job changes */}
//       <article key={selected._id} className="job-details">
//         <header className="job-header">
//           <div className="job-header-left">
//             <img src={fileURL(selected.companyLogo)} alt="logo" />
//             <div>
//               <h2>{selected.jobTitle}</h2>
//               <div className="job-meta">
//                 <span>🏢 {selected.company}</span>
//                 <span>📍 {selected.location}</span>
//               </div>
//             </div>
//           </div>

//           <button
//             className="btn-apply"
//             disabled={applied.has(selected._id)}
//             onClick={() => apply(selected)}
//           >
//             {applied.has(selected._id) ? "APPLIED" : "APPLY"}
//           </button>
//         </header>

//         <h3 className="job-section-title">Job description</h3>
//         <p>{selected.jobDescription}</p>

//         <h3 className="job-section-title">Key Requirements</h3>
//         <ol>{reqList.map((r, i) => <li key={i}>{r}</li>)}</ol>

//         <h3 className="job-section-title">Skills</h3>
//         <p>{skillList.join(", ")}</p>
//       </article>

//       <aside className="related-jobs">
//         <h3 className="related-title">More jobs from {selected.company}</h3>
//         {related.map((j) => (
//           <div key={j._id} className="related-job-card">
//             <div className="related-job-header">
//               <img src={fileURL(j.companyLogo)} alt="logo" />
//               <h4>{j.jobTitle}</h4>
//             </div>
//             <p>{j.jobDescription.slice(0, 90)}…</p>

//             <button
//               className="btn-apply"
//               disabled={applied.has(j._id)}
//               onClick={() => apply(j)}
//             >
//               {applied.has(j._id) ? "APPLIED" : "APPLY"}
//             </button>

//             <button className="btn-learn" onClick={() => setSelected(j)}>
//               Learn more
//             </button>
//           </div>
//         ))}
//       </aside>
//     </div>
//   );
// }
