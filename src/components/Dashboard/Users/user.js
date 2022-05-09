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
 const User=()=>{
      const[userName,setUserName]=useState("");
  const[userPassword,setUserPassword]=useState("");
  const[userEmail,setUserEmail]=useState("");
  const[userRole,setUserRole]=useState("");
  const[userDescription,setUserDescription]=useState("");
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
    name:"userName",
    label:"UserName",
},
 "userPassword", "userEmail", 
 {
  name:"userRole",
  label:"Role",
},
{
    name:"userDescription",
    label:"Description",
  },
{
    name:"userDescription",
    label:"Action",
     options:{
    customBodyRender:(value,tableMeta,updateVale)=>{
       return <>
        <Button type="button"  style={{marginRight:10}} variant="contained" color="error" 
        onClick={async ()=>{
            await deleteData('user',tableMeta.rowData[0])
            getAboutdata()
        }} >delete</Button>
        <Button type="button"  variant="contained" color="success"
         onClick={async ()=>{
             setManAbout(true);
             setEditdata(true);
            setAboutid(tableMeta.rowData[0]);
             setUserName(tableMeta.rowData[1]);
             setUserPassword(tableMeta.rowData[2]);
             setUserEmail(tableMeta.rowData[3]);
             setUserRole(tableMeta.rowData[4]);
             setUserDescription(tableMeta.rowData[5]);

         }} >edit</Button>
          
          </>
    }
   }
},
];

const getAboutdata=async()=>{
    const data=await getAllData('user')
    if(Array.isArray(data)){
    setAboutdata(data)
    }else{
        console.log(data)
    }
       
  }


    useEffect(async () => {
await getAboutdata()
        console.log("contactdata",await getAllData('user'))
       }, []);
     return<>
 {manAbout? <Button variant="contained" onClick={()=>{
     setManAbout(false)

 }} color="error">Cancel</Button>: <Button variant="contained"  onClick={()=>{
    setManAbout(true)
    setEditdata(false);
    setAboutid("");
             setUserName("");
             setUserPassword("");
             setUserEmail("");
             setUserRole("");
             setUserDescription("");
          
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
      <TextField id="outlined-basic" label="username" value={userName}  onChange={(e)=>{
        setUserName(e.target.value)
      }} variant="outlined" color="success" />
      <TextField id="outlined-basic" label="password"  value={userPassword} onChange={(e)=>{
        setUserPassword(e.target.value)  }}variant="outlined" color="success" />
      <TextField id="outlined-basic" label="Email"  value={userEmail}  onChange={(e)=>{
       setUserEmail(e.target.value)
      }}  variant="outlined" color="success" />
      <TextField id="outlined-basic" label="role"  value={userRole}  onChange={(e)=>{
       setUserRole(e.target.value)
      }}  variant="outlined" color="success" />
      <TextField id="outlined-basic" label="Description" value={userDescription}   onChange={(e)=>{
        setUserDescription(e.target.value)
      }}variant="outlined" color="success" />

    
      <Stack direction="row" spacing={2}>
      <Button variant="contained"  onClick={async ()=>{
          if(editdata){
            const formData = {
              userName,userPassword,userEmail,userRole,userDescription
            }
           await updateData('user',{userName,userPassword,userEmail,
            userRole,userDescription,},aboutid);
            await getAboutdata();
            setEditdata(false);
            setManAbout(false);
          
            }else{
    const formData = {
        userName,userPassword,userEmail,userRole,userDescription
    }
   const res= await postData('user',formData);
     await getAboutdata();
   console.log("user dat",await getAllData('user'))
   setEditdata(false);
   setManAbout(false);
  }
}}color="success">Save</Button>
      </Stack>
    </Box>
    </div>
    </Card>: <MUIDataTable 
  title={"User Lists"} 
  data={aboutdata}
  columns={columns}
  options={options}
/>}
     </>
 }
 export default User;