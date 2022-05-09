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
const Formative =() =>{
  const[aboutformativeConsultency,setAboutformativeConsultency]=useState("");
  const[formativeTitle, setFormativeTitle]=useState("");
  const[formativeImage,setFormativeImage]=useState("");
  const[description,setDescription]=useState("");
  const [formativedata, setFormativedata]=useState([]);
  const [trainingListData,setTrainingListData] = useState([]);
  const [formativeListData,setFormativeListData] = useState([]);
    const [currentValue,setCurrentValue] = useState(0);
    const index=0;

    const imagepath="assets/img/";
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
     const getFormativedata=async()=>{
      const data=await getAllData('formative')
      const listData = await getAllData('formative-list');
      if(Array.isArray(data)){
      setFormativedata(data)
      setFormativeListData(listData);
      imgPaceholder = data[0].formativeImage;
      setImgNames(imgPaceholder)
      }else{
          console.log(data)
      }
         
    }
    
    
  
   
    useEffect(async()=>{
      await getFormativedata();
     setInterval(async() => {
        await pickRandom();
     }, 3000);
    },[])
     return <>
                <section id="retailcoffeeshop" class="retail">
              
<div style={{backgroundImage:`url(${e3})`, 
backgroundAttachment: 'fixed',backgroundRepeat:'no-repeat',
backgroundPosition:'center',backgroundSize:'cover'}} class="container-fluid">
{formativedata.length?
<div class="row gx-0">

<div class="col-lg-6 d-flex flex-column justify-content-center">
  <div class="content">
    <h2> Formative Researches<br></br></h2>

    <p>
    {formativedata[0].aboutformativeConsultency.substring}
    </p>
  
    {/* <div class="text-center text-lg-start">
      <a href="#" class="btn-read-more d-inline-flex align-items-center justify-content-center align-self-center">
       
        <i class="bi bi-arrow-right"></i>
      </a>
    </div> */}
  </div>
</div>



</div>:''}
</div>

</section>

<section id="retailcoffeeshops " class="retailcoffeeshops ">

<div class="container">
    
  <div class="row gx-0">
  {formativedata.length > 0 ?<>
  
    <div class="col-lg-6 d-flex flex-column justify-content-center custom-bg custom-height " 
    style={{backgroundImage:`url(${imgNames[currentValue]})`}} >
 
 </div>
 <div class="col-lg-6 d-flex flex-column justify-content-center" >

   <div class="">
       
     <h3  className="text-center"> {formativedata[0].formativeTitle}</h3>
    
     <p className="small-padding">
   {formativedata[0].description}
     </p>
    
   </div>
 </div>
  </>:''}



  </div>
</div>
<div className="container">
{formativeListData.length>0?
  <div className="row mt-1">
  {formativeListData.map((list)=>{
    return   <ul className="col-md-6 custom-list">
    
     <li>{list.formativeListName}</li>
      {list.listDescription.length>0?<p>{list.listDescription}</p>:''}
  </ul>
  
  })}
</div>:''}
</div>
  <ReactShare/>
</section>
    
    
    </>
}
export default Formative;