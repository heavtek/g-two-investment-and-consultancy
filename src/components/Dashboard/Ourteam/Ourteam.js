import React, {useState,useEffect} from "react";
import MUIDataTable from "mui-datatables";
import Button from '@mui/material/Button';
import { NavLink } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';

import {getAllData,postData,deleteData, updateData} from '../../api/Api'



const data = [

];

const options = {
  filterType: 'checkbox',
};
 const Ourteam=()=>{
      const[memberName,setMemberName]=useState("");
  const[memberRole, setMemberRole]=useState("");
  const[memberImage,setMemberImage]=useState("");
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
    name:"memberName",
    label:"Name",
},
{
  name:"memberRole",
  label:"Role",
},

 {
  name:"description",
  label:"Description",
}, {
    name:"memberImage",
    label:"Image",
   options:{
    customBodyRender:(value,tableMeta,updateVale)=>{
        return <img src= {tableMeta.rowData[4]} alt={"team member"}  height={100}/>
    }
   }
},
{
    name:"memberName",
    label:"Action",
     options:{
    customBodyRender:(value,tableMeta,updateVale)=>{
       return <>
       
        <Button type="button"  variant="contained" color="success"
         onClick={async ()=>{
             setManAbout(true);
             setEditdata(true);
            setAboutid(tableMeta.rowData[0]);
             setMemberName(tableMeta.rowData[1]);
             setMemberRole(tableMeta.rowData[2]);  
             setDescription(tableMeta.rowData[3])
            setMemberImage(tableMeta.rowData[4]);
             setTempimage(tableMeta.rowData[4]);
           

         }} >edit</Button>
           <Button type="button"  style={{marginRight:10}} variant="contained" color="error" 
        onClick={async ()=>{
            await deleteData('team',tableMeta.rowData[0])
            getAboutdata()
        }} >delete</Button>
          </>
    }
   }
},
];

const getAboutdata=async()=>{
    const data=await getAllData('team')
    if(Array.isArray(data)){
      setAboutdata(data)
    }else{
        console.log(data)
    }
       
  }


    useEffect(async () => {
await getAboutdata()
        console.log("aboutdat",await getAllData('team'))
       }, []);
     return<>
 {manAbout? <Button variant="contained" onClick={()=>{
     setManAbout(false)

 }} color="error">Cancel</Button>: <Button variant="contained"  onClick={()=>{
    setManAbout(true)
    setEditdata(false);
    setAboutid("");
             setMemberName("");
             setMemberRole("");
             setMemberImage("");
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
      <TextField id="outlined-basic" label="Name" value={memberName}  onChange={(e)=>{
        setMemberName(e.target.value)
      }} variant="outlined" color="success" />
      <TextField id="outlined-basic" label="Role"  value={memberRole} onChange={(e)=>{
        setMemberRole(e.target.value)  }}variant="outlined" color="success" />
          <TextField id="outlined-basic" multiline label="Description"  value={description} onChange={(e)=>{
        setDescription(e.target.value)  }}variant="outlined" color="success" />
     {editdata?  <input type="file" id="outlined-basic" onChange={(e)=>{
        setMemberImage(e.target.files[0]);
        setTempimage('')
        setError("");
      }
      } label="image" variant="outlined"color="success"  />:  
      <input type="file" id="outlined-basic" onChange={(e)=>{
        setMemberImage(e.target.files[0])
        setError("");
        setTempimage('')

      }
      } label="image" variant="outlined"color="success"  required />}
      {editdata&&tempimage.length>0?<img height={120} src={tempimage}/>:""}
      <Stack direction="row" spacing={2}>
      <Button variant="contained"   onClick={async()=>{
      if(editdata){
          const regex= new RegExp(/^(ftp|http|https):\/\/[^ "]+$/);
          if(regex.test(memberImage)){
         await updateData('team',{memberImage,memberName,memberRole,description},aboutid);
          await getAboutdata();
          setEditdata(false);
          setManAbout(false);
        
          }else{
        const formData = new FormData();
        formData.append("memberName",memberName)
        formData.append("memberRole",memberRole)
        formData.append("description",description)
        formData.append("memberImage",memberImage)
         await updateData('team',formData,aboutid);
         await getAboutdata()
         setEditdata(false);
         setManAbout(false);
        
          }
      }else{

     if(memberImage){
        const formData = new FormData();
        formData.append("memberName",memberName)
        formData.append("memberRole",memberRole)
        formData.append("description",description)
        formData.append("memberImage",memberImage)
        await postData('team',formData)
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
  title={"Team"} 
  data={aboutdata}
  columns={columns}
  options={options}
/>}
     </>
 }
 export default Ourteam;