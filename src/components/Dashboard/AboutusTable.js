import React, {useState,useEffect} from "react";
import MUIDataTable from "mui-datatables";
import Button from '@mui/material/Button';
import { NavLink } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import MakeusList from './AboutLists/MakeusList'
import Stack from '@mui/material/Stack';
import axios from "axios";
import {getAllData,postData,deleteData, updateData} from '../api/Api'
import ValueList from "./AboutLists/ValueList";


const data = [
 ["Joe James", "Test Corp", "Yonkers", "NY"],
 ["John Walsh", "Test Corp", "Hartford", "CT"],
 ["Bob Herm", "Test Corp", "Tampa", "FL"],
 ["James Houston", "Test Corp", "Dallas", "TX"],
];

const options = {
  filterType: 'checkbox',
};
 const Aboutustable=()=>{
      const[aboutusDescription,setAboutusDescription]=useState("");
  const[ourMission, setOurMission]=useState("");
  const[ourVision,setOurVision]=useState("");
  const[ourValues,setOurValues]=useState("");
  const[makeUsDifferent,setMakeUsDifferent]=useState("");
  const[businessApproach,setBusinessApproach]=useState("");
  const[aboutusImage,setAboutusImage]=useState("");
  const [aboutdata, setAboutdata]=useState([]);
  const[manAbout,setManAbout]=useState(false);
  const[editdata,setEditdata]=useState(false);
  const[aboutid,setAboutid]=useState("");
  const[tempimage,setTempimage]=useState("");
  const[error,setError]=useState("");
  const [selectedList,setSelectedList] = useState("");
  const[addlist,setAddlist]=useState(false);
  const columns = [   {
    name:"_id",
    label:"Id",
   options:{ 
display:false
   }
},
{
    name:"ourMission",
    label:"Mission",
},
{
  name:"aboutusDescription",
  label:"Description",
},
{
  name:"ourValues",
  label:"Values",
},
{
  name:"ourVision",
  label:"Vision",
}, 
{
  name:"makeUsDifferent",
  label:"Makes us different",
},{
  name:"businessApproach",
  label:"Business Approach",
},{
    name:"aboutusImage",
    label:"Image",
   options:{
    customBodyRender:(value,tableMeta,updateVale)=>{
        return <img src= {tableMeta.rowData[7]} alt={"About Us"}  height={100}/>
    }
   }
},
{
  name:"ourVision",
  label:"list",
   options:{
  customBodyRender:(value,tableMeta,updateVale)=>{
     return <>
      <select value={selectedList}  onChange={(e)=>{
            if(e.target.value!=3){
             setSelectedList(e.target.value)
              setAddlist(true);
            }else{
               setAddlist(false);
            }
          setAboutid(tableMeta.rowData[0]);
        }}  className="add-list-container">
        <option value={3} selected
         className="add-lists">Add Lists</option>
        <option  value={1} className="add-list-item">Make us Different</option>
        <option value={2} className="add-list-item" >Value Lists</option>
      </select>
      
        </>
  }
 }
},

{
    name:"ourMission",
    label:"Action",
     options:{
    customBodyRender:(value,tableMeta,updateVale)=>{
       return <>
    
        <Button type="button"  variant="contained" color="success"
         onClick={async ()=>{
             setManAbout(true);
             setEditdata(true);
            setAboutid(tableMeta.rowData[0]);
             setOurMission(tableMeta.rowData[1]);
             setOurValues(tableMeta.rowData[2]);
             setAboutusDescription(tableMeta.rowData[3]);
             setOurVision(tableMeta.rowData[4])
             setMakeUsDifferent(tableMeta.rowData[5])
             setBusinessApproach(tableMeta.rowData[6])
             setAboutusImage(tableMeta.rowData[7]);
             setTempimage(tableMeta.rowData[7]);
             

         }} >edit</Button>
             <Button type="button"  style={{marginRight:10}} variant="contained" color="error" 
        onClick={async ()=>{
            await deleteData('aboutus',tableMeta.
            rowData[0])
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
    const data=await getAllData('aboutus')
    if(Array.isArray(data)){
    setAboutdata(data)
    }else{
        console.log(data)
    }
       
  }


    useEffect(async () => {
await getAboutdata()
        console.log("aboutdat",await getAllData('aboutus'))
       }, []);
     return<>
       {addlist?<>{selectedList==2?<ValueList toggleAddList = {toggleList} 
       valueId={aboutid}/>:<>{selectedList==1?<MakeusList toggleAddList = {toggleList}
       valueId={aboutid}/>:''}</>}</>:<>
       {manAbout? <Button variant="contained" onClick={()=>{
     setManAbout(false)

 }} color="error">Cancel</Button>: <Button variant="contained"  onClick={()=>{
    setManAbout(true)
    setEditdata(false);
    setAboutid("");
             setOurMission("");
             setOurValues("");
             setAboutusDescription("");
           
             setAboutusImage("");
             setOurVision("")
             setMakeUsDifferent("")
             setBusinessApproach("")
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
      <TextField id="outlined-basic" label="Description" multiline value={aboutusDescription}  onChange={(e)=>{
        setAboutusDescription(e.target.value)
      }} variant="outlined" color="success" />
      <TextField id="outlined-basic" multiline label="Mission"  value={ourMission} onChange={(e)=>{
        setOurMission(e.target.value)  }}variant="outlined" color="success" />
      <TextField id="outlined-basic" multiline label="Vision"  value={ourVision}  onChange={(e)=>{
       setOurVision(e.target.value)
      }}  variant="outlined" color="success" />
      <TextField id="outlined-basic" label="Value" value={ourValues}   multiline onChange={(e)=>{
        setOurValues(e.target.value)
      }}variant="outlined" color="success" />
       <TextField id="outlined-basic" multiline label=" What Makes us Different" value={makeUsDifferent}   onChange={(e)=>{
        setMakeUsDifferent(e.target.value)
      }}variant="outlined" color="success" />
       <TextField id="outlined-basic" multiline label="Business Approach" value={businessApproach}   onChange={(e)=>{
        setBusinessApproach(e.target.value)
      }}variant="outlined" color="success" />
     {editdata?  <input type="file" id="outlined-basic" onChange={(e)=>{
        setAboutusImage(e.target.files[0]);
        setTempimage('')
        setError("");
      }
      } label="image" variant="outlined"color="success"  />:  
      <input type="file" id="outlined-basic" onChange={(e)=>{
        setAboutusImage(e.target.files[0])
        setError("");
        setTempimage('')

      }
      } label="image" variant="outlined"color="success"  required />}
      {editdata&&tempimage.length>0?<img height={120} src={tempimage}/>:""}
      <Stack direction="row" spacing={2}>
      <Button variant="contained"   onClick={async()=>{
      if(editdata){
          const regex= new RegExp(/^(ftp|http|https):\/\/[^ "]+$/);
          if(regex.test(aboutusImage)){
         await updateData('aboutus',{aboutusImage,aboutusDescription,ourMission,
          ourVision,ourValues,makeUsDifferent,businessApproach},aboutid);
          await getAboutdata();
          setEditdata(false);
          setManAbout(false);
        
          }else{
        const formData = new FormData();
        formData.append("aboutusDescription",aboutusDescription)
        formData.append("ourMission",ourMission)
        formData.append("ourVision",ourVision)
        formData.append("ourValues",ourValues)
        formData.append("makeUsDifferent",makeUsDifferent)
        formData.append("businessApproach",businessApproach)
        formData.append("aboutusImage",aboutusImage)
         await updateData('aboutus',formData,aboutid);
         await getAboutdata()
         setEditdata(false);
         setManAbout(false);
        
          }
      }else{

     if(aboutusImage){
        const formData = new FormData();
        formData.append("aboutusDescription",aboutusDescription)
        formData.append("ourMission",ourMission)
        formData.append("ourVision",ourVision)
        formData.append("ourValues",ourValues)
        formData.append("makeUsDifferent",makeUsDifferent)
        formData.append("businessApproach",businessApproach)
        formData.append("aboutusImage",aboutusImage)
        await postData('aboutus',formData)
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
  title={"About Us "} 
  data={aboutdata}
  columns={columns}
  options={options}
/>}
    </>}

    
    </>
 }
 export default Aboutustable;