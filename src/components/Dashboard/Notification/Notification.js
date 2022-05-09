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

];

const options = {
  filterType: 'checkbox',
};
 const Notification=()=>{
      const[title,setTitle]=useState("");
  const[description, setDescription]=useState("");
  const[url,setUrl]=useState("");
  const[image,setImage]=useState("");
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
    name:"title",
    label:"Title",
}, 
{
    name:"url",
    label:"url",
}, "description", {
    name:"image",
    label:"Image",
   options:{
    customBodyRender:(value,tableMeta,updateVale)=>{
        return <img src= {tableMeta.rowData[4]} alt={tableMeta.rowData[1]}  height={100}/>
    }
   }
},
{
    name:"title",
    label:"Action",
     options:{
    customBodyRender:(value,tableMeta,updateVale)=>{
       return <>
    
        <Button type="button"  variant="contained" color="success"
         onClick={async ()=>{
             setManAbout(true);
             setEditdata(true);
            setAboutid(tableMeta.rowData[0]);
             setTitle(tableMeta.rowData[1]);
             setDescription(tableMeta.rowData[2]);  
             setUrl(tableMeta.rowData[3]);  
            setImage(tableMeta.rowData[4]);
             setTempimage(tableMeta.rowData[4]);
           

         }} >edit</Button>
              <Button type="button"  style={{marginRight:10}} variant="contained" color="error" 
        onClick={async ()=>{
            await deleteData('notification',tableMeta.rowData[0])
            getAboutdata()
        }} >delete</Button>
          </>
    }
   }
},
];

const getAboutdata=async()=>{
    const data=await getAllData('notification')
    if(Array.isArray(data)){
      setAboutdata(data)
    }else{
        console.log(data)
    }
       
  }


    useEffect(async () => {
await getAboutdata()

       }, []);
     return<>
 {manAbout? <Button variant="contained" onClick={()=>{
     setManAbout(false)

 }} color="error">Cancel</Button>: <Button variant="contained"  onClick={()=>{
    setManAbout(true)
    setEditdata(false);
    setAboutid("");
             setTitle("");
             setDescription("");
             setUrl("");
             setImage("");
             
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
      <TextField id="outlined-basic" label="Title" value={title}  onChange={(e)=>{
        setTitle(e.target.value)
      }} variant="outlined" color="success" />
      <TextField id="outlined-basic" label="Description"  value={description} onChange={(e)=>{
        setDescription(e.target.value)  }}variant="outlined" color="success" />
         <TextField id="outlined-basic" label="url"  value={url} onChange={(e)=>{
        setUrl(e.target.value)  }}variant="outlined" color="success" />
     {editdata?  <input type="file" id="outlined-basic" onChange={(e)=>{
        setImage(e.target.files[0]);
        setTempimage('')
        setError("");
      }
      } label="image" variant="outlined"color="success"  />:  
      <input type="file" id="outlined-basic" onChange={(e)=>{
        setImage(e.target.files[0])
        setError("");
        setTempimage('')

      }
      } label="image" variant="outlined"color="success"  required />}
      {editdata&&tempimage.length>0?<img height={120} src={tempimage}/>:""}
      <Stack direction="row" spacing={2}>
      <Button variant="contained"   onClick={async()=>{
      if(editdata){
          const regex= new RegExp(/^(ftp|http|https):\/\/[^ "]+$/);
          if(regex.test(image)){
         await updateData('notification',{image,title,description,url},aboutid);
          await getAboutdata();
          setEditdata(false);
          setManAbout(false);
        
          }else{
        const formData = new FormData();
        formData.append("title",title)
        formData.append("description",description)
        formData.append("image",image)
        formData.append("url",url)
         await updateData('notification',formData,aboutid);
         await getAboutdata()
         setEditdata(false);
         setManAbout(false);
        
          }
      }else{

     if(image){
        const formData = new FormData();
        formData.append("title",title)
        formData.append("description",description)
        formData.append("image",image)
        formData.append("url",url)
        await postData('notification',formData)
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
  title={"Employee List"} 
  data={aboutdata}
  columns={columns}
  options={options}
/>}
     </>
 }
 export default Notification;