import React,{useState,useEffect} from "react";
import { NavLink,useNavigate} from "react-router-dom";
import './navbar.css';
import Investment from '../../assets/img/investment.jpg';
import business from '../../assets/img/business.jpeg';
import Capture from '../../assets/img/Capture.PNG';
import invest3 from '../../assets/img/invest3.PNG';
import Training from '../../assets/img/Trainingservice.jpg';
import formative from '../../assets/img/formatives.png';
import invest from '../../assets/img/invest_new.jpg';
import bus  from  '../../assets/img/bisiness_new.jpg';
import train from  '../../assets/img/train_new.jpg';

const Navbar = () =>{
   const [isActive,setIsActive] = useState(false);
   const[deskop, setDesktop]=useState("navbar");
   const[mobile, setMobile]=useState("navbar-mobile");
   const [serviceClicked,setServiceClicked] = useState(false);
   const[opened,seOpened]=useState(false);
   const navigate = useNavigate();
    return  <>
    <nav id="navbar" style={{zIndex:200}} className={opened?mobile+" navbar-scroll ":deskop+" navbar-scroll " }>
    <div class="navbar img ">
      <img src={Capture}  
       class="img-fluid   logo-position    img" alt=""/>
      </div>
        <ul>
          <li className="nav-style"
           onClick={()=>{
             if(opened){
              seOpened(!opened);
            }
          }} onMouseEnter={()=>{
           const dpcontent = document.getElementById('dropdown-content');
            dpcontent.classList.remove('show-dropdown');
            setServiceClicked(false);
            dpcontent.classList.remove('enable-pointer');
            dpcontent.classList.add('disable-pointer');
         }} ><NavLink  to='/'>Home</NavLink></li>
         <li    onMouseOver={()=>{
            const servicesId = document.getElementById('services');
            servicesId.classList.remove('active');
         }}  onClick={()=>{
            setServiceClicked(!serviceClicked);
           const dpcontent = document.getElementById('dropdown-content');
           console.log(serviceClicked);
            dpcontent.classList.toggle('show-dropdown');
            if(serviceClicked){
              dpcontent.classList.add('disable-pointer')
            }else{
              dpcontent.classList.remove('disable-pointer')
              dpcontent.classList.add('enable-pointer');
            }
            dpcontent.classList.toggle('absolute-position');
         }} 
         
         className="new-dropdown">
           <NavLink id="services" 
         
          to='#'  >Services</NavLink>
           <div onMouseOut={()=>{
             
            }} id="dropdown-content" className="new-dropdown-content">
            <div  className="new-drodonw-item"
              onClick={()=>{
                navigate('/training');
                const dpcontent = document.getElementById('dropdown-content');
                dpcontent.classList.add('disable-pointer');
                dpcontent.classList.remove('enable-pointer');
               if(serviceClicked){
                if(opened){
                  seOpened(!opened);
                }
               }
              }}
            >
            <img    className="dropdown-img" src={train} />
             <p  className="dropdown-text">Trainings Service </p>
            </div>
            <div  onClick={()=>{
              navigate('/bussiness');
              const dpcontent = document.getElementById('dropdown-content');
              dpcontent.classList.add('disable-pointer');
              dpcontent.classList.remove('enable-pointer');
              if(opened){
                seOpened(!opened);
              }
            }} className="new-drodonw-item">
            <img   className="dropdown-img" src={bus} />
             <p   className="dropdown-text"> Business Consultancy </p>
            </div>
            <div onClick={()=>{
              navigate('/investment');
              const dpcontent = document.getElementById('dropdown-content');
              dpcontent.classList.add('disable-pointer');
              dpcontent.classList.remove('enable-pointer');
              if(opened){
                seOpened(!opened);
              }
            }} className="new-drodonw-item">
            <img   className="dropdown-img" src={invest} />
             <p   className="dropdown-text">Investment Consultancy</p>
            </div>
            <div onClick={()=>{
               const dpcontent = document.getElementById('dropdown-content');
               dpcontent.classList.add('disable-pointer');
               dpcontent.classList.remove('enable-pointer');
          if(opened){
            seOpened(!opened);
          }
                navigate('/formative');
            }} className="new-drodonw-item">
            <img  className="dropdown-img" src={formative} />
             <p   className="dropdown-text">Formative Research</p>
            </div>
           </div>
         </li>
          
         <li className="nav-style" onClick={()=>{
          if(opened){
            seOpened(!opened);
          }
         }} onMouseEnter={()=>{
           const dpcontent = document.getElementById('dropdown-content');
            dpcontent.classList.remove('show-dropdown');
            setServiceClicked(false);
            dpcontent.classList.remove('enable-pointer');
            dpcontent.classList.add('disable-pointer');

         }} ><NavLink  to='/about'>About Us</NavLink></li>
          <li className="nav-style" 
            onClick={()=>{
              if(opened){
                seOpened(!opened);
              }
             }}
            onMouseEnter={()=>{
              const dpcontent = document.getElementById('dropdown-content');
               dpcontent.classList.remove('show-dropdown');
               setServiceClicked(false);
               dpcontent.classList.remove('enable-pointer');
               dpcontent.classList.add('disable-pointer');
            }}
            ><NavLink to='/ourteam'>Our Team</NavLink></li>
          <li   className="nav-style"  onClick={()=>{
          if(opened){
            seOpened(!opened);
          }
         }} onMouseEnter={()=>{
           const dpcontent = document.getElementById('dropdown-content');
            dpcontent.classList.remove('show-dropdown');
            setServiceClicked(false);
            dpcontent.classList.remove('enable-pointer');
            dpcontent.classList.add('disable-pointer');
         }}
         ><NavLink  to='/testimonials'>Testimonials</NavLink></li>
          <li className="nav-style"  onClick={()=>{
          if(opened){
            seOpened(!opened);
          }
         }}  onMouseEnter={()=>{
           const dpcontent = document.getElementById('dropdown-content');
            dpcontent.classList.remove('show-dropdown');
            setServiceClicked(false);
            dpcontent.classList.remove('enable-pointer');
            dpcontent.classList.add('disable-pointer');
         }}><NavLink to='/contact'>Contact Us</NavLink></li>
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