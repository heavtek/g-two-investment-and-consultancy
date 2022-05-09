import React  , { useState,useEffect } from "react";
import retail3 from '../../assets/img/retail3.jpg';
import coffeeshop from '../../assets/img/coffeeshop.jpg';
import winary from '../../assets/img/winary.jpg';
import restaurant from '../../assets/img/restaurant.jpg';
import e1 from '../../assets/img/e1.jpg';
import e2 from '../../assets/img/e2.jpg';
import e3 from '../../assets/img/e3.jpg';
import e4 from '../../assets/img/e4.jpg';
import e5 from '../../assets/img/es.jpg';
import ReactShare from '../share/React-Share'
import axios from "axios";
import {getAllData,postData,deleteData, updateData} from '../api/Api'

const Training =() =>{
  const[abouttrainingConsultency,setAbouttrainingConsultency]=useState("");
  const[trainingTitle, setTrainingTitle]=useState("");
  const[trainingImages,setTrainingImages]=useState("");
  const[description,setDescription]=useState("");
  const [trainingListData,setTrainingListData] = useState([]);
  const [teamdata, setTeamdata]=useState([]);
  const getTeamdata=async()=>{
    const data=await getAllData('training')
    const listData = await getAllData('training-list');
   
    if(Array.isArray(data)){
    setTeamdata(data)
    setTrainingListData(listData);
    }else{
        console.log(data)
    }
       
  }

    const [currentValue,setCurrentValue] = useState(0);
    const index=0;
    const imgNames=[e1,e2,e3,e4,e5];
   
    const imagepath="assets/img/";
     const pickRandom = async () =>{
       for(let i=0;i<imgNames.length;i++){
       setCurrentValue( Math.floor(Math.random()*imgNames.length));
       }
      
     
     }
   
    useEffect(async ()=>{
     await getTeamdata();
     setInterval(async() => {
        await pickRandom();
     }, 5000);
    },[])
     return <>
               <section id="retailcoffeeshop" class="retail">

<div style={{backgroundImage:`url(${e3})`, backgroundAttachment: 'fixed',
backgroundRepeat:'no-repeat',backgroundPosition:'center'
,backgroundSize:'cover'}} class="container-fluid">
<div class="row gx-0">

<div class="col-md-6">
  <div class="content">
    <h2> Trainings Service<br></br></h2>

    <p>
    
    </p>
  
    {/* <div class="text-center text-lg-start">
      <a href="#" class="btn-read-more d-inline-flex align-items-center justify-content-center align-self-center">
       
        <i class="bi bi-arrow-right"></i>
      </a>
    </div> */}
  </div>
</div>

{/* <div class="col-lg-6 d-flex align-items-center" >
  <img src={image1} class="img-fluid" alt=""/>
</div> */}

</div>
</div>

</section>
<section >

<div class="container">
    
  <div class="row gx-0">
  {teamdata.map((teams) =>(
<>
  <div class="col-lg-6 d-flex flex-column justify-content-center custom-bg custom-height " 
    
  style={{backgroundImage:`url(${teams.trainingImages[currentValue]})`,backgroundColor:'transparent'}} >
 
    </div>
    <div class="col-lg-6 d-flex flex-column justify-content-center" >
   
      <div class="">
          
        <h3  className="text-center"> {teams.trainingTitle}</h3>
       
        <p className="small-padding">
      {teams.description}
        </p>
       
      </div>
    </div>

    </>
))}
  </div>
</div>
<div className="container">
{trainingListData.length>0?
<div className="row mt-1">
  {trainingListData.map((list)=>{
    return   <ul className="col-md-6 custom-list">
    
     <li>{list.trainingListName}</li>
      {list.listDescription.length>0?<p>{list.listDescription}</p>:''}
  </ul>
  
  })}
</div>:''}
</div>
  <ReactShare/>
</section>
    
    
    </>
}
 export default Training;