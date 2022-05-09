import React, {useState,useEffect} from "react";
import { Navigate } from "react-router-dom";
import { NavLink, useNavigate } from "react-router-dom";
import {getAllData,postData,deleteData, updateData} from '../api/Api'
const Footer  = () =>{
  const [aboutdata, setAboutdata]=useState([]);
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
    return <>
     
     <footer id="footer" class="footer bottom-fotter">



<div class="footer-top">
  <div class="container">
    <div class="row gy-4">
      <div class="col-md-4  footer-info">
    
          <h4>ABOUT US</h4>
        
        <p>GTWO Investment and Environmental PLC is a legally Ethiopian company since April 
2011 G.C. The Company formed by a group of diversified professionals under Ethiopian 
laws and regulations. It has a registered consultancy certificate from the concerned 
government organization. </p>
        <div class="social-links mt-3">
          <a href= {aboutdata[0]?.twitter}  class="twitter rotate-link"><i class="bi bi-twitter"></i></a>
          <a href= {aboutdata[0]?.facebook}  class="facebook rotate-link"><i class="bi bi-facebook"></i></a>
          <a href= {aboutdata[0]?.telegram}  class="linkedin rotate-link"><i class="bi bi-telegram bx bxl-telegram"></i></a>
          <a href= {aboutdata[0]?.linkedin}  class="linkedin rotate-link"><i class="bi bi-linkedin bx bxl-linkedin"></i></a>
        </div>
      </div>

      <div class="col-md-4 footer-links">
      
        <ul>
         <div className="row">
           <div className="col-md-6">
           <h4>Usefull links</h4>
           <li><i class="bi bi-chevron-right"></i> <NavLink onClick={()=>{
             window.scrollTo({
               top:0,
               behavior:'smooth'
             })
           }} to="/">Home</NavLink></li>
          <li><i class="bi bi-chevron-right"></i> <NavLink onClick={()=>{
             window.scrollTo({
               top:0,
               behavior:'smooth'
             })
           }} to="/aboutus">About us</NavLink></li>
          <li><i class="bi bi-chevron-right"></i> <NavLink onClick={()=>{
             window.scrollTo({
               top:0,
               behavior:'smooth'
             })
           }} to="/testimonials">Testimonials</NavLink></li>
          <li><i class="bi bi-chevron-right"></i> <NavLink onClick={()=>{
             window.scrollTo({
               top:0,
               behavior:'smooth'
             })
           }}  to="/ourteam">Our Team</NavLink></li>
          <li><i class="bi bi-chevron-right"></i> <NavLink onClick={()=>{
             window.scrollTo({
               top:0,
               behavior:'smooth'
             })
           }} to="/contact">Contact</NavLink></li>

           </div>
           <div className="col-md-6">
           <h4>Our Services</h4>
           <li><i class="bi bi-chevron-right"></i> <NavLink onClick={()=>{
             window.scrollTo({
               top:0,
               behavior:'smooth'
             })
           }} to="/investment">Investment Consultancy</NavLink></li>
          <li><i class="bi bi-chevron-right"></i> <NavLink onClick={()=>{
             window.scrollTo({
               top:0,
               behavior:'smooth'
             })
           }} to="/bussiness">Bussiness Approach </NavLink></li>
          <li><i class="bi bi-chevron-right"></i> <NavLink onClick={()=>{
             window.scrollTo({
               top:0,
               behavior:'smooth'
             })
           }} to="/formative">Formative Research</NavLink></li>
          <li><i class="bi bi-chevron-right"></i>
           <NavLink  onClick={()=>{
             window.scrollTo({
               top:0,
               behavior:'smooth'
             })
           }}  to="/training">Trainings</NavLink></li>
      

           </div>
         </div>
        </ul>
      </div>

      {aboutdata.length?
      <div class="col-md-4 footer-contact text-center text-md-start">
        <h4>Contact Us</h4>
        <p>
        {aboutdata[0].address}</p>
        <p> {aboutdata[0].description}</p>
        <p>
          <strong>Phone:</strong> {aboutdata[0].phone}
          
        </p>
        <p><strong>Email:</strong>  {aboutdata[0].email}</p>

      </div>:''}

    </div>
    <p className="copyright-custome text-light text-center"><strong>G-TWO INVESTMENT AND ENVIRONMENT 
CONSULTING PLC</strong>&nbsp;&copy;{new Date().getFullYear()}</p>

  </div>
</div>


</footer>
    
    
    </>

}
export default Footer ;