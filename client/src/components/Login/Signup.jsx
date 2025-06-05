import React, { useState } from 'react'
import './Sign.css'
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'
const Signup = () => {
    const [name,setName]=useState();
    const [email,setEmail]=useState();
    const [password,setPassword]=useState();
    const navigate=useNavigate()
    const handleSubmit=(e)=>{
        e.preventDefault();
        axios.post('http://localhost:8080/register',{name,email,password})
        .then(result=>{console.log(result)
            navigate('/Login')
    })
        .catch(err=>console.log(err))
    }
  return (
    <>
<div className='d-flex justify-content-center align-items-center  vh-100  sin'>
    <div className='box p-3 rounded '>
        <h2 className='text-center' style={{marginBottom:"30px",fontSize:"34px",color:"blue"}}>SignUp</h2>
        <form onSubmit={handleSubmit}>
            <div className='mb-3'>
                <label htmlFor='email' style={{ display: 'block', marginBottom: '5px' }}>
                    <strong className='st'>Name</strong>
                </label>
                <input
                type='text'
                placeholder='Enter name'
                autoComplete='off'
                name='email'
                className='form-control-rounded-8 la'
                onChange={(e)=>setName(e.target.value)}
                />
            </div>
            <div className='mb-3'>
                 <label htmlFor='email' style={{ display: 'block', marginBottom: '5px' }}>
                    <strong className='st'>Email</strong>
                </label>
                <input
                type='email'
                placeholder='Enter email'
                autoComplete='off'
                name='email'
                className='form-control-rounded-8 la'
                onChange={(e)=>setEmail(e.target.value)}
                />
            </div>
             <div className='mb-3'>
                 <label htmlFor='email' style={{ display: 'block', marginBottom: '5px' }}>
                    <strong className='st'>Password</strong>
                </label>
                <input
                type='password'
                placeholder='Enter password'
                autoComplete='off'
                name='email'
                className='form-control-rounded-8 la'
                onChange={(e)=>setPassword(e.target.value)}
                />
            </div>
            <button type='submit' className='btn btn-primary w-100 rounded-2' style={{fontSize:"18px",marginBottom:"10px"}}>Signup as client</button>
            <button type='submit' className='btn btn-primary w-100 rounded-2' style={{fontSize:"18px",marginBottom:"5px"}}>Signup as freelancer</button>
           <label>
            <input type='checkbox'/>Accept all terms and conditions.
           </label>
            </form><br></br>
            <p>Already Have an Account</p>
            <a href='/Login' className='btn btn-default border w-100 bg-light rounded-0 text-decoration-none'>
                Login
            </a>
        
    </div>
</div>
    </>
  )
}

export default Signup;