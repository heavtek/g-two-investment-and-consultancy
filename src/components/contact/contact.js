import React, {useState,useEffect} from "react";
import retail3 from '../../assets/img/retail3.jpg';
import e3 from '../../assets/img/e3.jpg';
import e1 from '../../assets/img/e1.jpg';
import e2 from '../../assets/img/e2.jpg';
import e4 from '../../assets/img/e4.jpg';
import axios from "axios";
import {getAllData,postData,deleteData, updateData} from '../api/Api'
import { toast } from "react-toastify";
 


const Contact =()=>{
  const[userName,setUserName]=useState("");
  const[subject, setSubject]=useState("");
  const[email,setEmail]=useState("");
  const[message,setMessage]=useState("");
  const [aboutdata, setAboutdata]=useState([]);
  const[address,setAddress]=useState("");
  const[phone,setPhone]=useState("");

  const[description,setDescription]=useState("");

  const getAboutdata=async()=>{
    const data=await getAllData('contactus')
    if(Array.isArray(data)){
    setAboutdata(data)
    }else{
        console.log(data)
    }
       
  }
  
  

 
  useEffect(async()=>{
    await getAboutdata();

  },[])
  const handelsubmit= async (e)=>{
    e.preventDefault()
    const formData = {
      email,userName,message,subject
    }
axios.post(`${process.env.REACT_APP_DB_SERVER_URL}feedback`,formData).then(
  (res)=>{
    toast.success("Subscribed Successfully!!");
    setEmail("");
    setUserName("");
    setMessage("");
    setSubject("");
  }
).catch((e)=>{
  toast.error("Subscription Failed,Please Try Again!!")
})

  }
    return <>
         <section id="retailcoffeeshop" class="retail">

<div style={{backgroundImage:`url(${e3})`,
 backgroundAttachment: 'fixed'
 ,backgroundRepeat:'no-repeat',
 backgroundPosition:'center',
 backgroundSize:'cover'}} class="container-fluid">
<div class="row gx-0">

<div class="col-lg-6 d-flex flex-column justify-content-center">/
  <div class="content">
    <h2 className="">Contact Us</h2>

    <p>
Contact us using the address below
    </p>
  
  </div>
</div>
</div>
</div>

</section>
    <section id="contact" class="contact pushup">

<div class="container" >

  <header class="section-header">
    <p className="">Contact Us</p>
  </header>

  <div class="row">
  {aboutdata.length?
    <div class="col-md-12">

      <div class="row ">
        <div class="col-md-4">
          <div class="info-box">
            <i class="bi bi-geo-alt"></i>
            <h3>  {aboutdata[0].address}</h3>
            <p><br></br> </p>
          </div>
        </div>
        <div class="col-md-4">
          <div class="info-box">
            <i class="bi bi-telephone"></i>
            <h3>HOW TO FIND US</h3>
            <p>  {aboutdata[0].description}</p>
          </div>
        </div>
        <div class="col-md-4">
          <div class="info-box">
            <i class="bi bi-envelope"></i>
          

            <h3>  Tel:   {aboutdata[0].phone}</h3>
            <p>Email:  {aboutdata[0].email} <br></br></p>
          </div>
        </div>
      
      </div>

    </div>:''}
      
  </div>
 <div className="row">
   
 <div class="col-md-12">
  <iframe
        src="https://maps.google.com/maps?q=Mamokacha&t=m&z=14&output=embed&iwloc=near"
      
        height="450"
        style={{ border: "0",width:'90vw',position:'relative',left:'-9%' }}
        allowfullscreen=""
        loading="lazy"
    
       
      ></iframe>
      </div>

 </div>
</div>
<div className="container" style={{width:'auto'}}>
 
      <div className="row ">
        <div className="col-md-3 col-sm-1 col-xs-0"></div>
        <div className="col-md-6 col-sm-10 col-xs-12">


        <form  onSubmit={handelsubmit} autoComplete={"on"}>
    

          <div class="form-group mb-2">
            <input type="text" value={userName}   onChange={(e)=>{
        setUserName(e.target.value)
      }}class="form-control custome-style" placeholder="Username" />
          </div>
          <div class="form-group mb-2">
            <input type="text"  value={subject}  onChange={(e)=>{
        setSubject(e.target.value)
      }}class="form-control custome-style" placeholder="Subject" required/>
          </div>
          <div class="form-group mb-2 ">
            <input type="email"  value={email} class="form-control custome-style" onChange={(e)=>{
        setEmail(e.target.value)
      }} name="email" placeholder="Your Email" required/>
          </div>

          <div class="form-group mb-2">
            <textarea class="form-control custome-style" value={message} onChange={(e)=>{
        setMessage(e.target.value)
      }} name="message" rows="4" placeholder="Message" required></textarea>
          </div>

          <div class="col-md-12 text-center">
           

            <button type="submit"  className="learn-more-service"  >Send Message</button>
          </div>

        
      </form>
        </div>
        <div className="col-md-3 col-sm-1 col-xs-0"></div>
        
      </div>
    </div>
</section>
  
    
    </>
}
export default Contact;