import React,{useState,useEffect} from "react";
import { NavLink } from "react-router-dom";
import './navbar.css';
import logo from '../../assets/img/logo.png';
import retail1 from '../../assets/img/retail1.jpg';
import '../../assets/js/main.js';
const Navbar = () =>{
   const [isActive,setIsActive] = useState(false);
   const[deskop, setDesktop]=useState("navbar");
   const[mobile, setMobile]=useState("navbar-mobile");
   const[opened,seOpened]=useState(false);
    return  <>
    {/* <h1 className="text-light active text-center bg-success card-footer"> Navbar </h1>
     <NavLink 
      onClick={()=>{
          setIsActive(true)
      }}
      className={isActive?'':''}
     to='/about'>About</NavLink> */}
     
        <nav id="navbar" className={opened?mobile:deskop}>
    <div class="navbar img">
      <img src={logo}  class="img-fluid img" alt=""/>
      </div>
        <ul>
          
          <li><a class="nav-link scrollto active" href="#hero">Home</a></li>
          <li class="dropdown"><NavLink to='/retail'><span>Retail</span> <i class=" bi-caret-down"></i></NavLink>
        
          <ul>
              
              <li className="customdropdown">
                  <div className="container-fluid"
                  
                  >
                      <div className="row">
                      <div className="col"><img src={logo}  class="img-fluid " alt=""/></div>
                      <div className="col">section2</div>
                      <div className="col">section3</div>
                  </div>
                  </div>
              </li>
              
              
            </ul>
           
          </li>
          <li class="dropdown"><a href="#"><span>Agro Processing</span> <i class="bi bi-chevron-down"></i></a>
            <ul>
            <li className="customdropdown">
            
              <li> <img src={logo}  class="img-fluid img" alt=""/></li>
              <li> <img src={logo}  class="img-fluid img" alt=""/></li>
             </li>
            </ul>
          </li>
          <li class="dropdown"><a href="#"><span>Hotels</span> <i class="bi bi-chevron-down"></i></a>
            <ul>
           
             
                <ul>
              
                  <li><a href="#">Deep Drop Down 1</a></li>
                  <li><a href="#">Deep Drop Down 2</a></li>
                  <li><a href="#">Deep Drop Down 3</a></li>
                  <li><a href="#">Deep Drop Down 4</a></li>
                  <li><img src={logo}  class="img-fluid img" alt=""/></li>
                 
                </ul>
              
              <li><img src={retail1}  class="img-fluid img" alt="retail"/></li>
              <li><img src={retail1}  class="img-fluid img" alt=""/></li>
              <li><a href="#">Drop Down 4</a></li>
            </ul>
          </li>
          <li><NavLink  to='/about'>About Us</NavLink></li>
          <li><NavLink  to='/ourteam'>Our Team</NavLink></li>
          <li><NavLink to='/contact'>Contact Us</NavLink></li>

         
          <li><a class="getstarted scrollto" thref="#about">Newsletter Signup</a></li>
        </ul>
        <i
         onClick={()=>{
           seOpened(!opened);
         }}
         class={opened?'bi bi-x mobile-nav-toggle':'bi bi-list mobile-nav-toggle'}></i>
      </nav>
    </>
}

export default Navbar;