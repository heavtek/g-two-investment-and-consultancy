import React, {useState,useEffect} from "react";
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';

import MUIDataTable from "mui-datatables";
import {getAllData,postData,deleteData, updateData} from '../../api/Api';
import { setDatasets } from "react-chartjs-2";
const data = [
  ["Joe James", "Test Corp", "Yonkers", "NY"],
  ["John Walsh", "Test Corp", "Hartford", "CT"],
  ["Bob Herm", "Test Corp", "Tampa", "FL"],
  ["James Houston", "Test Corp", "Dallas", "TX"],
 ];
 
 const options = {
   filterType: 'checkbox',
 };

const MakeusList =(props) =>{
  const [valueList,setValueList]=useState("");
  const [valueId,setValueId]=useState("");
  const [aboutdata, setAboutdata]=useState([]);
  const[manAbout,setManAbout]=useState(false);
  const[editdata,setEditdata]=useState(false);
  const[aboutid,setAboutid]=useState("");
  const [listDescription,setListDescription] = useState('');
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
  name:"valueId",
  label:"Id",
 options:{ 
display:false
 }
},
{
    name:"valueList",
    label:"List Name",
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
setValueList(tableMeta.rowData[2]);
       
          setValueId(props.valueId);
       }} >edit</Button>
        <Button type="button"  style={{marginRight:10}} variant="contained" color="error" 
      onClick={async ()=>{
          await deleteData('make-list',tableMeta.rowData[0])
          await getAboutdata()
      }} >delete</Button>
        
        </>
  }
 }
},
];
const getAboutdata=async()=>{
  const data=await getAllData('make-list');
  if(Array.isArray(data)){
  setAboutdata(data)
  }else{
      console.log(data)
  }
     
}

useEffect(async () => {
  await getAboutdata();
  setValueId(props.valueId)       
}, []);
    return <>
    <Button variant="outlined" color="warning" className="mr-3"  onClick={()=>{
   props.toggleAddList();
}}>Back to Aboutus</Button>
    {manAbout? <Button variant="contained" onClick={()=>{
     setManAbout(false)

 }} color="error">Cancel</Button>: <Button variant="contained"  onClick={()=>{
    setManAbout(true)
    setEditdata(false);
    setAboutid("");
 
setValueList('')
    setValueId(valueId);
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
      value={valueList} onChange={(e)=>{
      setValueList(e.target.value)
      }
      } label="What Make us Different List" multiline   variant="outlined" color="success" />


      <Stack direction="row" spacing={2}>
      <Button variant="contained"   onClick={async()=>{
         if(editdata){
          await updateData('make-list',{valueList,valueId},aboutid);
          await getAboutdata()
          setEditdata(false);
          setManAbout(false);
         }else{
          await postData('make-list',{valueList,valueId});
          await getAboutdata();
           setEditdata(false);
           setManAbout(false);
         }
      }}
      color="success">Save</Button>
    </Stack>
  </Box>
  </div>
  </Card>: <MUIDataTable 
title={"What make us different"} 
data={aboutdata}
columns={columns}
options={options}
/>}
    </>
} 
export default MakeusList;