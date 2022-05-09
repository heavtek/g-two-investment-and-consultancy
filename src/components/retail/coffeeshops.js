import React  , { useState,useEffect } from "react";
import retail3 from '../../assets/img/retail3.jpg';
import coffeeshop from '../../assets/img/coffeeshop.jpg';
import winary from '../../assets/img/winary.jpg';
import restaurant from '../../assets/img/restaurant.jpg'
 const Coffeeshops =()=>{
    const [currentValue,setCurrentValue] = useState(0);
    const index=0;
    const imgNames=[retail3,coffeeshop,winary,restaurant];
   
    const imagepath="assets/img/";
     const pickRandom = async () =>{
       for(let i=0;i<imgNames.length;i++){
       setCurrentValue( Math.floor(Math.random()*imgNames.length));
       }
      
       console.log("CURRENT IIm   ",currentValue)
     }
   
    useEffect(()=>{
     setInterval(async() => {
        await pickRandom();
     }, 3000);
    },[])
     return <>
         <section id="retailcoffeeshop" class="retailcoffeeshop">

<div style={{backgroundImage:`url(${retail3})`,backgroundRepeat:'no-repeat',backgroundPosition:'center',backgroundSize:'cover'}} class="container container-img">
<div class="row gx-0">

<div class="col-lg-6 d-flex flex-column justify-content-center">
<div class="content">

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
  <div class="col-lg-6 d-flex align-items-center  " >
      <img src={imgNames[currentValue]} class="img-fluid  img" alt=""/>
    </div>
    <div class="col-lg-6 d-flex flex-column justify-content-center" >
   
      <div class="content">
          
        <h3>Coffee Shops and Products</h3>
       
        <p>
        Coff­ee is more than simply a gift from Ethiopia to the rest of the globe. It is a way of<br></br> life for the locals, who have created their own particular drinking culture since the<br></br> discovery of coff­ee in Ethiopia’s southwestern highlands. At MamoKacha, we strive to<br></br> enhance our customers experiences by o­ffering the best quality coff­ee from Ethiopia,<br></br> the historical home of coff­ee where it all began.
        </p>
       
      </div>
    </div>

    

  </div>
</div>

</section>
     </>
   
 }
  export  default Coffeeshops;