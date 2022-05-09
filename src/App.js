import Navbar from "./components/navbar/Navbar";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./assets/css/style.css"
import "./assets/css/dash.css"
import React, {useState,useEffect} from "react";
import {Routes,Route } from "react-router-dom";
import Dashboard from "./components/Dashboard/dashboard";
import Home from './components/home/home'
import Footer from "./components/footer/footer";
import About from "./components/about/about";
import Reatail  from "./components/retail/retail";
import Coffeeshops from "./components/retail/coffeeshops";
import Contact from "./components/contact/contact";
import OurTeam from "./components/ourteam/ourteam";
import Investment from "./components/services/investement";
import Training from "./components/services/training";
import Formative from "./components/services/formative";
import Bussiness from "./components/services/bussiness";
import Testimonials from "./components/Testimonials/testimonials";
import AboutForm from "./components/Dashboard/AboutForm";
import Sidebar from"./components/Dashboard/Sidebar"
import Aboutustable from "./components/Dashboard/AboutusTable";
import Error from "./components/Error/Error";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Login from "./components/login/Login";
import ResetPassword from "./components/login/ResetPassword"
import ResetPasswordLink from "./components/login/ResetPasswordLink";
import ReactGA from "react-ga4";

const App  = () => {
    const[token,setToken]=useState();
    const [user,setUser] =useState(null);
    const [showNav, setShowNav] = useState(true);
    useEffect(()=>{
        ReactGA.initialize(process.env.REACT_APP_MEASUREMENT_ID);
        ReactGA.send({hitType:"pageview",page: "/about"});
        ReactGA.send({hitType:"pageview",page: "/"});
        ReactGA.send({hitType:"pageview",page: "/dashboard"});
        ReactGA.send({hitType:"pageview",page: "/contact"});
        ReactGA.send({hitType:"pageview",page: "/ourteam"});
        ReactGA.send({hitType:"pageview",page: "/investment"});
        ReactGA.send({hitType:"pageview",page: "/bussiness"});
        ReactGA.send({hitType:"pageview",page: "/formative"});
        ReactGA.send({hitType:"pageview",page: "/training"});
        ReactGA.send({hitType:"pageview",page: "/testimonials"});
        console.log("changed");
    },[window.location.href])
    // if(!token){
    //     return<Login setToken={setToken}/>
    // }
    return <>
  
       <ToastContainer />
   
       {   showNav &&
     <Navbar/> 
  
       }

   <Routes>
   <Route path="/"  element={<Home/>}/>
      
        <Route path="/dashboard" element={<Dashboard Nav={setShowNav}/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/reset-password" element={<ResetPasswordLink/>} />
        <Route path="/reset-password/userEmail/:userEmail" element={<ResetPassword/>} />
        <Route path="/about" element={<About/>} />
        <Route path="/contact" element={<Contact/>}/>
        <Route path="/ourteam" element={<OurTeam/>}/>
        <Route path="/investment" element={<Investment/>}/>
        <Route path="/bussiness" element={<Bussiness/>}/>
        <Route path="/formative" element={<Formative/>}/>
        <Route path="/training" element={<Training/>}/>
        <Route path="/testimonials" element={<Testimonials/>}/>
        <Route path="*" element={<Error/>}/>
    </Routes>
    {   showNav &&
 <Footer/>
}
    </>  
}

export default App;