import {useState,useEffect} from 'react';
import './Login.css';
import {Link, useNavigate} from 'react-router-dom';
import axios from 'axios';
const Login = () =>{
    const navigate = useNavigate();
    const [userPassword,setUserPassword] = useState('');
    const [userEmail,setUserEmail] = useState('');
    const access_token = window.localStorage.getItem('accessToken');
    const [success,setSuccess] = useState(true);
    useEffect(()=>{
        if(access_token){
            navigate('/dashboard');
        }
    },[access_token]);

    const handleSubmit =(e)=>{
        e.preventDefault();
        axios.post(`${process.env.REACT_APP_DB_SERVER_URL}login`,{userEmail,userPassword}).then(
            (res)=>{
                window.localStorage.setItem('accessToken',JSON.stringify(res.data));
              setSuccess(true);
              navigate('/dashboard');
            }
        ).catch((e)=>{
            setSuccess(false)
           console.log("Unable to log in....");
        })
    }
     return <div className='text-center mb-4 container'>
          <form onSubmit={handleSubmit} role="form">
          <div className='row'>
              <div className='col-md-4 col-xs-1'></div>
              <div className='col-md-4 col-xs-10'>
    
                  <div className='form-group'>
                      <label>Email</label>
                      <input className="form-control"
                      value={userEmail}
                      onChange={(e)=>{
                          setUserEmail(e.target.value)
                      }}
                      required
                      type={'email'} />
                  </div>
                  <div className='form-group mb-1'>
                      <label>Password</label>
                    <input required className="form-control" type={'password'}
                    value={userPassword}
                     onChange={(e)=>{
                         setUserPassword(e.target.value);
                     }}
                  />
                  </div>
              </div>

              <div className='col-md-4 mb-1 col-xs-1'></div>
              {!success?<p className='error text-danger'> Email or Password is Invalid!!</p>:''}

              <button type='submit' className='login-btn'>Login</button>
              <p>
                  <Link to='/reset-password'>Forgot Password?</Link>
              </p>
          </div>
      </form>

     </div>
}

export default Login;