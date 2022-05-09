import React,{useState,useEffect} from 'react';
import axios from 'axios';
import {Link,useNavigate} from 'react-router-dom';
import './Login.css';
const ResetPassword = () =>{

    const [userPassword,setUserPassword] = useState('');
    const [userconfirmPassword,setUserconfirmPassword] = useState('');
    const [error,setError] = useState('');
    const navigate = useNavigate();
    useEffect(()=>{
    const access_token = localStorage.getItem('accessToken');
      if(access_token){
       navigate('/admin-dashboard');
      }
    })
    const handleSubmit = async (e) =>{
        e.preventDefault();
        const userEmail = window.location.pathname.split('/')[2];
       axios.post(`${process.env.REACT_APP_DB_SERVER_URL}/reset-password/${userEmail}`,{userconfirmPassword,userPassword}).then(
          (res)=>{
            console.log('access to ken',res.data);
            localStorage.setItem('accessToken',JSON.stringify(res.data));
            navigate('/dashboard')
          }
      ).catch((e)=>{
        console.log('log in res',e)
        setError(true);
      })
    }
    return <div className='container'>
            
         <div class="row ">
        <div class="col-md-12">
          <h1 class="">Reset Password </h1>
          <form id="contact-form" onSubmit={handleSubmit} role="form">
          
            <div class="row">
               <div className="col-md-4 col-xs-1"></div>
            
                <div className='col-md-4 xol-xs-10'>
                
                <div class="form-group">
                  
                  <label className='form-label'> New Password</label>
                  <input  type='password'
                  value={userPassword} 
                  class="form-control form-controller form-controler form-control-name"
                    onChange={(e)=>{
                        setUserPassword(e.target.value)
                    }}/>                </div>
              <div class="form-group">
                  <label className='form-label'>Confirm Password</label>
                  
                  <input  class="form-control form-controller form-controler form-control-name"
                    value={userconfirmPassword}
                    onChange={(e)=>setUserconfirmPassword(e.target.value)}
                    type="password" required />

                </div>
                <div class="text-center card-footer">
          {error?<p className="bg-warning text-danger "> Password is not matched enter again!!</p>
         :''}
         
          </div>
             </div>
             <div className="col-md-4 col-xs-1"></div>
             <button class=" login-btn " type="submit">
                Reset Password</button>
             </div>
             </form>
             </div>
             </div>
            
      </div>
}

export default ResetPassword;