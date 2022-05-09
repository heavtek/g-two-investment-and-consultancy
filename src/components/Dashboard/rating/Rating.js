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
 ["Joe James", "Test Corp", "Yonkers", "NY"],
 ["John Walsh", "Test Corp", "Hartford", "CT"],
 ["Bob Herm", "Test Corp", "Tampa", "FL"],
 ["James Houston", "Test Corp", "Dallas", "TX"],
];

const options = {
  filterType: 'checkbox',
};
 const Rating=()=>{
   const [ratingNumber,setRatingNumber]= useState("");
   const [reviewNumber,setReviewNumber]= useState("")
  const [aboutdata, setAboutdata]=useState([]);
  const[manAbout,setManAbout]=useState(false);
  const[editdata,setEditdata]=useState(false);
  const[aboutid,setAboutid]=useState("");
  const[error,setError]=useState("");
  const columns = [   {
    name:"_id",
    label:"Id",
   options:{ 
display:false
   }
},
{
    name:"ratingNumber",
    label:"Rating",
},
 {
     name:"reviewNumber",
     label: "Google Review"
 },
{
    name:"userDescription",
    label:"Action",
     options:{
    customBodyRender:(value,tableMeta,updateVale)=>{
       return <>
        <Button type="button"  style={{marginRight:10}} variant="contained" color="error" 
        onClick={async ()=>{
            await deleteData('rating',tableMeta.rowData[0])
            getAboutdata()
        }} >delete</Button>
        <Button type="button"  variant="contained" color="success"
         onClick={async ()=>{
             setManAbout(true);
             setEditdata(true);
             setAboutid(tableMeta.rowData[0]);
             setRatingNumber(tableMeta.rowData[1]);
             setReviewNumber(tableMeta.rowData[2])
         }} >edit</Button>
          
          </>
    }
   }
},
];

const getAboutdata=async()=>{
    const data=await getAllData('rating');
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
    setRatingNumber("");
    setReviewNumber("")
          
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
      <TextField id="outlined-basic"
       label="Rating" value={ratingNumber}  onChange={(e)=>{
        setRatingNumber(e.target.value)
      }} variant="outlined" color="success" />
       <TextField id="outlined-basic"
       label="Review Number" value={reviewNumber}  onChange={(e)=>{
        setReviewNumber(e.target.value)
      }} variant="outlined" color="success" />
     
      
    
      <Stack direction="row" spacing={2}>
      <Button variant="contained"  onClick={async ()=>{
          if(editdata){
            const formData = {
              ratingNumber,
              reviewNumber
            }
           await updateData('rating',{ratingNumber,reviewNumber},aboutid);
            await getAboutdata();
            setEditdata(false);
            setManAbout(false);
          
            }else{
    const formData = {
       ratingNumber,
       reviewNumber
    }
   const res= await postData('rating',formData);
   await getAboutdata();
   setEditdata(false);
   setManAbout(false);
  }
}}color="success">Save</Button>
      </Stack>
    </Box>
    </div>
    </Card>: <MUIDataTable 
  title={"Rating"} 
  data={aboutdata}
  columns={columns}
  options={options}
/>}
     </>
 }
 export default Rating;