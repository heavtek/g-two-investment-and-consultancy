import React,{useState} from 'react';
import {useNavigate} from 'react-router-dom';
import emailjs from 'emailjs-com';
import axios from 'axios';
import {toast} from 'react-toastify';
const ResetPasswordLink = () =>{
    const [userEmail,setEmial] = useState('');
    const [userName,setUserName] = useState('');
    const [found,setFound] = useState(false);
    const [submitted,setSubmitted] = useState(false);
    const navigate = useNavigate();
    const url_location =window.location.href;
    const getUserData =() =>{
     axios.get(`${process.env.REACT_APP_DB_SERVER_URL}/get-single-data/${userEmail}`).then(
       (res)=>{
         console.log(res.data)
         if(res.data){
           setFound(true)
           setUserName(res.data.userName)
           setSubmitted(true);
         }else{
           console.log("user not found");
           setSubmitted(true);
           setFound(false)
         }
       }
     ).catch((error)=>console.log(error))
    }
    const handleSubmit = (e) =>{

     e.preventDefault();
     getUserData();
      if(found){
        emailjs.sendForm(
          'service_liv0asc',
          'template_ha4m86e',
          e.target,
          'jFLZE717DBcuEgzey'
        ).then(
          (res)=>{
            console.log(res);
            toast.success("Reset Password Link has been to your email address check it.. !")
          }
        ).catch(()=>{
          console.log("email sending error");
          toast.error("Something Went Wrong...");
        }
        )
      }
    }
     return <div className='container jumbotron mt-4 '>
         <br/>
         <div class="row ">
            <div className='col-md-4 col-sm-2 col-xs-1'></div>
            <div class="col-md-4 shadow text-center col-sm-8 col-xs-10">
                <div class="form-container ">
        
    <form onSubmit={handleSubmit} class="form-horizontal ">
  
      <div className='form-group'>
        <label htmlFor ="email">&nbsp;<b>Email</b></label> 
        
        <input type='hidden' name='message' value={`${url_location}/userEmail/${userEmail}`} />
        <input type='hidden' name='name' value='G-TWO'/>
        <input type='hidden' name='userName' value={userName}/>
        <input id='email' type='email' 
         value={userEmail}
         name="email"
         onChange={(e)=>{
           setEmial(e.target.value); 
         }}
        className='form-control' placeholder='Your email'  required/>      
       </div>
     {!found&&submitted?  <p className='bg-warning text-danger' style={{borderRadius:10,padding:10,fontWeight:'bold'}}>Email does not exits, check your email.</p>                 
     :''}
       <button type="submit" class="reset-btn" style={{width:'100% !important'}}>Send Rest Password Link </button>
      </form>
        </div>
        </div>
        </div>
         </div>
}

export default ResetPasswordLink;