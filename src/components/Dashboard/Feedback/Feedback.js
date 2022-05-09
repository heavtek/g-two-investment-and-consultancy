import React, {useState,useEffect} from "react";
import MUIDataTable from "mui-datatables";
import Button from '@mui/material/Button';
import { NavLink } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import axios from "axios";
import SendEmail from "./SendEmail";
import {getAllData,postData,deleteData, updateData} from '../../api/Api'


const data = [
 ["Joe James", "Test Corp", "Yonkers", "NY"],
 ["John Walsh", "Test Corp", "Hartford", "CT"],
 ["Bob Herm", "Test Corp", "Tampa", "FL"],
 ["James Houston", "Test Corp", "Dallas", "TX"],
];

const options = {
  filterType: 'checkbox',
};
 const Feedback=()=>{
      const[email,setEmail]=useState("");
  const[userName, setUserName]=useState("");
  const[subject,setSubject]=useState("");
  const[message,setMessage]=useState("");
  const[aboutusImage,setAboutusImage]=useState("");
  const [aboutdata, setAboutdata]=useState([]);
  const[manAbout,setManAbout]=useState(false);
  const[editdata,setEditdata]=useState(false);
  const[aboutid,setAboutid]=useState("");
  const[tempimage,setTempimage]=useState("");
  const[error,setError]=useState("");
  const [sendEmail,setSendEmail] = useState(false);
   const columns = [   {
    name:"_id",
    label:"Id",
   options:{ 
display:false
   }
},
{
    name:"userName",
    label:"UserName",
}, 
{
  name:"email",
  label:"Email",
}, 
{
  name:"subject",
  label:"Subject",
}, 

{
    name:"message",
    label:"Message",
},
{
  name:"ourMission",
  label:"Action",
   options:{
  customBodyRender:(value,tableMeta,updateVale)=>{
     return <>
      <Button type="button"  style={{marginRight:10}} variant="contained" color="error" 
      onClick={async ()=>{
          await deleteData('feedback',tableMeta.rowData[0])
          getAboutdata()
      }} >delete</Button>
    
        
        </>
  }
 }
},
];

const getAboutdata=async()=>{
    const data=await getAllData('feedback')
    if(Array.isArray(data)){
    setAboutdata(data)
    }else{
        console.log(data)
    }
       
  }


    useEffect(async () => {
await getAboutdata()
        console.log("aboutdat",await getAllData('feedback'))
       }, []);
     return<>
 {sendEmail? <Button variant="contained" onClick={()=>{
     setSendEmail(false)
 }} color="error">Cancel</Button>: <Button variant="contained"  onClick={()=>{
   setSendEmail(true)
            
}}>Send Email</Button>}
    
               {manAbout?  <Card sx={{ maxWidth: 600, bgcolor: 'white',border:"0px solid grey",boxShadow:"12px",marginLeft:"315px"}} sy={{minHeight: 600,border:"0px solid red"}}>
    <div className="form">
    {/* <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '50ch' },
      }}
      noValidate
      autoComplete="off"
    >
        <p>{error}
        </p>
      <TextField id="outlined-basic" label="UserName" value={userName}  onChange={(e)=>{
        setUserName(e.target.value)
      }} variant="outlined" color="success" />
      <TextField id="outlined-basic" label="Mission"  value={email} onChange={(e)=>{
        setEmail(e.target.value)  }}variant="outlined" color="success" />
      <TextField id="outlined-basic" label="Vision"  value={subject}  onChange={(e)=>{
       setSubject(e.target.value)
      }}  variant="outlined" color="success" />
      <TextField id="outlined-basic" label="Value" value={message}   onChange={(e)=>{
        setMessage(e.target.value)
      }}variant="outlined" color="success" />
     
      <Stack direction="row" spacing={2}>
      <Button variant="contained"   onClick={async()=>{
      if(editdata){
          const regex= new RegExp(/^(ftp|http|https):\/\/[^ "]+$/);
          if(regex.test(aboutusImage)){
         await updateData('aboutus',{aboutusImage,aboutusDescription,ourMission,
          ourVision,ourValues},aboutid);
          await getAboutdata();
          setEditdata(false);
          setManAbout(false);
        
          }else{
        const formData = new FormData();
        formData.append("aboutusDescription",aboutusDescription)
        formData.append("ourMission",ourMission)
        formData.append("ourVision",ourVision)
        formData.append("ourValues",ourValues)
        formData.append("aboutusImage",aboutusImage)
         await updateData('aboutus',formData,aboutid);
         await getAboutdata()
         setEditdata(false);
         setManAbout(false);
        
          }
      }else{

     if(aboutusImage){
        const formData = new FormData();
        formData.append("aboutusDescription",aboutusDescription)
        formData.append("ourMission",ourMission)
        formData.append("ourVision",ourVision)
        formData.append("ourValues",ourValues)
        formData.append("aboutusImage",aboutusImage)
        await postData('aboutus',formData)
        await getAboutdata()
        setManAbout(false)
        
        setError("")
     }else{
         setError("image is required")
     }
      }
      }


      }color="success">Save</Button>
      </Stack>
    </Box> */}
    </div>
    </Card>: <>
     {sendEmail?<SendEmail/>:<MUIDataTable 
  title={"Subscribe List"} 
  data={aboutdata}
  columns={columns}
  options={options}
/>}
    </>}
     </>
 }
 export default Feedback;