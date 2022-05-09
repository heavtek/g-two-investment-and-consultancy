import React, {useState,useEffect} from "react";
import MUIDataTable from "mui-datatables";
import Button from '@mui/material/Button';
import { NavLink } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import axios from "axios";
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
 const Contactus=()=>{
      const[address,setAddress]=useState("");
  const[phone,setPhone]=useState("");
  const[email,setEmail]=useState("");
  const[facebook,setFacebook]=useState("");
  const[telegram,setTelegram]=useState("");
  const[twitter,setTwitter]=useState("");
  const[linkedin,setLinkedin]=useState("");
  const[description,setDescription]=useState("");
  const [aboutdata, setAboutdata]=useState([]);
  const[manAbout,setManAbout]=useState(false);
  const[editdata,setEditdata]=useState(false);
  const[aboutid,setAboutid]=useState("");
  const[tempimage,setTempimage]=useState("");
  const[error,setError]=useState("");
  const columns = [   {
    name:"_id",
    label:"Id",
   options:{ 
display:false
   }
},
{
    name:"address",
    label:"Address",
},
 "phone", "email", 
 {
  name:"facebook",
  label:"Facebook",
},
{
  name:"telegram",
  label:"Telegram",
},
{
  name:"twitter",
  label:"Twitter",
},
{
  name:"linkedin",
  label:"linkedin",
},
 {
  name:"description",
  label:"Description",
},
{
    name:"description",
    label:"Action",
     options:{
    customBodyRender:(value,tableMeta,updateVale)=>{
       return <>
        <Button type="button"  style={{marginRight:10}} variant="contained" color="error" 
        onClick={async ()=>{
            await deleteData('contactus',tableMeta.rowData[0])
            getAboutdata()
        }} >delete</Button>
        <Button type="button"  variant="contained" color="success"
         onClick={async ()=>{
             setManAbout(true);
             setEditdata(true);
            setAboutid(tableMeta.rowData[0]);
             setAddress(tableMeta.rowData[1]);
             setPhone(tableMeta.rowData[2]);
             setEmail(tableMeta.rowData[3]);
             setFacebook(tableMeta.rowData[4]);
             setTelegram(tableMeta.rowData[5]);
             setTwitter(tableMeta.rowData[5]);
             setLinkedin(tableMeta.rowData[5]);
             setDescription(tableMeta.rowData[7]);


         }} >edit</Button>
          
          </>
    }
   }
},
];

const getAboutdata=async()=>{
    const data=await getAllData('contactus')
    if(Array.isArray(data)){
    setAboutdata(data)
    }else{
        console.log(data)
    }
       
  }


    useEffect(async () => {
await getAboutdata()
        console.log("contactdata",await getAllData('contactus'))
       }, []);
     return<>
 {manAbout? <Button variant="contained" onClick={()=>{
     setManAbout(false)

 }} color="error">Cancel</Button>: <Button variant="contained"  onClick={()=>{
    setManAbout(true)
    setEditdata(false);
    setAboutid("");
             setAddress("");
             setPhone("");
             setEmail("");
             setFacebook("");
             setTelegram("");
             setTwitter("");
             setLinkedin("");
             setDescription("");
          
}}>Add</Button>}
    
               {manAbout?  <Card sx={{ maxWidth: 600, bgcolor: 'white',border:"0px solid grey",boxShadow:"12px",marginLeft:"315px"}} sy={{minHeight: 600,border:"0px solid red"}}>
    <div className="form">
    <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '50ch' },
      }}
      noValidate
      autoComplete="off"
    >
        <p>{error}
        </p>
        <div className="container">
      <div className="row">
        <div className="col-md-6 col-xs-12">
        <TextField id="outlined-basic" label="Address" value={address}  onChange={(e)=>{
        setAddress(e.target.value)
      }} variant="outlined" color="success" />
      <TextField id="outlined-basic"  className="mt-2" label="Phone"  value={phone} onChange={(e)=>{
        setPhone(e.target.value)  }}variant="outlined" color="success" />
      <TextField id="outlined-basic" className="mt-2" label="Email"  value={email}  onChange={(e)=>{
       setEmail(e.target.value)
      }}  variant="outlined" color="success" />
       <TextField id="outlined-basic"  className="mt-2"label="Facebook Link"  value={facebook}  onChange={(e)=>{
       setFacebook(e.target.value)
      }}  variant="outlined" color="success" />
        </div>
        <div className="col-md-6 col-xs-12">
        <TextField id="outlined-basic" label="Telegram Link"  value={telegram}  onChange={(e)=>{
       setTelegram(e.target.value)
      }}  variant="outlined" color="success" />
          <TextField id="outlined-basic" className="mt-2" label="Twitter Link"  value={twitter}  onChange={(e)=>{
       setTwitter(e.target.value)
      }}  variant="outlined" color="success" />
       <TextField id="outlined-basic" className="mt-2" label="Linkedin Link"  value={linkedin}  onChange={(e)=>{
       setLinkedin(e.target.value)
      }}  variant="outlined" color="success" />
      <TextField id="outlined-basic"  className="mt-2"label="Description" value={description}   onChange={(e)=>{
        setDescription(e.target.value)
      }}variant="outlined" color="success" />

    
      <Stack direction="row" spacing={2}>
      <Button variant="contained"  onClick={async ()=>{
          if(editdata){
            const formData = {
              address,phone,email,description
            }
           await updateData('contactus',{address,phone,description,
            email,facebook,telegram,twitter,linkedin},aboutid);
            await getAboutdata();
            setEditdata(false);
            setManAbout(false);
          
            }else{
    const formData = {
      address,phone,description,
      email,facebook,telegram,twitter,linkedin
    }
   const res= await postData('contactus',formData);
   await getAboutdata();
   setEditdata(false);
   setManAbout(false);
  }
}}color="success">Save</Button>
      </Stack>
        </div>
      </div>
     </div>
    </Box>
    </div>
    </Card>: <MUIDataTable 
  title={"Contact Us"} 
  data={aboutdata}
  columns={columns}
  options={options}
/>}
     </>
 }
 export default Contactus;