import React, { useState,useEffect }  from 'react';
import { NavLink, useNavigate } from "react-router-dom";

import e2 from '../../assets/img/e2.jpg';
import e3 from '../../assets/img/e3.jpg';
import e4 from '../../assets/img/e4.jpg';
import e5 from '../../assets/img/es.jpg';
import boiled from '../../assets/img/boiled.gif';
import pattern from '../../assets/img/pattern.png';

import google from '../../assets/img/google.png';
import axios from "axios";
import {getAllData,postData,deleteData, updateData} from '../api/Api'
 import { Rating } from '@mui/material';
const Home = () =>{
  const [formativedata, setFormativedata]=useState([]);
  const [investdata, setInvestdata]=useState([]);
  const [businessdata, setBusinessdata]=useState([]);
  const [trainingdata, setTrainingdata]=useState([]);
const[clientsdata ,setClientsdata]=useState([]);
const [ratingData,setRatingData] = useState([])
 const [currentValueFormative,setCurrentValueFormative] = useState(0);
 const [currentValueBusiness,setCurrentValueBisiness] = useState(0);
 const [currentValueTrainig,setCurrentValueTraining] = useState(0);
 const [currentValueInvestment,setCurrentValueInvestment] = useState(0);


 const index=0;

 const regex = new RegExp(/^(ftp|http|https):\/\/[^ "]+$/);
 let imgPaceholderTraining=[];
 let imgPaceholderFormative=[];
 let imgPaceholderBusiness=[];
 let imgPaceholderInvestment=[];

 const [imgNamesFomrative,setImgNamesFormative] = useState([])
 const [imgNamesTraining,setImgNamesTraining] = useState([])
 const [imgNamesBusiness,setImgNamesBusiness] = useState([])
 const [imgNamesInventment,setImgNamesInvestment] = useState([])
  
   const pickRandom = async () =>{
     
    if(imgPaceholderTraining.length>0){
      for(let i=0;i<imgPaceholderTraining.length;i++){
        const value= Math.floor(Math.random()*imgPaceholderTraining.length);
            setCurrentValueTraining(value);
        }
    }
    if(imgNamesFomrative.length>0){
      for(let i=0;i<imgNamesFomrative.length;i++){
        const value= Math.floor(Math.random()*imgNamesFomrative.length);
            setCurrentValueFormative(value);
        }
    }
    if(imgPaceholderInvestment.length>0){
      for(let i=0;i<imgPaceholderInvestment.length;i++){
        const value= Math.floor(Math.random()*imgPaceholderInvestment.length);
            setCurrentValueInvestment(value);
        }
    }
    if(imgPaceholderBusiness.length>0){
      for(let i=0;i<imgPaceholderBusiness.length;i++){
        const value= Math.floor(Math.random()*imgPaceholderBusiness.length);
            setCurrentValueBisiness(value);
        }
    }
    

   }

  const getFormativedata=async()=>{
    const data=await getAllData('formative')
    const idata=await getAllData('investment')
    const bdata=await getAllData('business')
    const tdata=await getAllData('training')
    const cdata=await getAllData('client');
    const rating  = await getAllData('rating');
    console.log(data,idata,bdata,tdata,cdata)
    if(Array.isArray(data)){
    setFormativedata(data)
    setBusinessdata(bdata)
    setRatingData(rating)
    setInvestdata(idata)
    setTrainingdata(tdata)
    setClientsdata(cdata)
    imgPaceholderTraining = tdata[0].trainingImages;
    imgPaceholderFormative = data[0].formativeImage;
    imgPaceholderBusiness = bdata[0].businessImage;
    imgPaceholderInvestment = idata[0].investmentImage;
    setImgNamesFormative(imgPaceholderFormative);
    setImgNamesBusiness(imgPaceholderBusiness);
    setImgNamesInvestment(imgPaceholderInvestment);
    setImgNamesTraining(imgPaceholderTraining);
    
    }else{
        console.log(data)
    }
       
  }
 useEffect(async()=>{
  await getFormativedata();
  setInterval(async() => {
     await pickRandom();
  }, 5000);
 },[])

  return <>
    <div>
  <section id="hero"
  style={{marginTop:-150,backgroundImage:`url`}}
  class="hero d-flex align-items-center">

<div class="container-fluid">
  <div class="row"  style={{backgroundImage:`url(${imgNamesTraining[currentValueTrainig]})`
        ,backgroundSize:'cover',
        height:'75vh',
        position:'relative',
        zIndex:100
      ,backgroundRepeat:'no-repeat'}}>
    <div class="col-md-12 d-flex flex-column justify-content-center">
      
      <div className='landing-page'>
      <h1 >G-TWO INVESTMENT AND ENVIRONMENT CONSULTING PLC </h1>
      <h2 >Excellence Zone in Business, Investment, Environmental
              Impact Assessment and Development Projects</h2>
      <div >
        <div class="elementor-image" >
       												</div>
        <div style={{backgroundImage:`url(${pattern})`,backgroundRepeat:'no-repeat',backgroundSize:'200px'}} class="text-center text-lg-start btnimg ">
        <div class="text-center text-lg-start">
         <NavLink to={'/about'} >
         <button  class="landing-learn-more-service">
            <span>Learn more</span>
            <i class="bi bi-arrow-right"></i>
          </button>
         </NavLink>
        </div>
          
        </div>
      </div>
      </div>
    </div>
    
  </div>
</div>
</section>

{/* Custome Section */}
<section>
  <div className='contaniner-fluid'>
    <div className="custom-grid">
      <div className=' bg-style'  
      style={{backgroundImage:`url(${imgNamesTraining[currentValueTrainig]})`}}>
        <p className='service-description'><h3 className='text-center service-title'>Training Service</h3> 
        GTWO provides wide range of<strong> Training service</strong>  in the areas of investment,
business, environment and development activities for private organizations,
corporations, government...
   <NavLink to='/training'>
         <div class="">
          <button  className="learn-more-service">
           Learn more
            <i class="bi bi-arrow-right"></i>
          </button>
        </div>
            </NavLink>

</p>

      </div>
 
      <div className='
       bg-style'  style={{backgroundImage:`url(${imgNamesBusiness[currentValueBusiness]})`}}>
        <p className='service-description'> <h3 className='text-center service-title'>Business Consultancy Service</h3>
        GTWO provides wide range of <strong>Business Consultancy Service</strong> for private organizations,
corporations, government...
   <NavLink to='/bussiness'>
         <div class="">
          <button  className="learn-more-service">
           Learn more
            <i class="bi bi-arrow-right"></i>
          </button>
        </div>
            </NavLink>

</p>

      </div>
      <div className='
       bg-style'  style={{backgroundImage:`url(${imgNamesInventment[currentValueInvestment]})`}}>
      
        <p className='service-description'>
        <h3 className='text-center service-title'>Investment Consultancy</h3>  GTWO provides<strong> Investment and Environment Consultancy Service</strong> like  Feasibility Study for new project/business- detail study on the project 
justification, marketing aspect, technical aspect, Management and 
organization aspect, financial analysis aspect, economic analysis future 
expansion, implementation schedu...
   <NavLink to='/investment'>
         <div class="">
          <button  className="learn-more-service">
           Learn more
            <i class="bi bi-arrow-right"></i>
          </button>
        </div>
            </NavLink>

</p>

      </div>
      
      <div className='
       bg-style'  style={{backgroundImage:`url(${imgNamesFomrative[currentValueFormative]})`}}>
        <p className='service-description'>    <h3 className='text-center service-title'>Formative Researches</h3>
        Program monitoring & evaluation, Project baseline surveys, Project needs assessment, 
and Training needs assessment, Project appraisal, Project development, Assessment of 
needs of special groups and designing intervention packages.
   <NavLink to='/formative'>
         <div class="">
          <button  onClick={()=>{
            window.scrollTo({
              top:0,
              behavior:'smooth'
            })
          }} className="learn-more-service">
           Learn more
            <i class="bi bi-arrow-right"></i>
          </button>
        </div>
            </NavLink>

</p>

      </div>
    </div>
  </div>
</section>
 



<section id="rating" class="rating">

<div class="container" >
  <div class="row gx-0">
    <div class="col-lg-6 d-flex align-items-center" >
     
      <div className='typo'>
      <h1>{ratingData.length>0?ratingData[0].reviewNumber:''}</h1>
     {ratingData.length>0&&ratingData[0].reviewNumber!==0?<><Rating name="half-rating-read"
      defaultValue={ratingData[0].reviewNumber} precision={ratingData[0].reviewNumber} readOnly /><br></br></>:''}
  <h3>{ratingData.length>0?ratingData[0].ratingNumber:''} Rating</h3>
<h4>Google Reviews</h4>
</div>
<img src={google} class="img-fluid" alt=""/>
    </div>
    <div class="col-lg-6 d-flex flex-column justify-content-center" >
      <div class="content">
        <h2>GTWO Investment and Environmental PLC is a legally Ethiopian company since April
2011 G.C..</h2>
     <h3>Mr. Biniyam Alem/Tolosa Deso</h3>
        <p>
        The Company formed by a group of diversified<br></br> professionals under Ethiopian<br></br>
laws and regulations.

        </p>
      
        <img src={e3} class="img-fluid img" alt=""/>
       
      </div>
    </div>
  </div>
</div>

</section>
<section id="clients" class="clients">

<div class="container" >

  <header class="section-header">
    {/* <h2>Our Clients</h2> */}
    <p>Our Clients</p>
  </header>

  <div class="clients-slider swiper-container">
    <div class=" align-items-center">
      <div class="row">
      {clientsdata.length ?
    clientsdata.map((client)=>{
return   <>
         {regex.test(client.clientLogo)?<div class="col-md-2 mb-4" >
        <div class="swiper-slide">   
          <img src={client.clientLogo} title={client.clientName}
          class="img-fluid" alt={client.clientName} />
         </div>
     </div>:<div className={client.clientName?.length<=15?'col-md-2 mr-1':"col-md-4 mr-1"}>
        <div class="swiper-slide">   
    
          <p className="client-name">{client.clientName}</p>

         </div>
     </div>}
       </>
    })
  
  :''}
     
  
     
    
      </div>
     
    </div>
    <div class="swiper-pagination"></div>
  </div>
</div>

</section>

    </div>  

  </>
}

export default Home;