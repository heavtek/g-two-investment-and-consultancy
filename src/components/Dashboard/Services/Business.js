import React, {useState,useEffect} from "react";
import MUIDataTable from "mui-datatables";
import Button from '@mui/material/Button';
import { NavLink } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import BusinessList from "./Lists/BusinessList";

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
 const Business=()=>{
      const[aboutBusinessConsultency,setAboutBusinessConsultency]=useState("");
  const[businessTitle, setBusinessTitle]=useState("");
  const[businessImage,setBusinessImage]=useState("");
  const[description,setDescription]=useState("");
  const [aboutdata, setAboutdata]=useState([]);
  const[manAbout,setManAbout]=useState(false);
  const[editdata,setEditdata]=useState(false);
  const[aboutid,setAboutid]=useState("");
  const[tempimage,setTempimage]=useState("");
  const[error,setError]=useState("");
  const[addlist,setAddlist]=useState(false);
  const columns = [   {
    name:"_id",
    label:"Id",
   options:{ 
display:false
   }
},
{
    name:"aboutBusinessConsultency",
    label:"About BUSINESS",
}, "businessTitle", "description", {
    name:"businessImage",
    label:"Image",
   options:{
    customBodyRender:(value,tableMeta,updateVale)=>{
        return <img src= {tableMeta.rowData[4][0]} alt={"business "}  height={100}/>
    }
   }
},
{
  name:"businessTitle",
  label:"list",
   options:{
  customBodyRender:(value,tableMeta,updateVale)=>{
     return <>
     
      <Button type="button"  variant="contained" color="success"
       onClick={async ()=>{
           setAddlist(true);
          setAboutid(tableMeta.rowData[0]);
        }} > List</Button>
        
        </>
  }
 }
},
{
    name:"description",
    label:"Action",
     options:{
    customBodyRender:(value,tableMeta,updateVale)=>{
       return <>
      
        <Button type="button"  variant="contained" color="success"
         onClick={async ()=>{
             setManAbout(true);
             setEditdata(true);
            setAboutid(tableMeta.rowData[0]);
            setAboutBusinessConsultency(tableMeta.rowData[1]);
             setBusinessTitle(tableMeta.rowData[2]);
             setDescription(tableMeta.rowData[3]);
             setBusinessImage(tableMeta.rowData[4]);
             setTempimage(tableMeta.rowData[4]);
          
         }} >edit</Button>
            <Button type="button"  style={{marginRight:10}} variant="contained" color="error" 
        onClick={async ()=>{
            await deleteData('business',tableMeta.rowData[0])
            getAboutdata()
        }} >delete</Button>
          </>
    }
   }
},
];
const toggleList = () =>{
  setAddlist(!addlist);
}
const getAboutdata=async()=>{
    const data=await getAllData('business')
    if(Array.isArray(data)){
    setAboutdata(data)
    }else{
        console.log(data)
    }
       
  }


    useEffect(async () => {
await getAboutdata()
        console.log("business",await getAllData('business'))
       }, []);
     return<>
      {addlist ?<BusinessList toggleAddList = {toggleList} businessId={aboutid}/>:<>
      {manAbout? <Button variant="contained" onClick={()=>{
     setManAbout(false)

 }} color="error">Cancel</Button>: <Button variant="contained"  onClick={()=>{
    setManAbout(true)
    setEditdata(false);
    setAboutid("");
             setAboutBusinessConsultency("");
             setBusinessTitle("");
             setDescription("");    
             setBusinessImage("");

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
      <TextField id="outlined-basic" label="about business" value={aboutBusinessConsultency}  onChange={(e)=>{
        setAboutBusinessConsultency(e.target.value)
      }} variant="outlined" color="success" />
      <TextField id="outlined-basic" label="title"  value={businessTitle} onChange={(e)=>{
        setBusinessTitle(e.target.value)  }}variant="outlined" color="success" />
      <TextField id="outlined-basic" label="description"  value={description}  onChange={(e)=>{
       setDescription(e.target.value)
      }}  variant="outlined" color="success" />
     {editdata?  <input type="file" multiple id="outlined-basic" onChange={(e)=>{
       setBusinessImage(e.target.files);
        setTempimage('')
        setError("");
      }
      } label="image" variant="outlined"color="success"  />:  
      <input type="file"  id="outlined-basic" onChange={(e)=>{
        setBusinessImage(e.target.files);
       
        setError("");
        setTempimage('')

      }
      } label="image" variant="outlined"color="success"  required />}
      {editdata&&tempimage.length>0?<img height={120} src={tempimage}/>:""}
      <Stack direction="row" spacing={2}>
      <Button variant="contained"   onClick={async()=>{
      if(editdata){
          const regex= new RegExp(/^(ftp|http|https):\/\/[^ "]+$/);
          if(regex.test(businessImage)){
         await updateData('business',{businessImage,aboutBusinessConsultency,businessTitle,
          description},aboutid);
          await getAboutdata();
          setEditdata(false);
          setManAbout(false);
        
          }else{
        const formData = new FormData();
        formData.append("aboutBusinessConsultency",aboutBusinessConsultency)
        formData.append("businessTitle",businessTitle)
        formData.append("description",description)
        for(let i=0;i<businessImage.length;i++){
          formData.append("businessImage",businessImage[i]);
         }
         await updateData('business',formData,aboutid);
         await getAboutdata()
         setEditdata(false);
         setManAbout(false);
        
          }
      }else{

     if(businessImage){
        const formData = new FormData();
        formData.append("aboutBusinessConsultency",aboutBusinessConsultency)
        formData.append("businessTitle",businessTitle)
        formData.append("description",description)
        for(let i=0;i<businessImage.length;i++){
          formData.append("businessImage",businessImage[i]);
         }
      
        await postData('business',formData)
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
    </Box>
    </div>
    </Card>: <MUIDataTable 
  title={"Bussiness"} 
  data={aboutdata}
  columns={columns}
  options={options}
/>}
    </>}

    
    </>
 }
 export default Business;