import React, {useState,useEffect} from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useFormControl } from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Sidebar from './Sidebar';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import IconButton from '@mui/material/IconButton';
import { styled } from '@mui/material/styles';
import axios from "axios";
import {getAllData,postData} from '../api/Api'
const Input = styled('input')({
  display: 'none',
});


const AboutForm=()=>{
  const[aboutusDescription,setAboutusDescription]=useState("");
  const[ourMission, setOurMission]=useState("");
  const[ourVision,setOurVision]=useState("");
  const[ourValues,setOurValues]=useState("");
  const[aboutusImage,setAboutusImage]=useState("");
  useEffect(async () => {
    
    console.log("aboutdat",await getAllData('aboutus'))
  
   }, []);
    return <>
     
  <Card sx={{ maxWidth: 600, bgcolor: 'white',border:"0px solid grey",boxShadow:"12px",marginLeft:"315px"}} sy={{minHeight: 600,border:"0px solid red"}}>
    <div className="form">
    <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '50ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField id="outlined-basic" label="Description" value={aboutusDescription}  onChange={(e)=>{
        setAboutusDescription(e.target.value)
      }} variant="outlined" color="success" />
      <TextField id="outlined-basic" label="Mission"  value={ourMission} onChange={(e)=>{
        setOurMission(e.target.value)  }}variant="outlined" color="success" />
      <TextField id="outlined-basic" label="Vision"  value={ourVision}  onChange={(e)=>{
       setOurVision(e.target.value)
      }}  variant="outlined" color="success" />
      <TextField id="outlined-basic" label="Value" value={ourValues}   onChange={(e)=>{
        setOurValues(e.target.value)
      }}variant="outlined" color="success" />
      <input type="file" id="outlined-basic" onChange={(e)=>{
        setAboutusImage(e.target.files[0])
      }
      } label="image" variant="outlined"color="success"  />
      <Stack direction="row" spacing={2}>
      <Button variant="contained"   onClick={()=>{
        const formData = new FormData();
        formData.append("aboutusDescription",aboutusDescription)
        formData.append("ourMission",ourMission)
        formData.append("ourVision",ourVision)
        formData.append("ourValues",ourValues)
        formData.append("aboutusImage",aboutusImage)
        axios.post('http://localhost:5000/aboutus',formData).then(
          (res)=>{
            console.log(res.data);
          }
        ).catch((e)=>console.log(e))
      }


      }color="success">Add</Button>
      </Stack>
    </Box>
    </div>
    </Card>
    </>
}
export default AboutForm;