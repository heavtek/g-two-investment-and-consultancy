import React, {useState,useEffect} from "react";
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import InvestmentList from './Lists/InvestmentList';

import axios from "axios";
import MUIDataTable from "mui-datatables";
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

const Investment =() =>{
  const [aboutinvestmentConsultency,setAboutinvestmentConsultency]=useState("");
  const [investmentTitle,setInvestmentTitle]=useState("");
  const [description,setDescription]=useState("");
  const [investmentImage,setInvestmentImage]=useState("");
  const [aboutdata, setAboutdata]=useState([]);
  const[manAbout,setManAbout]=useState(false);
  const[editdata,setEditdata]=useState(false);
  const[aboutid,setAboutid]=useState("");
  const[tempimage,setTempimage]=useState("");
  const[addlist,setAddlist]=useState(false);
  const[error,setError]=useState("");
  const columns = [   {
    name:"_id",
    label:"Id",
   options:{ 
display:false
   }
},
{
    name:"investmentTitle",
    label:"Title",
}, 
{
  name:"aboutinvestmentConsultency",
  label:"About Investment",
},
{
  name:"description",
  label:"Description",
},

{
    name:"investmentImage",
    label:"Image",
   options:{
    customBodyRender:(value,tableMeta,updateVale)=>{
        return <img src= {tableMeta.rowData[4][0]} alt={"training"}  height={100}/>
    }
   }
},
{
    name:"description",
    label:"list",
     options:{
    customBodyRender:(value,tableMeta,updateVale)=>{
       return <>
       
        <Button type="button"  variant="contained" color="success"
         onClick={async ()=>{
             setAddlist(true);
            setAboutid(tableMeta.rowData[0]);
          }} >List</Button>
          
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
           setAboutinvestmentConsultency(tableMeta.rowData[2]);
           setInvestmentTitle(tableMeta.rowData[1]);
           setDescription(tableMeta.rowData[3]);
           setInvestmentImage(tableMeta.rowData[4]);
           setTempimage(tableMeta.rowData[4][0]);
           

       }} >edit</Button>
        <Button type="button"  style={{marginRight:10}} variant="contained" color="error" 
      onClick={async ()=>{
          await deleteData('investment',tableMeta.rowData[0])
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
  const data=await getAllData('investment')
  if(Array.isArray(data)){
  setAboutdata(data)
  }else{
      console.log(data)
  }
     
}
useEffect(async () => {
  await getAboutdata()
          
         }, []);
    return <>
    {addlist ?<InvestmentList toggleAddList = {toggleList} investmentId={aboutid}/>:<>
    {manAbout? <Button variant="contained" onClick={()=>{
     setManAbout(false)

 }} color="error">Cancel</Button>: <Button variant="contained"  onClick={()=>{
    setManAbout(true)
    setEditdata(false);
    setAboutid("");
             setAboutinvestmentConsultency("");
             setInvestmentTitle("");
             setDescription("");
             setInvestmentImage("");
      
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
        <TextField id="outlined-basic" value={investmentTitle} onChange={(e)=>{
        setInvestmentTitle(e.target.value)
      }
      } label="Title" variant="outlined" color="success" />
      <TextField id="outlined-basic" value={aboutinvestmentConsultency} onChange={(e)=>{
        setAboutinvestmentConsultency(e.target.value)
      }
      } label="About Investment"   variant="outlined" color="success" />
    
       <TextField id="outlined-basic" value={description} onChange={(e)=>{
        setDescription(e.target.value)
      }
      } label="Description" variant="outlined" color="success" />
        {editdata?   <input type="file" multiple id="outlined-basic" onChange={(e)=>{
        setInvestmentImage(e.target.files)
        setTempimage('')
        setError("");
      }
      } label="image" variant="outlined"color="success"  />:
      <input type="file" multiple id="outlined-basic" onChange={(e)=>{
        setInvestmentImage(e.target.files)
       
        setTempimage('')
        setError("");
      }
      } label="image" variant="outlined"color="success"  />}
       {editdata&&tempimage.length>0?<img height={120} src={tempimage}/>:""}
   
      <Stack direction="row" spacing={2}>
      <Button variant="contained"   onClick={async()=>{
      if(editdata){
          const regex= new RegExp(/^(ftp|http|https):\/\/[^ "]+$/);
          if(regex.test(investmentImage)){
         await updateData('investment',{investmentImage,aboutinvestmentConsultency,investmentTitle,
          description},aboutid);
          await getAboutdata();
          setEditdata(false);
          setManAbout(false);
        
          }else{
        const formData = new FormData();
        formData.append("aboutinvestmentConsultency",aboutinvestmentConsultency)
        formData.append("investmentTitle",investmentTitle)
        formData.append("description",description)
        formData.append("investmentImage",investmentImage)
        for(let i=0;i<investmentImage.length;i++){
          formData.append("investmentImage",investmentImage[i]);
         }
         await updateData('investment',formData,aboutid);
         await getAboutdata()
         setEditdata(false);
         setManAbout(false);
        
          }
      }else{

     if(investmentImage){
        const formData = new FormData();
        formData.append("aboutinvestmentConsultency",aboutinvestmentConsultency)
        formData.append("investmentTitle",investmentTitle)
        formData.append("description",description)
        for(let i=0;i<investmentImage.length;i++){
          formData.append("investmentImage",investmentImage[i]);
         }
        
        await postData('investment',formData)
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
title={"Investment"} 
data={aboutdata}
columns={columns}
options={options}
/>}
    </>}

    
    </>
} 
export default Investment;