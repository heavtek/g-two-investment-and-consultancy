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
import ReactShare from '../share/React-Share';
import listImg from '../../assets/img/new-list-style1.png'

import axios from "axios";
import {getAllData,postData,deleteData, updateData} from '../api/Api'

const Bussiness =() =>{
  const[aboutBusinessConsultency,setAboutBusinessConsultency]=useState("");
  const[businessTitle, setBusinessTitle]=useState("");
  const[businessImage,setBusinessImage]=useState("");
  const[description,setDescription]=useState("");
  const [businessListData,setBusinessListData] = useState([]);
  const [teamdata, setTeamdata]=useState([]);
  const [currentValue,setCurrentValue] = useState(0);
  const getTeamdata=async()=>{
    const data=await getAllData('business')
    const listData = await getAllData('business-list');
    if(Array.isArray(data)){
    setTeamdata(data)
    setBusinessListData(listData);
    imgPaceholder = data[0].businessImage;
    setImgNames(imgPaceholder)
    
    }else{
        console.log(data)
    }
       
  }

  
  const index=0;
  let imgPaceholder=[];
  const [imgNames,setImgNames] = useState([])

    const pickRandom = async () =>{
      
     if(imgPaceholder.length>0){
       for(let i=0;i<imgPaceholder.length;i++){
         const value= Math.floor(Math.random()*imgPaceholder.length);
             setCurrentValue(value);
         }
     }
     
 
    }
   
    useEffect( async ()=>{
      await getTeamdata();
     setInterval(async() => {
        await pickRandom();
     }, 5000);
    },[])
     return <>
                  <section id="retailcoffeeshop" class="retail">

<div style={{backgroundImage:`url(${e3})`, backgroundAttachment: 'fixed',backgroundRepeat:'no-repeat',backgroundPosition:'center',backgroundSize:'cover'}} class="container-fluid">
<div class="row gx-0">

<div class="col-lg-6 d-flex flex-column justify-content-center">
  <div class="content">
    <h2>Business Consultancy Service <br></br></h2>

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
<section id="retailcoffeeshops " class="retailcoffeeshops ">

<div class="container">
    
  <div class="row gx-0">
  {teamdata.map((teams) =>(
<>
  <div class="col-md-6 d-flex flex-column justify-content-center custom-bg custom-height "
   style={{backgroundImage:`url(${imgNames[currentValue]})`,backgroundColor:'transparent'}} >
 
    </div>
    <div class="col-md-6 d-flex flex-column justify-content-center" >
   
      <div class="">
          
        <h3  className="text-center"> {teams.businessTitle}</h3>
       
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
{businessListData.length>0?

  <div className="row mt-1">
         {businessListData.map((list)=>{
           return <div className="col-md-6 "><p className=" remove-margin">
             <img src={listImg}/>
             {list.businessListName}</p>
            {list.listDescription.length>0?<p className="remove-margin">{list.listDescription}</p>:''}
            </div>
         })}
   
 
</div>:''}
</div>
 <ReactShare/>
</section>
    
    
    </>
}
export default Bussiness;