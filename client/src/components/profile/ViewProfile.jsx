import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import './ViewProfile.css';

const ViewProfile = () => {
  const [user, setUser] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [skills, setSkills] = useState([]);
  const [location, setLocation] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [description, setDescription] = useState('');
  const [experience, setExperience] = useState('');
  const [resume, setResume] = useState(null);
  const [companyLogo, setCompanyLogo] = useState(null);
  const [projects, setProjects] = useState('');
const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const allSkills = [
    'Frontend Developer',
    'Backend Developer',
    'Full Stack',
    'Data Analyst',
    'Photography',
    'Video Editor',
    'Online Tutor'
  ];

  const skillOptions = allSkills.map(skill => ({ value: skill, label: skill }));

  useEffect(() => {
    const loadUserData = () => {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        const parsed = JSON.parse(storedUser);
        setUser(parsed);
        setPhoneNumber(parsed.phoneNumber || '');
        setSkills(parsed.skills?.map(skill => ({ value: skill, label: skill })) || []);
        setLocation(parsed.location || '');
        setCompanyName(parsed.companyName || '');
        setDescription(parsed.description || '');
        setProjects(parsed.projects || '');
        setExperience(parsed.experience || '');
        if (parsed.companyLogo) {
          const logoUrl = parsed.companyLogo.startsWith('http') 
            ? parsed.companyLogo 
            : `https://freelancer-finder.onrender.com/uploads/${parsed.companyLogo}`;
          setCompanyLogo(logoUrl);
        }
      }
    };

    loadUserData();
  }, []);
const showNotification = (message, success) => {
    setPopupMessage(message);
    setIsSuccess(success);
    setShowPopup(true);
    setTimeout(() => {
      setShowPopup(false);
    }, 3000);
  };
  const handleUpdate = async () => {
    const formData = new FormData();
    formData.append('email', user.email);
    formData.append('phoneNumber', phoneNumber);
    formData.append('skills', JSON.stringify(skills.map(s => s.value)));
    formData.append('location', location);
    
    if (user.role === 'freelancer') {
      if (resume) formData.append('resume', resume);
      formData.append('experience', experience);
      formData.append('description', description);
      formData.append('projects', projects);
    }
    
    if (user.role === 'client') {
      if (companyLogo instanceof File) {
        formData.append('companyLogo', companyLogo);
      }
      formData.append('companyName', companyName);
      formData.append('description', description);
    }

    try {
      const response = await fetch('https://freelancer-finder.onrender.com/api/employees/update', {
        method: 'PUT',
        body: formData,
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || "Update failed");
      }

      const result = await response.json();
      
      if (result.success) {
        const updatedUser = result.updatedUser;
        
       
        const logoUrl = updatedUser.companyLogo 
          ? updatedUser.companyLogo.startsWith('http') 
            ? updatedUser.companyLogo 
            : `https://freelancer-finder.onrender.com/uploads/${updatedUser.companyLogo}`
          : null;

       
        localStorage.setItem("user", JSON.stringify({
          ...updatedUser,
          companyLogo: updatedUser.companyLogo
        }));

        setUser({
          ...updatedUser,
          companyLogo: logoUrl 
        });
        setPhoneNumber(updatedUser.phoneNumber || '');
        setSkills(updatedUser.skills?.map(skill => ({ value: skill, label: skill })) || []);
        setLocation(updatedUser.location || '');
        setCompanyName(updatedUser.companyName || '');
        setDescription(updatedUser.description || '');
        setProjects(updatedUser.projects || '');
        setExperience(updatedUser.experience || '');
        setCompanyLogo(logoUrl);
showNotification("Profile updated successfully!", true);
       
      } else {
        showNotification("Update failed: " + result.message, false);
        
      }
    } catch (err) {
      console.error("Update error:", err);
      showNotification("Update failed: " + err.message, false);
      
    }
  };

  if (!user) return <div>Loading...</div>;

  return (
    <div className='profile-container'>
     {showPopup && (
        <div className={`popup-notification ${isSuccess ? 'success' : 'error'}`}>
          {popupMessage}
        </div>
      )}
      <div className='Profile'>
        <img 
          src={
            user?.profileImage
              ? (user.profileImage.startsWith('http') 
                  ? user.profileImage 
                  : `https://freelancer-finder.onrender.com/uploads/${user.profileImage}`)
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
            <h3><strong>Location:</strong>
              <input 
                type='text' 
                value={location} 
                onChange={(e) => setLocation(e.target.value)} 
                className='input'
              />
            </h3>
          </div>
          
          <h3><strong>Description:</strong>
            <textarea
              name="description"
              className="desc"
              placeholder="Type job description..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </h3>

          {user?.role === 'freelancer' ? (
            <div className='freelancer-section'>
              
              <h3><strong>Skills:</strong></h3>
     <Select
      isMulti
      options={skillOptions}
      value={skills}
      onChange={setSkills}
      placeholder="Select skills..."
    className='Select' />
    <h3><strong>Experience:</strong>
    <input type='number' value={experience}  onChange={(e)=>setExperience(e.target.value)}/>
    </h3>
    <div className='res'>
       <label style={{ display: "flex" }}>
         <h3><strong>Resume:</strong></h3>
          {user.resume && (
                    <img
                      src={user.resume}
                      alt="resume"
                      style={{ width: '100px', height: '100px', marginTop: '10px' }}
                    />
                  )}
         <input type='file' onChange={(e) => setResume(e.target.files[0])} />
</label>   
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
          ) : user?.role === 'client' ? (
            <div className='client-section'>
              <div >
              <div>
                  <h3><strong>Company Name:</strong></h3>
                  <input
                    type='text'
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    className='input'
                  />
                </div>
              </div>
                <div>
                  <h3><strong>Company Logo:</strong></h3>
                  <div style={{border:"1px solid white",padding:"10px"}}>
                  {user.companyLogo && (
                    <img
                      src={user.companyLogo}
                      alt="Company Logo"
                      style={{ width: '100px', height: '100px', marginTop: '10px' }}
                    />
                  )}
                  <input 
                    type='file' 
                    onChange={(e) => setCompanyLogo(e.target.files[0])} 
                    style={{marginTop: "12px",color:"white"}}
                  />
                  </div>
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