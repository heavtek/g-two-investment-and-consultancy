import React  from "react";
import retail2 from '../../assets/img/retail2.jpg';
import retail3 from '../../assets/img/retail3.jpg';
import retail4coffee from '../../assets/img/retail4coffee.jpg'
import winary from '../../assets/img/winary.jpg';
import coffeeshop from '../../assets/img/coffeeshop.jpg'
import restaurant from '../../assets/img/restaurant.jpg'
import e1 from '../../assets/img/e1.jpg';
import e2 from '../../assets/img/e2.jpg';
import e3 from '../../assets/img/e3.jpg';
import e4 from '../../assets/img/e4.jpg';
import e5 from '../../assets/img/es.jpg';
import Button from '@mui/material/Button';
const Reatail= ()=>{
    return <>
   
     <section id="retailcoffeeshop" class="retail">

<div style={{backgroundImage:`url(${e3})`, backgroundAtachment: 'fixed',backgroundRepeat:'no-repeat',backgroundPosition:'center',backgroundSize:'cover'}} class="container">
<div class="row gx-0">

<div class="col-lg-6 d-flex flex-column justify-content-center">/
  <div class="content">
    <h2>Our Retail Businesses<br></br></h2>
    <p>
    Immerse yourself in our wide variety of retail<br></br>
business lines, from your favorite coffee products to<br></br> our classic cafes, fine dining restaurants and<br></br> winery.
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
<section id="retailcoffeeshop " class="coffeeshop ">

<div class="container">
    
  <div class="row gx-0">
  <div class="col-lg-6 d-flex align-items-center  " >
      <img src={coffeeshop} class="img-fluid  img" alt=""/>
    </div>
    <div class="col-lg-6 d-flex flex-column justify-content-center" >
   
      <div class="content">
          
        <h3>Who We Are</h3>
       
        <p>
        Coff­ee is more than simply a gift from Ethiopia to the rest of the globe. It is a way of<br></br> life for the locals, who have created their own particular drinking culture since the<br></br> discovery of coff­ee in Ethiopia’s southwestern highlands. At MamoKacha, we strive to<br></br> enhance our customers experiences by o­ffering the best quality coff­ee from Ethiopia,<br></br> the historical home of coff­ee where it all began.
        </p>
        <div class="text-center text-lg-start">
          <a href="#" class="btn-read-more d-inline-flex align-items-center justify-content-center align-self-center">
            <span>Read More</span>
          
          </a>
        </div>
      </div>
    </div>

    

  </div>
</div>

</section>
<section id="retailabt " class="retailabt ">

<div class="container">
  <div class="row gx-0">

    <div class="col-lg-6 d-flex flex-column justify-content-center" >
      <div class="content">
        <h3>Who We Are</h3>
       
        <p>
        Coff­ee is more than simply a gift from Ethiopia to the rest of the globe. It is a way of<br></br> life for the locals, who have created their own particular drinking culture since the<br></br> discovery of coff­ee in Ethiopia’s southwestern highlands. At MamoKacha, we strive to<br></br> enhance our customers experiences by o­ffering the best quality coff­ee from Ethiopia,<br></br> the historical home of coff­ee where it all began.
        </p>
        <div class="text-center text-lg-start">
          <a href="#" class="btn-read-more d-inline-flex align-items-center justify-content-center align-self-center">
            <span>Read More</span>
          
          </a>
        </div>
      </div>
    </div>

    <div class="col-lg-6 d-flex align-items-center  " >
      <img src={retail4coffee} class="img-fluid  img" alt=""/>
    </div>

  </div>
</div>

</section>
<section id="restaurant " class="restaurant ">

<div class="container">
  <div class="row gx-0">
  <div class="col-lg-6 d-flex align-items-center  " >
      <img src={restaurant} class="img-fluid  img" alt=""/>
    </div>
    <div class="col-lg-6 d-flex flex-column justify-content-center" >
   
      <div class="content">
          
        <h3>Who We Are</h3>
       
        <p>
        Coff­ee is more than simply a gift from Ethiopia to the rest of the globe. It is a way of<br></br> life for the locals, who have created their own particular drinking culture since the<br></br> discovery of coff­ee in Ethiopia’s southwestern highlands. At MamoKacha, we strive to<br></br> enhance our customers experiences by o­ffering the best quality coff­ee from Ethiopia,<br></br> the historical home of coff­ee where it all began.
        </p>
        <div class="text-center text-lg-start">
          <a href="#" class="btn-read-more d-inline-flex align-items-center justify-content-center align-self-center">
            <span>Read More</span>
          
          </a>
        </div>
      </div>
    </div>

   

  </div>
</div>

</section>
<section id="retailwinary " class="retailwinary ">

<div class="container">
  <div class="row gx-0">

    <div class="col-lg-6 d-flex flex-column justify-content-center" >
      <div class="content">
        <h3>Who We Are</h3>
       
        <p>
        Coff­ee is more than simply a gift from Ethiopia to the rest of the globe. It is a way of<br></br> life for the locals, who have created their own particular drinking culture since the<br></br> discovery of coff­ee in Ethiopia’s southwestern highlands. At MamoKacha, we strive to<br></br> enhance our customers experiences by o­ffering the best quality coff­ee from Ethiopia,<br></br> the historical home of coff­ee where it all began.
        </p>
        <div class="text-center text-lg-start">
          <a href="#" class="btn-read-more d-inline-flex align-items-center justify-content-center align-self-center">
            <span>Read More</span>
          
          </a>
        </div>
      </div>
    </div>

    <div class="col-lg-6 d-flex align-items-center  " >
      <img src={winary} class="img-fluid  img" alt=""/>
    </div>

  </div>
</div>

</section>

    </>
}
export default Reatail;