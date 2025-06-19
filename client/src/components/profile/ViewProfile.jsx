import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import './ViewProfile.css';

const ViewProfile = () => {
  const [user, setUser] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [skills, setSkills] = useState([]);
  const [location,setLocation]=useState('');
  const [position,setPosition]=useState('');
  const [description,setDescription]=useState('');
  const [experience, setExperience] = useState('');
const [rating, setRating] = useState('');
const [resume, setResume] = useState(null);
const [companyLogo, setCompanyLogo] = useState(null);
const [projects,setProjects]=useState('');


  const allSkills = ['Frontend Developer','Backend Developer','Full Stack','Data Analyst','Photography','Video Editor','Online Tutor'];

  const skillOptions = allSkills.map(skill => ({ value: skill, label: skill }));

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsed = JSON.parse(storedUser);
      setUser(parsed);
      setPhoneNumber(parsed.phoneNumber || '');
      setSkills(parsed.skills?.map(skill => ({ value: skill, label: skill })) || []);
      setLocation(parsed.location || '');
      setPosition(parsed.position|| '');
      setDescription(parsed.description||'');
      setProjects(parsed.project||'');
    }
  }, []);
  const handleUpdate = async () => {
  const formData = new FormData();
  formData.append('email', user.email);
  formData.append('phoneNumber', phoneNumber);
  formData.append('skills', JSON.stringify(skills.map(s => s.value)));
  
   formData.append('location', location);
  if (user.role === 'freelancer') {
    if (resume) formData.append('resume', resume);
    formData.append('experience', experience);
    formData.append('rating', rating);
    formData.append('description', description);
    formData.append('projects',projects);
  }
  if (user.role === 'client') {
    if (companyLogo) formData.append('companyLogo', companyLogo);
    // formData.append('location', location);
    formData.append('position', position);
    formData.append('description', description);
  }

  try {
    const response = await fetch('http://localhost:8080/api/employees/update', {
      method: 'PUT',
      body: formData,
    });

    if (!response.ok) {
      const errorText = await response.text(); 
      console.error("Server error:", errorText);
      alert("Update failed: " + response.statusText);
      return;
    }

    const result = await response.json();
    if (result.success) {
      alert("Profile updated");
      localStorage.setItem("user", JSON.stringify(result.updatedUser));
    } else {
      alert("Update failed: " + result.message);
    }
  } catch (err) {
    console.error("Update error:", err);
    alert("Update failed: " + err.message);
  }
};


  if (!user) return <div>Loading...</div>;

  return (
    <div className='profile-container'>
      <div className='Profile'>
        
        <img 
 src={
  user?.profileImage
    ? (user.profileImage.startsWith('http') ? user.profileImage : `http://localhost:8080/uploads/${user.profileImage}`)
    : '/default-profile.png'
}

  alt="Profile"
  style={{borderRadius:"50%",height:"250px",width:"250px"}}
/>
       
        <div className='profile-details'>
          <h3><strong>Name:</strong> {user.name}</h3>
          <h3><strong>Email:</strong> {user.email}</h3>
          <h3><strong>Role:</strong> {user.role}</h3>
           <div>
      <h3><strong>Location:</strong><input type='text' value={location} onChange={(e)=>setLocation(e.target.value)} className='input'></input></h3>
    </div>
     <h3><strong>Description:</strong>
    
 <textarea
          name="description"
          className="desc"
          placeholder="Type job description..."
          value={description}
          onChange={(e)=>setDescription(e.target.value)}
        />
</h3>
        {user?.role === 'freelancer' ? (
  <div className='freelancer-section'>
    <div className='res'>
      <label style={{ display: "flex" }}>
        <h3><strong>Resume:</strong></h3>
        <input type='file' onChange={(e) => setResume(e.target.files[0])} />
      </label>
    </div>

    <h3><strong>Phone:</strong>
      <input
        type="text"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
        placeholder="Enter phone number"
        style={{ height: "50px" }}
       className='input'/>
    </h3>

    <h3><strong>Skills:</strong></h3>
    <Select
      isMulti
      options={skillOptions}
      value={skills}
      onChange={setSkills}
      placeholder="Select skills..."
    />
<h3><strong>No. of Years Experience:</strong>
  <input type='number' value={experience} onChange={(e) => setExperience(e.target.value)}  className='input'/>
</h3>
<h3><strong>Projects Done:</strong>
<textarea
          name="description"
          className="desc"
          placeholder="Type job description..."
          value={projects}
          onChange={(e)=>setProjects(e.target.value)}
        />
</h3>

<h3><strong>Rating:</strong>
  <input type='text' value={rating} onChange={(e) => setRating(e.target.value)} className='input'/>
</h3>
 <button
      onClick={handleUpdate}
      style={{
        width: "200px",
        marginTop: "30px",
        height: "60px",
        borderRadius: "5px",
        color: "white",
        backgroundColor: "green",
        fontWeight: "700",
        fontSize: "26px"
      }}
    >
      Update
    </button>
  </div>
) : user?.role === 'client' ? (
  <div className='client-section'>
    <div style={{display:"flex"}}>
      <h3><strong>Company Logo:</strong></h3>
      <input type='file' onChange={(e) => setCompanyLogo(e.target.files[0])}  className='input' style={{marginTop:"12px",height:"30px"}}/>
    </div>
    {/* <div>
      <h3><strong>Location:</strong><input type='text' value={location} onChange={(e)=>setLocation(e.target.value)} className='input'></input></h3>
    </div> */}
    <div>
      <h3><strong>Company Name:</strong><input type='text' value={position} onChange={(e) => setPosition(e.target.value)} className='input'></input> </h3>
    </div>
    <div>
    {/* <h3><strong>Description:</strong><input type='text' value={description} onChange={(e) => setDescription(e.target.value)} className='input'></input></h3> */}
    </div>
    <button
  onClick={handleUpdate}
  style={{
    width: "200px",
    marginTop: "30px",
    height: "60px",
    borderRadius: "5px",
    color: "white",
    backgroundColor: "green",
    fontWeight: "700",
    fontSize: "26px"
  }}
>
  Update
</button>

  </div>
) : (
  <div>
    <h3>No role data available.</h3>
  </div>
)}

        </div>
      </div>
    </div> 
  );
};

export default ViewProfile;
