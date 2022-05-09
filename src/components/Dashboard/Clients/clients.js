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
import { Description } from "@material-ui/icons";


const data = [

];

const options = {
  filterType: 'checkbox',
};
 const Clients=()=>{
      const[clientName,setclientName]=useState("");
  const[memberRole, setMemberRole]=useState("");
  const[clientLogo,setclientLogo]=useState("");
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
    name:"clientName",
    label:"Name",
},


 {
    name:"clientLogo",
    label:"Image",
   options:{
    customBodyRender:(value,tableMeta,updateVale)=>{
        return <img src= {tableMeta.rowData[2]} alt={"client member"}  height={100}/>
    }
   }
},
{
    name:"clientName",
    label:"Action",
     options:{
    customBodyRender:(value,tableMeta,updateVale)=>{
       return <>
    
        <Button type="button"  variant="contained" color="success"
         onClick={async ()=>{
             setManAbout(true);
             setEditdata(true);
            setAboutid(tableMeta.rowData[0]);
             setclientName(tableMeta.rowData[1]);
            
           
            setclientLogo(tableMeta.rowData[2]);
             setTempimage(tableMeta.rowData[2]);
           

         }} >edit</Button>
              <Button type="button"  style={{marginRight:10}} variant="contained" color="error" 
        onClick={async ()=>{
            await deleteData('client',tableMeta.rowData[0])
            getAboutdata()
        }} >delete</Button>
          </>
    }
   }
},
];

const getAboutdata=async()=>{
    const data=await getAllData('client')
    if(Array.isArray(data)){
      setAboutdata(data)
    }else{
        console.log(data)
    }
       
  }


    useEffect(async () => {
await getAboutdata()
        console.log("aboutdat",await getAllData('client'))
       }, []);
     return<>
 {manAbout? <Button variant="contained" onClick={()=>{
     setManAbout(false)

 }} color="error">Cancel</Button>: <Button variant="contained"  onClick={()=>{
    setManAbout(true)
    setEditdata(false);
          setAboutid("");
             setclientName("");
             setMemberRole("");
             setclientLogo("");
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
      <TextField id="outlined-basic" label="Name" value={clientName}  onChange={(e)=>{
        setclientName(e.target.value)
      }} variant="outlined" color="success" />
     
     {editdata?  <input type="file" id="outlined-basic" onChange={(e)=>{
        setclientLogo(e.target.files[0]);
        setTempimage('')
        setError("");
      }
      } label="image" variant="outlined"color="success"  />:  
      <input type="file" id="outlined-basic" onChange={(e)=>{
        setclientLogo(e.target.files[0])
        setError("");
        setTempimage('')

      }
      } label="image" variant="outlined"color="success"   />}
      {editdata&&tempimage.length>0?<img height={120} src={tempimage}/>:""}
      <Stack direction="row" spacing={2}>
      <Button variant="contained"   onClick={async()=>{
      if(editdata){
          const regex= new RegExp(/^(ftp|http|https):\/\/[^ "]+$/);
          if(regex.test(clientLogo)){
         await updateData('client',{clientLogo,clientName},aboutid);
          await getAboutdata();
          setEditdata(false);
          setManAbout(false);
        
          }else{
        const formData = new FormData();
        formData.append("clientName",clientName)
       
        formData.append("clientLogo",clientLogo)
         await updateData('client',formData,aboutid);
         await getAboutdata()
         setEditdata(false);
         setManAbout(false);
        
          }
      }else{

    
        const formData = new FormData();
        formData.append("clientName",clientName)

        formData.append("clientLogo",clientLogo)
        await postData('client',formData)
        await getAboutdata()
        setManAbout(false)
        
        setError("")
    
      }
      }


      }color="success">Save</Button>
      </Stack>
    </Box>
    </div>
    </Card>: <MUIDataTable 
  title={"client"} 
  data={aboutdata}
  columns={columns}
  options={options}
/>}
     </>
 }
 export default Clients;