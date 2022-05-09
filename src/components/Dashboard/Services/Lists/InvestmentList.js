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

const InvestmentList =(props) =>{
  const [investmentListName,setInvestmentListName]=useState("");
  const [investmentId,setInvestmentId]=useState("");
  const [aboutdata, setAboutdata]=useState([]);
  const[manAbout,setManAbout]=useState(false);
  const[editdata,setEditdata]=useState(false);
  const[aboutid,setAboutid]=useState("");
  const [listDescription,setListDescription] = useState('');
  const[error,setError]=useState("");
  const columns = [   {
    name:"_id",
    label:"Id",
   options:{ 
display:false
   }
},
{
  name:"investmentId",
  label:"Id",
 options:{ 
display:false
 }
},
{
    name:"investmentListName",
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
          setInvestmentListName(tableMeta.rowData[2]);
          setListDescription(tableMeta.rowData[3])
          setInvestmentId(props.investmentId);
       }} >edit</Button>
             <Button type="button"  style={{marginRight:10}} variant="contained" color="error" 
      onClick={async ()=>{
          await deleteData('investment-list',tableMeta.rowData[0])
          getAboutdata()
      }} >delete</Button>
        </>
  }
 }
},
];
const getAboutdata=async()=>{
  const data=await getAllData('investment-list');
  if(Array.isArray(data)){
  setAboutdata(data)
  }else{
      console.log(data)
  }
     
}

useEffect(async () => {
  await getAboutdata();
  setInvestmentId(props.investmentId)       
}, []);
    return <>
    <Button variant="outlined" color="warning" className="mr-3"  onClick={()=>{
   props.toggleAddList();
}}>Back to Investment</Button>
    {manAbout? <Button variant="contained" onClick={()=>{
     setManAbout(false)

 }} color="error">Cancel</Button>: <Button variant="contained"  onClick={()=>{
    setManAbout(true)
    setEditdata(false);
    setAboutid("");
   setListDescription('');
   setInvestmentListName('')
    setInvestmentId(investmentId);
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
      <TextField id="outlined-basic" value={investmentListName} onChange={(e)=>{
        setInvestmentListName(e.target.value)
      }
      } label=" Subtitle"   variant="outlined" color="success" />

<TextField id="outlined-basic" multiline={true}  value={listDescription} onChange={(e)=>{
        setListDescription(e.target.value)
      }
      } label="Description"   variant="outlined" color="success" />
      <Stack direction="row" spacing={2}>
      <Button variant="contained"   onClick={async()=>{
         if(editdata){
          await updateData('investment-list',{investmentListName,listDescription,investmentId},aboutid);
          await getAboutdata()
          setEditdata(false);
          setManAbout(false);
         }else{
          await postData('investment-list',{investmentListName,listDescription,investmentId});
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
title={"Investment Lists"} 
data={aboutdata}
columns={columns}
options={options}
/>}
    </>
} 
export default InvestmentList;