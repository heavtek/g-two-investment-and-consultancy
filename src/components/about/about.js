import React, {useState,useEffect} from "react";
import abtimg from '../../assets/img/abtimg.jpg'
import mamo from '../../assets/img/mamo.jpg';
import e3 from '../../assets/img/e3.jpg';
import e1 from '../../assets/img/e1.jpg';
import e2 from '../../assets/img/e2.jpg';
import e4 from '../../assets/img/e4.jpg';
import edit1 from '../../assets/img/edit1.PNG';
import edit2 from '../../assets/img/edit2.PNG';
import edit3 from '../../assets/img/edit3.PNG';
import axios from "axios";
import {getAllData,postData,deleteData, updateData} from '../api/Api';
import { Check } from "@material-ui/icons";
import ReactShare from "../share/React-Share";
const About = () =>{
  const [aboutdata, setAboutdata]=useState([]);
  const[ourMission, setOurMission]=useState("");
  const[ourVision,setOurVision]=useState("");
  const[ourValues,setOurValues]=useState("");
  const[aboutusImage,setAboutusImage]=useState("");
  const[valuelist,setValuelist]=useState([]);
  const [makeusList,setmakeusList] = useState([]);
  const getAboutdata=async()=>{
    const data=await getAllData('aboutus')
    const listdata=await getAllData('values-list');
    const makedata= await getAllData('make-list');
    if(Array.isArray(data)){
    setAboutdata(data)
    setValuelist(listdata)
    setmakeusList(makedata);
    }else{
        console.log(data)
    }
       
  }
  
  
    useEffect(async () => {
  await getAboutdata();
        
       }, []);
    return <>
        <section >
      
               <section id="retailcoffeeshop" class="retail">
<div style={{backgroundImage:`url(${e3})`, backgroundAttachment: 'fixed',backgroundRepeat:'no-repeat',backgroundPosition:'center',backgroundSize:'cover'}} class="container-fluid">
<div class="row gx-0">

<div class="col-lg-6 d-flex flex-column justify-content-center">
  {aboutdata.length ?
  <div class="content">
    <h2>About Us<br></br></h2>

    <p>
    GTWO is a unique consulting firm that offers a variety of innovative services to
establish, improve and strengthen business organization in their investment 
participation of our nation. It primarily focuses on providing Investment and Environment
solutions to international and local businessmen (Investors)
    </p>
  </div> :''}
</div>
</div>
</div>

</section>



<div >
  <div class="row ">

    <div class="col-md-12 business-approach">
      <div class="row bg-light" >

                 
  <div class="row " style={{marginTop:50}}>
  <div class="col-md-6 col-sm-12 col-xs-12 overide-width custom-bg"  style={{backgroundImage:`url(${e4})`}}  >
  
    </div>
    <div class="col-md-6 col-sm-12  shadow col-xs-12 overide-width " >  
        <h3 className="text-center list-title">Who We Are</h3>
        {aboutdata.length
       >0?
       <div style={{fontSize:20}} className=' text-dark mt-2'>
       {aboutdata[0].aboutusDescription}
         </div>:''}
  
  </div>
</div>
      </div>
     
    </div>

    
  </div>
  <div className="row">
    <div className="col-md-3"></div>
    <div className="col-md-6">
      <div className="text-center"><h2 className="list-title">Business Approach</h2></div>
      <div className="card-text card-body">{aboutdata.length>0?aboutdata[0].businessApproach:''}</div>
    </div>
    <div className="col-md-3"></div>
  </div>
  <div className="row" >
   <div className="col-md-1"></div>
{aboutdata.length?
        <div className='col-md-5 overide-width  mr-2 bg-light ' style={{marginTop:100}} >
        <h2 className='text-center list-title'>Mission</h2>
        <p className='card-body' style={{textAlign:"left"}}>
        {aboutdata[0].ourMission}
        </p>
        </div>:''}
        {aboutdata.length?
   <div className='col-md-5  overide-width bg-light' style={{marginTop:100}}>
   <h2 className='text-center list-title'>Vission</h2>
        <p className='card-body'>
        {aboutdata[0].ourVision}
        </p>

   </div>:''}
   <div className="col-md-1"></div>
 
  </div>
  <div className="row" style={{marginTop:-40,paddingLeft:20}}>
         <div className="col-md-1"></div>
        <div className="col-md-5">
        {aboutdata.length?
      <div className='col-md-12  bg-light' style={{marginTop:100}}>
        
      <h2 className='text-center list-title'>Our Core Value and Principles</h2>
        <div className='card-body'>
        {aboutdata[0].ourValues}
        </div>
       {valuelist.length>0?valuelist.map((list)=>{
             return <ul className=" custom-list">
             <li className="ml-2" >{list.valueList}</li></ul>
        }):''}
      </div>:''}
        </div>
        <div className="col-md-5">
        {aboutdata.length?
      <div className='col-md-12  bg-light' style={{marginTop:100}}>
        
      <h2 className='text-center list-title'>What Make Us Different</h2>
        <div className='card-body'>

        </div>
       {makeusList.length>0?makeusList.map((list)=>{
             return <ul className=" custom-list">
             <li className="ml-2" >{list.valueList}</li></ul>
        }):''}
      </div>:''}
      <div className="col-md-1"></div>
        </div>
      </div>
</div>
<ReactShare/>
</section>

    </>

}
export default About;