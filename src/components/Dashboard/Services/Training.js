import React, {useState,useEffect} from "react";
import MUIDataTable from "mui-datatables";
import Button from '@mui/material/Button';
import { NavLink } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import TrainingList from "./Lists/TrainingList";
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
 const Training=()=>{
      const[abouttrainingConsultency,setAbouttrainingConsultency]=useState("");
  const[trainingTitle, setTrainingTitle]=useState("");
  const[trainingImages,setTrainingImages]=useState("");
  const[description,setDescription]=useState("");
  const[addlist,setAddlist]=useState(false);
 
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
    name:"abouttrainingConsultency",
    label:"About training",
}, "trainingTitle", "description", {
    name:"trainingImages",
    label:"Image",
   options:{
    customBodyRender:(value,tableMeta,updateVale)=>{
        return <img src= {tableMeta.rowData[4][0]} alt={"Training "}  height={100}/>
    }
   }
},
{
  name:"trainingTitle",
  label:"list",
   options:{
  customBodyRender:(value,tableMeta,updateVale)=>{
     return <>
     
      <Button type="button"  variant="contained" color="success"
       onClick={async ()=>{
           setAddlist(true);
          setAboutid(tableMeta.rowData[0]);
          console.log(tableMeta);
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
            setAbouttrainingConsultency(tableMeta.rowData[1]);
             setTrainingTitle(tableMeta.rowData[2]);
             setDescription(tableMeta.rowData[3]);
             setTrainingImages(tableMeta.rowData[4]);
             setTempimage(tableMeta.rowData[4][0]);
          
         }} >edit</Button>
             <Button type="button"  style={{marginRight:10}} variant="contained" color="error" 
        onClick={async ()=>{
            await deleteData('training',tableMeta.rowData[0])
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
    const data=await getAllData('training')
    if(Array.isArray(data)){
    setAboutdata(data)
    }else{
        console.log(data)
    }
       
  }


    useEffect(async () => {
await getAboutdata()
        console.log("aboutdat",await getAllData('training'))
       }, []);
     return<>
     {addlist ?<TrainingList toggleAddList = {toggleList} trainingId={aboutid}/>:<>
     {manAbout? <Button variant="contained" onClick={()=>{
  setManAbout(false)

}} color="error">Cancel</Button>: <Button variant="contained"  onClick={()=>{
 setManAbout(true)
 setEditdata(false);
 setAboutid("");
          setAbouttrainingConsultency("");
          setTrainingTitle("");
          setDescription("");    
          setTrainingImages("");

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
   <TextField id="outlined-basic" label="about training" value={abouttrainingConsultency}  onChange={(e)=>{
     setAbouttrainingConsultency(e.target.value)
   }} variant="outlined" color="success" />
   <TextField id="outlined-basic" label="title"  value={trainingTitle} onChange={(e)=>{
     setTrainingTitle(e.target.value)  }}variant="outlined" color="success" />
   <TextField id="outlined-basic" label="description"  value={description}  onChange={(e)=>{
    setDescription(e.target.value)
   }}  variant="outlined" color="success" />
  {editdata?  <input type="file" multiple id="outlined-basic" onChange={(e)=>{
    setTrainingImages(e.target.files);
   
     setTempimage('')
     setError("");
   }
   } label="image" variant="outlined"color="success"  />:  
   <input type="file" multiple id="outlined-basic" onChange={(e)=>{
     setTrainingImages(e.target.files);
 
     setError("");
     setTempimage('')

   }
   } label="image" variant="outlined"color="success"  required />}
   {editdata&&tempimage.length>0?<img height={"120px"} width={"100px"} src={tempimage}/>:""}
   <Stack direction="row" spacing={2}>
   <Button variant="contained"   onClick={async()=>{
   if(editdata){
       const regex= new RegExp(/^(ftp|http|https):\/\/[^ "]+$/);
       if(regex.test(trainingImages)){
      await updateData('aboutus',{trainingImages,abouttrainingConsultency,trainingTitle,
       description},aboutid);
       await getAboutdata();
       setEditdata(false);
       setManAbout(false);
     
       }else{
     const formData = new FormData();
     formData.append("abouttrainingConsultency",abouttrainingConsultency)
     formData.append("trainingTitle",trainingTitle)
     formData.append("description",description)
     for(let i=0;i<trainingImages.length;i++){
      formData.append("trainingImages",trainingImages[i]);
     }
     // for (var i = 0; i < trainingImages.length; i++) {
     //   FormData.append('trainingImages' + trainingImages[i].filename)
     // }
      await updateData('training',formData,aboutid);
      await getAboutdata()
      setEditdata(false);
      setManAbout(false);
     
       }
   }else{

  if(trainingImages){
     const formData = new FormData();
     formData.append("abouttrainingConsultency",abouttrainingConsultency)
     formData.append("trainingTitle",trainingTitle)
     formData.append("description",description)
     for(let i=0;i<trainingImages.length;i++){
      formData.append("trainingImages",trainingImages[i]);
     }
     await postData('training',formData)
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
title={"Training"} 
data={aboutdata}
columns={columns}
options={options}
/>}
    </>}

    
    </>
 }
 export default Training;