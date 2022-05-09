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
 const Testiminialsdash=()=>{
      const[ testimonalDescription, setTestimonalDescription]=useState("");
  const[testimonalName, setTestimonalName]=useState("");
  const[date,setDate]=useState("");
  const[testimonalImage,setTestimonalImage]=useState("");
  
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
    name:"testimonalName",
    label:"Name",
},
{
  name:"testimonalDescription",
  label:"Description",
},
 "date", {
    name:"testimonalImage",
    label:"Image",
   options:{
    customBodyRender:(value,tableMeta,updateVale)=>{
        return <img src= {tableMeta.rowData[4]} alt={"testimonials"}  height={100}/>
  }
   }
},
{
    name:"testimonalName",
    label:"Action",
     options:{
    customBodyRender:(value,tableMeta,updateVale)=>{
       return <>
    
        <Button type="button"  variant="contained"   color="success"
         onClick={async ()=>{
             setManAbout(true);
             setEditdata(true);
            setAboutid(tableMeta.rowData[0]);
            setTestimonalName(tableMeta.rowData[1]);
            setTestimonalDescription(tableMeta.rowData[2]);
            setDate(tableMeta.rowData[3]);
           
            setTestimonalImage(tableMeta.rowData[4]);
             setTempimage(tableMeta.rowData[5]);
         

         }} >edit</Button>
              <Button type="button"  style={{marginRight:10}} variant="contained" color="error" 
        onClick={async ()=>{
            await deleteData('testimonal',tableMeta.rowData[0])
            getAboutdata()
        }} >delete</Button>
          </>
    }
   }
},
];

const getAboutdata=async()=>{
    const data=await getAllData('testimonal')
    if(Array.isArray(data)){
    setAboutdata(data)
    }else{
        console.log(data)
    }
       
  }


    useEffect(async () => {
await getAboutdata()
        console.log("aboutdat",await getAllData('testimonal'))
       }, []);
     return<>
 {manAbout? <Button variant="contained" onClick={()=>{
     setManAbout(false)

 }} color="error">Cancel</Button>: <Button variant="contained"  onClick={()=>{
    setManAbout(true)
    setEditdata(false);
    setAboutid("");
    setTestimonalName("");
    setTestimonalDescription("");
    setDate("");
   
    setTestimonalImage("");
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
      <TextField id="outlined-basic" multiline label="Description" value={testimonalDescription}  onChange={(e)=>{
        setTestimonalDescription(e.target.value)
      }} variant="outlined" color="success" />
      <TextField id="outlined-basic" label="Name"  value={testimonalName} onChange={(e)=>{
        setTestimonalName(e.target.value)  }}variant="outlined" color="success" />
      <TextField id="outlined-basic" label="Date"  value={date}  onChange={(e)=>{
       setDate(e.target.value)
      }}  variant="outlined" color="success" />
      
     {editdata?  <input type="file" id="outlined-basic" onChange={(e)=>{
        setTestimonalImage(e.target.files[0]);
        setTempimage('')
        setError("");
      }
      } label="image" variant="outlined"color="success"  />:  
      <input type="file" id="outlined-basic" onChange={(e)=>{
        setTestimonalImage(e.target.files[0])
        setError("");
        setTempimage('')

      }
      } label="image" variant="outlined"color="success"  required />}
      {editdata&&tempimage.length>0?<img height={120} src={tempimage}/>:""}
      <Stack direction="row" spacing={2}>
      <Button variant="contained"   onClick={async()=>{
      if(editdata){
          const regex= new RegExp(/^(ftp|http|https):\/\/[^ "]+$/);
          if(regex.test(testimonalImage)){
         await updateData('testimonal',{testimonalImage,testimonalDescription,testimonalName,
          date},aboutid);
          await getAboutdata();
          setEditdata(false);
          setManAbout(false);
        
          }else{
        const formData = new FormData();
        formData.append("testimonalDescription",testimonalDescription)
        formData.append("testimonalName",testimonalName)
        formData.append("date",date)
        formData.append("testimonalImage",testimonalImage)
        
         await updateData('testimonal',formData,aboutid);
         await getAboutdata()
         setEditdata(false);
         setManAbout(false);
        
          }
      }else{

     if(testimonalImage){
        const formData = new FormData();
        formData.append("testimonalDescription",testimonalDescription)
        formData.append("testimonalName",testimonalName)
        formData.append("date",date)
        formData.append("testimonalImage",testimonalImage)
        
        await postData('testimonal',formData)
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
  title={"Testimonials"} 
  data={aboutdata}
  columns={columns}
  options={options}
/>}
     </>
 }
 export default Testiminialsdash;