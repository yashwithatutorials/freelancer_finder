import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./AppliedJobs.css";

const AppliedJobs = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const [appliedJobs, setAppliedJobs] = useState([]);

  useEffect(() => {
    if (!user.email || user.role !== "freelancer") {
      navigate("/login");
      return;
    }

   axios.get(`http://localhost:8080/api/jobs`)
  .then((res) => {
    const jobs = res.data;
    console.log("Jobs received:", jobs); // 👈 add this
    const myJobs = jobs.filter(j =>
      j.applicants?.some(a => a.freelancerEmail === user.email)
    );
    setAppliedJobs(myJobs);
  })

      .catch((err) => console.error("Fetch applied jobs error", err));
  }, [user.email, user.role, navigate]);

  return (
    <div className="applied-jobs-page">
      <h2>My Applied Jobs</h2>
      {appliedJobs.length === 0 ? (
        <p>You haven’t applied to any jobs yet.</p>
      ) : (
        <div className="job-list">
          {appliedJobs.map((job) => (
           <div key={job._id} className="job-card" style={{ background: "#f2f2f2", color: "#000", padding: "1rem", marginBottom: "1rem", borderRadius: "8px" }}>
  <h3>{job.jobTitle || "Untitled Job"}</h3>
  <p><strong>Company:</strong> {job.company || "Unknown"}</p>
  <p>{job.jobDescription || "No description available."}</p>
 <button
 className="chat-btn"
  onClick={() => {
    if (!job.employerEmail) {
      alert("Chat not available: employer email missing");
      return;
    }

navigate(`/messages?with=${job.employerEmail}&name=${job.company}&jobId=${job._id}`);
  }}
>
  Chat
</button>

</div>

          ))}
        </div>
      )}
    </div>
  );
};

export default AppliedJobs;
