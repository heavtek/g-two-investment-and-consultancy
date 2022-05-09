import React from "react";
import Button from '@mui/material/Button';
import { NavLink } from "react-router-dom";
import './error.css'
const Error =()=>{
return<>

<div className="not-found-container">
    <div className="not-found-parent">
   <h1 className="not-found-text"> Page Not Found!!</h1>
  <b className="not-found-status">404</b>
 <NavLink to="/"><button className="learn-more-service" >Go to Homepage</button></NavLink>

    </div>
</div>
</>
} 
export default Error