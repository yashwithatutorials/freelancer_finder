import React, { useEffect, useState } from 'react';
import './Postjob.css'; // make sure the path is correct

const Postjob = () => {
  const [title,setTitle]=useState('');
  const [descrip,setDescrip]=useState('');
  const [loca,setLoca]=useState('');
  const [category,setCategory]=useState('');
  const [email, setEmail] = useState('');
useEffect(()=>{
  const storedUser=localStorage.getItem("user");
  if(storedUser){
    const parsed=JSON.parse(storedUser);
    setTitle(parsed.title||'');
    setDescrip(parsed.descrip||'');
    setLoca(parsed.loca||'');
    setCategory(parsed.category||'');
     setEmail(parsed.email || ''); 
  }
},[]);
const handleUpdate = async (e) => {
e.preventDefault();
 try{
  const response=await fetch('http://localhost:8080/api/employees/job', {
      method: 'PUT',
      headers:{
         'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        title: title,
        descrip: descrip,
        loca: loca,
        category: category
      }),
    });

    if (!response.ok) {
      throw new Error('Update failed');
    }

    const result = await response.json();
    if (result.success) {
      alert("Job details updated");
      localStorage.setItem("user", JSON.stringify(result.updatedUser));
    }
  } catch (err) {
    console.error("Update error:", err);
    alert("Update failed: " + err.message);
  }

};


  return (
    <div className='post'>
    <form className="job-form-container" >
      <div className="job-form-group">
        <label className="job-form-label">Job Title</label>
        <input
          type="text"
          name="title"
          className="job-form-input"
          placeholder="Type here"
          value={title}
          onChange={(e)=>setTitle(e.target.value)}
        />
      </div>

      <div className="job-form-group">
        <label className="job-form-label">Job Description</label>
        <textarea
          name="description"
          className="job-form-textarea"
          placeholder="Type job description..."
          value={descrip}
          onChange={(e)=>setDescrip(e.target.value)}
        />
      </div>

      <div className="job-form-row">
        <div>
          <label className="job-form-label">Job Category</label>
          <select
            name="category"
            className="job-form-select"
            value={category}
            onChange={(e)=>setCategory(e.target.value)}
          >
            <option value="">Select</option>
            <option>Programming</option>
            <option>Design</option>
            <option>Marketing</option>
          </select>
        </div>

        <div>
          <label className="job-form-label">Job Location</label>
          <select
            name="location"
            className="job-form-select"
            value={loca}
            onChange={(e)=>setLoca(e.target.value)}
          >
            <option value="">Select</option>
            <option>Bangalore</option>
            <option>Hyderabad</option>
            <option>Remote</option>
          </select>
        </div>

        {/* <div>
          <label className="job-form-label">Job Level</label>
          <select
            name="level"
            className="job-form-select"
            value={level}
            onChange={(e)=>set}
          >
            <option value="">Select</option>
            <option>Beginner level</option>
            <option>Mid level</option>
            <option>Senior level</option>
          </select>
        </div> */}
      </div>

      {/* <div className="job-form-group">
        <label className="job-form-label">Job Salary</label>
        <input
          type="number"
          name="salary"
          className="job-form-input"
          placeholder="2500"
          value={jobData.salary}
          onChange={handleChange}
        />
      </div> */}

      <button  className="job-form-button" onClick={handleUpdate}>
        ADD
      </button>
    </form>
    </div>
  );
};

export default Postjob;




