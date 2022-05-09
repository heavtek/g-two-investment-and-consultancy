import React, {useState,useEffect} from "react";
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import TextField from '@mui/material/TextField';
import "../../../assets/css/dash.css";
import {getAllData,postData,deleteData, updateData} from '../../api/Api'
import axios from "axios";
const Login = (props)=>{
    props.Nav(false);
    const[userName, setUserName]=useState("");
  const[userPassword,setUserPassword]=useState("");
    return  <>
  <Card sx={{ maxWidth: 600, bgcolor: 'white',border:"0px solid grey",boxShadow:"12px",marginLeft:"315px"}} sy={{minHeight: 600,border:"0px solid red"}}>
    <div className="loginform">
 <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '50ch' },
      }}
      noValidate
      autoComplete="off"
    >
        <p>
        </p>
      <TextField id="outlined-basic" label="Username"  value={userName}  onChange={(e)=>{
        setUserName(e.target.value)
      }} variant="outlined" color="success" />
      <TextField id="standard-password-input"   type="password" label="Password" value={userPassword}  onChange={(e)=>{
        setUserPassword(e.target.value)
      }} variant="outlined" color="success" />

      <Stack direction="row" spacing={2}>
      <Button variant="contained" onClick={async ()=>{
                const formData = {
                  userName,userPassword
                }
               const res= await postData('user',formData);
               console.log("user dat",await getAllData('user'))
              }
        
        
              } color="success">Login</Button>
      </Stack>
    </Box>
    </div>
    </Card>
    </>
}
export default Login;