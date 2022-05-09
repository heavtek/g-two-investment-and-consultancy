import React  , { useState,useEffect } from "react";
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
const OurTeam =()=>{
  const [teamdata, setTeamdata]=useState([]);
  const getTeamdata=async()=>{
    const data=await getAllData('team')
    if(Array.isArray(data)){
    setTeamdata(data)
    }else{
        console.log(data)
    }
       
  }
  useEffect(async () => {
    await getTeamdata()
            console.log("team",await getAllData('team'))
           }, []);
    return  <>
             <section id="retailcoffeeshop" class="retail">
<div style={{backgroundImage:`url(${e3})`, backgroundAttachment: 'fixed',backgroundRepeat:'no-repeat',backgroundPosition:'center',backgroundSize:'cover'}} class="container-fluid">
<div class="row gx-0">

<div class="col-lg-6 d-flex flex-column justify-content-center">/
  <div class="content">
    <h2>Our Team<br></br></h2>
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
    <p>Our Team</p>
  </header>
 
        <div className='row'>
        {teamdata.map((teams) =>(
           <div className='col-md-4 card' >
             <div className='card-body'>
               <img src={teams.memberImage}className="img-fluid pt-2"/>
               <div className='card-title list-title bg-light text-center'>{teams.memberName}</div>
               <div  className="card-body role-text card-text bg-light">
                 {teams.memberRole}
               </div>
             </div>
           </div>
            ))}

         


          
         
     
         </div>
   
  </div>
  <ReactShare/>
</section>
    
    
    </>
}
export default OurTeam;


// import  React from 'react';
// import team from '../../assets/img/team/team-1.jpg'
// const OurTeam =() =>{
//     return <div className="container">
//     </div>
// }

// export default OurTeam;