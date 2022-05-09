import { useEffect,useState } from "react";
import FinalReport from '../analytics/Final-Report'
import {getAllData,postData,deleteData, updateData} from '../../api/Api'
import './dashobard.css'
const DahsboardContainer =  () =>{
    const[training,setTraining]=useState([])
    const[business,setBusiness]=useState([])
    const[formative,setFormative]=useState([])
    const[investment,setInvestment]=useState([])
   const [testimonials,setTestimonials] = useState([])
   const [user,setUsers] = useState([])
   const [feedback,setFeedback] = useState([])
   const [client,setClient] = useState([])
   const [team,setTeam] = useState([])
    const getAboutdata=async()=>{
        const data=await getAllData('training');
        const idata=await getAllData('investment');
        const bdata=await getAllData('business');
        const fdata=await getAllData('formative');
       const userData = await getAllData('user');
       const teamData = await getAllData('team');
       const testiData = await getAllData('testimonal');
       const clientData = await getAllData('client');
       const feedbackData = await getAllData('feedback');
       
       
        if(Array.isArray(data)){
            setTraining(data)
            setInvestment(idata)
            setBusiness(bdata) 
            setFormative(fdata)
            setUsers(userData);
            setTeam(teamData);
            setTestimonials(testiData);
            setClient(clientData);
            setFeedback(feedbackData)
            }else{
                console.log(data)
            }
      }
      useEffect(async()=>{
        await getAboutdata();
      
      },[])
     return <div className="container">
         <div className="row">
             <div className="col-md-12">
                 <div className="dashobard-cards">
                      
                     <div className="d-card">

                         <div className="card-title">
                             Training</div>
                             {training.length > 0?
                             <div className="card-counter">
                                 {training.length}
                             </div>:''}
                             
                     </div>
                     <div className="d-card">

<div className="card-title">
    Business</div>
    {business.length > 0?
                             <div className="card-counter">
                                 {business.length}
                             </div>:''}
    
</div>
<div className="d-card">

<div className="card-title">
    Investment</div>
    {investment.length > 0?
                             <div className="card-counter">
                                 {investment.length}
                             </div>:''}
    
</div>
      <div className="d-card">
         <div className="card-title">
                Formative</div>
                {formative.length > 0?
                                        <div className="card-counter">
                                            {formative.length}
                                        </div>:''}
                
            </div>
      <div className="d-card">
         <div className="card-title">
                Feedbacks</div>
                {formative.length > 0?
                                        <div className="card-counter">
                                            {feedback.length}
                                        </div>:''}
                
            </div>
      <div className="d-card">
         <div className="card-title">
                Clients</div>
                {client.length > 0?
                                        <div className="card-counter">
                                            {client.length}
                                        </div>:''}
                
            </div>
      <div className="d-card">
         <div className="card-title">
                Testimonials</div>
                {testimonials.length > 0?
                                        <div className="card-counter">
                                            {testimonials.length}
                                        </div>:''}
                
            </div>
      <div className="d-card">
         <div className="card-title">
                Users</div>
                {user.length > 0?
                                        <div className="card-counter">
                                            {user.length}
                                        </div>:''}
                
            </div>
      <div className="d-card">
         <div className="card-title">
                Team</div>
                {team.length > 0?
                                        <div className="card-counter">
                                            {team.length}
                                        </div>:''}
                
            </div>
      </div>
             </div>
         </div>


  <div className="row"> 
  <div className="col-md-12">
      <FinalReport/>
      </div>
      </div>
        </div>
}
export default DahsboardContainer;