import React, {useState,useEffect} from "react";
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';

import MUIDataTable from "mui-datatables";
import {getAllData,postData,deleteData, updateData} from '../../../api/Api';
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

const FormativeList =(props) =>{
  const [formativeListName,setFormativeListName]=useState("");
  const [formativeId,setFormativeId]=useState("");
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
  name:"  formativeId",
  label:"Id",
 options:{ 
display:false
 }
},
{
    name:"formativeListName",
    label:"List Name",
}, {
  name:"listDescription",
  label:"Description",
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
          setFormativeListName(tableMeta.rowData[2]);
          setListDescription(tableMeta.rowData[3])
          setFormativeId(props.  formativeId);
       }} >edit</Button>
             <Button type="button"  style={{marginRight:10}} variant="contained" color="error" 
      onClick={async ()=>{
          await deleteData('formative-list',tableMeta.rowData[0])
          getAboutdata()
      }} >delete</Button>
        </>
  }
 }
},
];
const getAboutdata=async()=>{
  const data=await getAllData('formative-list');
  if(Array.isArray(data)){
  setAboutdata(data)
  }else{
      console.log(data)
  }
     
}

useEffect(async () => {
  await getAboutdata();
  setFormativeId(props.  formativeId)       
}, []);
    return <>
    <Button variant="outlined" color="warning" className="mr-3"  onClick={()=>{
   props.toggleAddList();
}}>Back to Formative</Button>
    {manAbout? <Button variant="contained" onClick={()=>{
     setManAbout(false)

 }} color="error">Cancel</Button>: <Button variant="contained"  onClick={()=>{
    setManAbout(true)
    setEditdata(false);
    setAboutid("");
   setListDescription('');
   setFormativeListName('')
    setFormativeId(  formativeId);
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
      <TextField id="outlined-basic" value={formativeListName} onChange={(e)=>{
        setFormativeListName(e.target.value)
      }
      } label=" List Name"   variant="outlined" color="success" />

<TextField id="outlined-basic" multiline={true}  value={listDescription} onChange={(e)=>{
        setListDescription(e.target.value)
      }
      } label="Description"   variant="outlined" color="success" />
      <Stack direction="row" spacing={2}>
      <Button variant="contained"   onClick={async()=>{
         if(editdata){
          await updateData('formative-list',{formativeListName,listDescription,  formativeId},aboutid);
          await getAboutdata()
          setEditdata(false);
          setManAbout(false);
         }else{
          await postData('formative-list',{formativeListName,listDescription,  formativeId});
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
title={"Formative Lists"} 
data={aboutdata}
columns={columns}
options={options}
/>}
    </>
} 
export default FormativeList;