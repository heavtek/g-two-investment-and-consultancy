import React  , { useState,useEffect } from "react";
import retail3 from '../../assets/img/retail3.jpg';

import e1 from '../../assets/img/e1.jpg';
import e2 from '../../assets/img/e2.jpg';
import e3 from '../../assets/img/e3.jpg';
import e4 from '../../assets/img/e4.jpg';
import e5 from '../../assets/img/es.jpg';
import ReactShare from '../share/React-Share'

import axios from "axios";
import {getAllData,postData,deleteData, updateData} from '../api/Api'
const Investment =()=>{
  const [aboutinvestmentConsultency,setAboutinvestmentConsultency]=useState("");
  const [investmentTitle,setInvestmentTitle]=useState("");
  const [description,setDescription]=useState("");
  const [investmentImage,setInvestmentImage]=useState("");
  const [investdata, setInvestdata]=useState([]);
  const [investmentListData,setInvestmentListData] = useState([]);
    const [currentValue,setCurrentValue] = useState(0);
    
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
   
     const getInvestdata=async()=>{
      const data=await getAllData('investment');
      const listData = await getAllData('investment-list');

      if(Array.isArray(data)){
      setInvestdata(data);
      setInvestmentListData(listData);
      imgPaceholder = data[0].investmentImage;
      setImgNames(imgPaceholder)

      }else{
          console.log(data)
      }
         
    }
    
    
  
   
    useEffect(async()=>{
      await getInvestdata();
     setInterval(async() => {
        await pickRandom();
     }, 3000);
    },[])
     return <>
     
     <section id="retailcoffeeshop" class="retail">

<div style={{backgroundImage:`url(${e3})`, backgroundAttachment: 'fixed',backgroundRepeat:'no-repeat',backgroundPosition:'center',backgroundSize:'cover'}} class="container-fluid">
{investdata.length?
<div class="row gx-0">

<div class="col-lg-6 d-flex flex-column justify-content-center">
  <div class="content">
    <h2> Investment Consultacy Service</h2>

    <p>
    {investdata[0].aboutinvestmentConsultency}
    </p>
  
  </div>
</div>


</div>:''}
</div>

</section>     
 <section id="retailcoffeeshop" class="retailcoffeeshop">

<div style={{backgroundImage:`url(${retail3})`,backgroundRepeat:'no-repeat',backgroundPosition:'center',backgroundSize:'cover'}} class="container container-img">
<div class="row gx-0">

<div class="col-lg-6 d-flex flex-column justify-content-center">

</div>

</div>
</div>

</section>

<section id="retailcoffeeshops " style={{marginTop:-50}} class="retailcoffeeshops ">

<div class="container">
    
  <div class="row gx-0">
  {investdata.length > 0 ?<>
  
    <div class="col-lg-6 d-flex flex-column justify-content-center custom-bg custom-height "
     style={{backgroundImage:`url(${imgNames[currentValue]})`,backgroundColor:'transparent'}} >
 
 </div>
 <div class="col-lg-6 d-flex flex-column justify-content-center" >

   <div class="">
       
     <h3 className="text-center">{investdata[0].investmentTitle}</h3>
    
     <p className="small-padding">
   {investdata[0].description}
     </p>
    
   </div>
 </div>
  </>:''}



  </div>
</div>
<div className="container">
{investmentListData.length>0?
<div className="row mt-4">
  {investmentListData.map((list)=>{
    return   <div className="col-md-6 mt-3">
    <div className="card">
      <h4 className="list-title text-center">{list.investmentListName}</h4>
      <div className="card-body">{list.listDescription}</div>
    </div>
  </div>
  
  })}
</div>:''}
</div>
  <ReactShare/>
</section>
    
    
    </>
}
export default Investment;