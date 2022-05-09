import React, {useState,useEffect} from "react";
import retail3 from '../../assets/img/retail3.jpg';
import coffeeshop from '../../assets/img/coffeeshop.jpg';
import winary from '../../assets/img/winary.jpg';
import restaurant from '../../assets/img/restaurant.jpg';
import t1 from '../../assets/img/t1.PNG';
import t2 from '../../assets/img/t2.PNG';
import t7 from '../../assets/img/t7.PNG';
import e3 from '../../assets/img/e3.jpg';
import axios from "axios";
import {getAllData,postData,deleteData, updateData} from '../api/Api'
import ReactShare from "../share/React-Share";
const Testimonials =()=>{
  const[ testimonalDescription, setTestimonalDescription]=useState("");
  const[testimonalName, setTestimonalName]=useState("");
  const[date,setDate]=useState("");
  const[testimonalImage,setTestimonalImage]=useState("");
  const [teamdata, setTeamdata]=useState([]);
  const getTeamdata=async()=>{
    const data=await getAllData('testimonal')
    if(Array.isArray(data)){
    setTeamdata(data)
    }else{
        console.log(data)
    }
       
  }
  useEffect(async () => {
    await getTeamdata()
            console.log("team",await getAllData('testimonal'))
           }, []);
    return  <>
             <section id="retailcoffeeshop" class="retail">

<div style={{backgroundImage:`url(${e3})`, backgroundAttachment: 'fixed',backgroundRepeat:'no-repeat',backgroundPosition:'center',backgroundSize:'cover'}} class="container-fluid">
<div class="row gx-0">

<div class="col-lg-6 d-flex flex-column justify-content-center">/
  <div class="content">
    <h2>Testimonials<br></br></h2>
{/* <h3> What Makes us Different</h3> */}
    <p>
    Having certified professionals in the area of Environmental and social Impact
assessment by Ministry of Environment,Forest and Climate Change (MEFCC)
and Oromia Environment, Forest and Climate Change Authority and business
consultant from Ethiopian<br></br>  Management Institute.
    </p>
  </div>
</div>
</div>
</div>

</section>
      <section id="recent-blog-posts" class="recent-blog-posts">
    
<div class="container text-center" >

  <header class="section-header">
    <p>Our Testimonials</p>
  </header>

  <div class="row">
  {teamdata.map((teams) =>(
    <div class="col-lg-4">
        <h4>{teams.testimonalName}</h4>
      <div class="post-box">
     
        <div class="post-img"><img src={teams.testimonalImage} class="test-img" alt=""/></div>
        <span class="post-date">{teams.date}</span>
        <h3 class="post-title">{teams.testimonalDescription}</h3>
        {/* <a href="blog-singe.html" class="readmore stretched-link mt-auto"><span>Read More</span><i class="bi bi-arrow-right"></i></a> */}
      </div>
    </div>
))}
  

   

  </div>
    
</div>
  <ReactShare/>
</section>
    
    
    </>
}
export default Testimonials;