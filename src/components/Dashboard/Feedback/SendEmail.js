import { Button } from '@mui/material';
import  React, { useState } from 'react';
import {getAllData,postData,deleteData, updateData} from '../../api/Api'
const SendEmail = () =>{
    const [emailLink,setEmailLink] = useState('')
    const [subject,setSubject] = useState('')
    const [message,setMessage] = useState('')
    return <div className='contaniner mt-4'>
        <div className='col-md-2'></div>
        <div className='col-md-8'>
        <form>
        <div class="row gy-4">

          <div class="col-md-6">
            <input type="text" value={subject}   onChange={(e)=>{
        setSubject(e.target.value)
      }}class="form-control" placeholder="subject" />
          </div>
          <div class="col-md-6">
            <textarea rows={2} type="text" value={message}  onChange={(e)=>{
        setMessage(e.target.value)
      }}class="form-control" placeholder="message" required/>
          </div>
          <div class="col-md-6 ">
            <input type="email" value={emailLink} class="form-control" onChange={(e)=>{
        setEmailLink(e.target.value)
      }} name="email" placeholder="Url" required/>
          </div>
  <div className='col-md-6'> 
  <Button onClick={async ()=>{
                const formData = {
                  subject,emailLink,message
                }
               const res= await postData('send-email',formData);
              
              }
              }color="success" variant='contained' >Send Message</Button>
          </div>

        
  </div>
      
        
      </form>
        </div>
        <div className='col-md-2'></div>
    </div>
}
export default SendEmail;