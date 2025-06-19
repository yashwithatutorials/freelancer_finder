// import React, { useEffect, useState } from 'react';
// import './Postjob.css'; // make sure the path is correct

// const Postjob = () => {
//   const [title,setTitle]=useState('');
//   const [descrip,setDescrip]=useState('');
//   const [loca,setLoca]=useState('');
//   const [category,setCategory]=useState('');
//   const [email, setEmail] = useState('');
//   const [requirement,setRequirement]=useState('');
//   const [skillreq,setSkillreq]=useState('');
// useEffect(() => {
//   const storedUser = localStorage.getItem("user");
//   if (storedUser) {
//     const parsed = JSON.parse(storedUser);
//     setTitle(parsed.title ?? parsed.jobTitle ?? '');
//     setDescrip(parsed.descrip ?? parsed.jobDescription ?? '');
//     setLoca(parsed.loca ?? parsed.jobLocation ?? '');
//     setCategory(parsed.category ?? parsed.jobCategory ?? '');
//     setRequirement(parsed.requirement ?? parsed.jobRequirement ?? '');
//     setEmail(parsed.email ?? '');
//     setSkillreq(parsed.skillreq??parsed.jobSkillreq??'');
//   }
// }, []);

// // const handleUpdate = async (e) => {
// // e.preventDefault();
// //  try{
// //   const response=await fetch('http://localhost:8080/api/employees/job', {
// //       method: 'PUT',
// //       headers:{
// //          'Content-Type': 'application/json',
// //       },
// //       body: JSON.stringify({
// //         email: email,
// //         title: title,
// //         descrip: descrip,
// //         loca: loca,
// //         category: category,
// //         requirement:requirement,
// //         skillreq:skillreq,
// //       }),
// //     });

// //     if (!response.ok) {
// //       throw new Error('Update failed');
// //     }
// //     if (!title || !descrip || !requirement || !category || !loca) {
// //   alert("Please fill in all the fields before submitting.");
// //   return;
// // }


// //     const result = await response.json();
// //    if (result.success) {
// //   console.log('Server returned:', result.updatedUser);   
// //   alert('Job details updated');
// //   localStorage.setItem('user', JSON.stringify(result.updatedUser));
// // }

// //   } catch (err) {
// //     console.error("Update error:", err);
// //     alert("Update failed: " + err.message);
// //   }

// // };
// const handleUpdate = async (e) => {
//   e.preventDefault();

//   // ✅ move validation to the top
//   if (!title || !descrip || !requirement || !category || !loca) {
//     alert("Please fill in all the fields before submitting.");
//     return;          // stop here
//   }

//   try {
//     const response = await fetch('http://localhost:8080/api/employees/job', {
//       method: 'PUT',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({
//         email,
//         title,
//         descrip,
//         loca,
//         category,
//         requirement,
//         skillreq,
//       }),
//     });

//     if (!response.ok) throw new Error(await response.text());

//     const result = await response.json();
//     alert('Job details updated');
//     localStorage.setItem('user', JSON.stringify(result.updatedUser));
//   } catch (err) {
//     console.error("Update error:", err);
//     alert("Update failed: " + err.message);
//   }
// };


//   return (
//     <div className='post'>
//     <form className="job-form-container" >
//       <div className="job-form-group">
//         <label className="job-form-label">Job Title</label>
//         <input
//           type="text"
//           name="title"
//           className="job-form-input"
//           placeholder="Type here"
//           value={title}
//           onChange={(e)=>setTitle(e.target.value)}
//         />
//       </div>

//       <div className="job-form-group">
//         <label className="job-form-label">Job Description</label>
//         <textarea
//           name="description"
//           className="job-form-textarea"
//           placeholder="Type job description..."
//           value={descrip}
//           onChange={(e)=>setDescrip(e.target.value)}
//         />
//       </div>
//       <div className="job-form-group">
//         <label className="job-form-label">Key Requirements</label>
//         <textarea
//           name="requirement"
//           className="job-form-textarea"
//           placeholder="Type job requirements..."
//           value={requirement}
//           onChange={(e)=>setRequirement(e.target.value)}
//         />
//       </div>
//       <div className="job-form-group">
//         <label className="job-form-label">Skills Required</label>
//         <textarea
//           name="skillreq"
//           className="job-form-textarea"
//           placeholder="Type job skills..."
//           value={skillreq}
//           onChange={(e)=>setSkillreq(e.target.value)}
//         />
//       </div>

//       <div className="job-form-row">
//         <div>
//           <label className="job-form-label">Job Category</label>
//           <select
//             name="category"
//             className="job-form-select"
//             value={category}
//             onChange={(e)=>setCategory(e.target.value)}
//           >
//             <option value="">Select</option>
//             <option>Programming</option>
//             <option>Design</option>
//             <option>Marketing</option>
//           </select>
//         </div>

//         <div>
//           <label className="job-form-label">Job Location</label>
//           <select
//             name="location"
//             className="job-form-select"
//             value={loca}
//             onChange={(e)=>setLoca(e.target.value)}
//           >
//             <option value="">Select</option>
//             <option>Bangalore</option>
//             <option>Hyderabad</option>
//             <option>Remote</option>
//           </select>
//         </div>

       
//       </div>

     

//       <button  className="job-form-button" onClick={handleUpdate}>
//         ADD
//       </button>
//     </form>
//     </div>
//   );
// };

// export default Postjob;




// import React, { useState } from 'react';
// import './Postjob.css';

// const Postjob = () => {
//   const [title, setTitle] = useState('');
//   const [descrip, setDescrip] = useState('');
//   const [loca, setLoca] = useState('');
//   const [category, setCategory] = useState('');
//   const [email, setEmail] = useState(() => {
//     const user = JSON.parse(localStorage.getItem("user"));
//     return user?.email || '';
//   });
//   const [requirement, setRequirement] = useState('');
//   const [skillreq, setSkillreq] = useState('');

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!title || !descrip || !requirement || !category || !loca) {
//       alert("Please fill in all the fields before submitting.");
//       return;
//     }

//     try {
//       const response = await fetch('http://localhost:8080/api/employees/job', {
//         method: 'POST', // ✅ Changed from PUT to POST
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           email,
//           title,
//           descrip,
//           loca,
//           category,
//           requirement,
//           skillreq,
//         }),
//       });

//       if (!response.ok) throw new Error(await response.text());

//       const result = await response.json();
//       alert('Job posted successfully');

//       // ✅ Clear form after submission
//       setTitle('');
//       setDescrip('');
//       setLoca('');
//       setCategory('');
//       setRequirement('');
//       setSkillreq('');

//     } catch (err) {
//       console.error("Post error:", err);
//       alert("Job post failed: " + err.message);
//     }
//   };

//   return (
//     <div className='post'>
//       <form className="job-form-container">
//         <div className="job-form-group">
//           <label className="job-form-label">Job Title</label>
//           <input
//             type="text"
//             name="title"
//             className="job-form-input"
//             placeholder="Type here"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//           />
//         </div>

//         <div className="job-form-group">
//           <label className="job-form-label">Job Description</label>
//           <textarea
//             name="description"
//             className="job-form-textarea"
//             placeholder="Type job description..."
//             value={descrip}
//             onChange={(e) => setDescrip(e.target.value)}
//           />
//         </div>

//         <div className="job-form-group">
//           <label className="job-form-label">Key Requirements</label>
//           <textarea
//             name="requirement"
//             className="job-form-textarea"
//             placeholder="Type job requirements..."
//             value={requirement}
//             onChange={(e) => setRequirement(e.target.value)}
//           />
//         </div>

//         <div className="job-form-group">
//           <label className="job-form-label">Skills Required</label>
//           <textarea
//             name="skillreq"
//             className="job-form-textarea"
//             placeholder="Type job skills..."
//             value={skillreq}
//             onChange={(e) => setSkillreq(e.target.value)}
//           />
//         </div>

//         <div className="job-form-row">
//           <div>
//             <label className="job-form-label">Job Category</label>
//             <select
//               name="category"
//               className="job-form-select"
//               value={category}
//               onChange={(e) => setCategory(e.target.value)}
//             >
//               <option value="">Select</option>
//               <option>Programming</option>
//               <option>Design</option>
//               <option>Marketing</option>
//             </select>
//           </div>

//           <div>
//             <label className="job-form-label">Job Location</label>
//             <select
//               name="location"
//               className="job-form-select"
//               value={loca}
//               onChange={(e) => setLoca(e.target.value)}
//             >
//               <option value="">Select</option>
//               <option>Bangalore</option>
//               <option>Hyderabad</option>
//               <option>Remote</option>
//             </select>
//           </div>
//         </div>

//         <button className="job-form-button" onClick={handleSubmit}>
//           ADD
//         </button>
//       </form>
//     </div>
//   );
// };

// export default Postjob;


// src/components/Postjob.jsx
import React, { useState } from 'react';
import './Postjob.css';          // be sure the file exists

const Postjob = () => {
  /* ---------------- form state ---------------- */
  const [title,       setTitle]       = useState('');
  const [descrip,     setDescrip]     = useState('');
  const [requirement, setRequirement] = useState('');
  const [skillreq,    setSkillreq]    = useState('');
  const [category,    setCategory]    = useState('');
  const [loca,        setLoca]        = useState('');

  /* grab employer e‑mail straight from localStorage once */
  const email = React.useMemo(() => {
    const u = JSON.parse(localStorage.getItem('user') || '{}');
    return u.email || '';
  }, []);

  /* ---------------- submit handler ---------------- */
  async function handleSubmit(e) {
    e.preventDefault();

    /* quick front‑end validation */
    if (!title || !descrip || !requirement || !category || !loca) {
      return alert('Please fill in every required field.');
    }

    try {
      const res = await fetch('http://localhost:8080/api/jobs', {
        method : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body   : JSON.stringify({
          email,                    // who is posting
          title,
          descrip,
          loca,
          category,
          requirement,
          skillreq
        })
      });

      if (!res.ok) throw new Error(await res.text());

      /* success! */
      alert('🎉  Job posted successfully');
      setTitle(''); setDescrip(''); setRequirement('');
      setSkillreq(''); setCategory(''); setLoca('');
    } catch (err) {
      console.error('Post job error ➜', err);
      alert('Job post failed: ' + err.message);
    }
  }

  /* ---------------- render ---------------- */
  return (
    <div className="post">
      <form className="job-form-container" onSubmit={handleSubmit}>
        {/* Job Title */}
        <div className="job-form-group">
          <label className="job-form-label">Job Title<span>*</span></label>
          <input
            className="job-form-input"
            value={title}
            onChange={e => setTitle(e.target.value)}
            placeholder="e.g. Full‑Stack Developer"
          />
        </div>

        {/* Description */}
        <div className="job-form-group">
          <label className="job-form-label">Job Description<span>*</span></label>
          <textarea
            className="job-form-textarea"
            value={descrip}
            onChange={e => setDescrip(e.target.value)}
            placeholder="Describe the job..."
          />
        </div>

        {/* Requirements */}
        <div className="job-form-group">
          <label className="job-form-label">Key Requirements<span>*</span></label>
          <textarea
            className="job-form-textarea"
            value={requirement}
            onChange={e => setRequirement(e.target.value)}
            placeholder="Comma‑separated list or paragraphs"
          />
        </div>

        {/* Skills */}
        <div className="job-form-group">
          <label className="job-form-label">Skills Required</label>
          <textarea
            className="job-form-textarea"
            value={skillreq}
            onChange={e => setSkillreq(e.target.value)}
            placeholder="e.g. React, Node, MongoDB"
          />
        </div>

        {/* Row: category & location */}
        <div className="job-form-row">
          <div>
            <label className="job-form-label">Job Category<span>*</span></label>
            <select
              className="job-form-select"
              value={category}
              onChange={e => setCategory(e.target.value)}
            >
              <option value="">Select</option>
              <option>Programming</option>
              <option>Design</option>
              <option>Marketing</option>
            </select>
          </div>

          <div>
            <label className="job-form-label">Job Location<span>*</span></label>
            <select
              className="job-form-select"
              value={loca}
              onChange={e => setLoca(e.target.value)}
            >
              <option value="">Select</option>
              <option>Bangalore</option>
              <option>Hyderabad</option>
              <option>Remote</option>
            </select>
          </div>
        </div>

        {/* Submit */}
        <button type="submit" className="job-form-button">
          ADD
        </button>
      </form>
    </div>
  );
};

export default Postjob;
