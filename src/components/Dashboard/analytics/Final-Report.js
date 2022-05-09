import React,{useState,useEffect} from  'react'
import axios from 'axios';
import {Chart} from 'react-google-charts';

const FinalReport = () =>{
   const [totalUsers,setTotalUsers] = useState(0);
   const [country,setCountery] = useState([]);
   const [deviceCategory,setDeviceCategory] = useState([]);
   const [city,setCity] = useState([]);
   const [browsers,setBrowsers] = useState([]);
   const [year,setYear] = useState('');
   const [chrome,setChrome] = useState(0);
   const [edge,setEdge] = useState(0);
   const [opera,setOpera] = useState(0);
   const [mozilla,setMozilla] = useState(0);
   const [otherBrowser,setOtherBrowsers] = useState(0);
   const [loaded,setLoaded] = useState(false);
   const [desktop,setDesktop] = useState(0);
   const [mobile,setMobile] = useState(0);
   const [tablet,setTablet] = useState(0);

   const chromeBrowser = [];
   const mozillaBrowser = [];
   const edgeBrowser = [];
   const operaBrowser = []
   const otherBrowsers = [];
   const mobiles = [];
   const desktops = [];
   const tablets = [];
   const getData = async ( ) =>{
    try{
      const res = await axios.get(`${process.env.REACT_APP_DB_SERVER_URL}/ga-report`);
        console.log('report data',res.data)
        for(let i=0; i<res.data.rows.length;i++){
           for(let j = 0; j<res.data.rows[i].dimensionValues.length;j++){
             if(res.data.rows[i].dimensionValues[0].value ==="Chrome"){
               chromeBrowser.push(res.data.rows[i].dimensionValues[0].value);
                break;
             }else if(res.data.rows[i].dimensionValues[0].value==="Edge"){
                 edgeBrowser.push(res.data.rows[i].dimensionValues[0].value) 
                break;
            }else if(res.data.rows[i].dimensionValues[0].value==="Mozilla"){
               mozillaBrowser.push(res.data.rows[i].dimensionValues[0].value) 
              break;
            }else if(res.data.rows[i].dimensionValues[0].value==="Opera"){
               operaBrowser.push(res.data.rows[i].dimensionValues[0].value) 
              break;
            }else if(res.data.rows[i].dimensionValues[0].value!=="Edge"&&
               res.data.rows[i].dimensionValues[0].value!=="Chrome"&&
               res.data.rows[i].dimensionValues[0].value!=="Mozilla"&&
               res.data.rows[i].dimensionValues[0].value!=="Opera"){
               otherBrowsers.push(res.data.rows[i].dimensionValues[0].value);
               break;
            }
         
         }

         for(let j=0; j<res.data.rows[i].dimensionValues.length;j++){
            if(res.data.rows[i].dimensionValues[4].value ==="desktop"){
               desktops.push(res.data.rows[i].dimensionValues[4].value);
                break;
             }else if(res.data.rows[i].dimensionValues[4].value==="mobile"){
                 mobiles.push(res.data.rows[i].dimensionValues[4].value) 
                break;
            }else if(res.data.rows[i].dimensionValues[4].value==="tablet"){
               tablets.push(res.data.rows[i].dimensionValues[4].value) 
              break;
            }
         }
         console.log('Desktop',desktops.length)
        }
        setDesktop(desktops.length);
        setMobile(mobiles.length);
        setTablet(tablets.length);
        setChrome(chromeBrowser.length)
        setEdge(edgeBrowser.length);
        setMozilla(mozillaBrowser.length);
        setOpera(operaBrowser.length);
        setOtherBrowsers(otherBrowsers.length);
        setLoaded(true)
        console.log("chrome Found",chromeBrowser.length)
    }catch(e){
       console.log(e.message)
    }
   }
  useEffect( async ()=>{
     await getData();
  },[])

  return<>
    {loaded?<>
      <div className='container'>
  <div className='row'>
         <div className='col'>
    <Chart
      chartType="PieChart"
      data={[
         ["Browser", "Percent"],
         ["Chrome", chrome],
         ["Edge", edge],
         ["Mozila", mozilla],
         ["Opera",opera],
         ["Other",otherBrowser]
       ]}
      options={{
         title:'Used Browsers',
      }}
 
    /></div>
    <div className='col'>
    <Chart
      chartType="PieChart"
      data={[
      ["Device Category", "Percent"],
      ["Desktop",desktop],
      ["Mobile", mobile],
      ["Tablet", tablet],
    ]}
      options={{
         title:'Deivces Category',
         colors: ['green', 'magenta', 'brown']
      }}
   
    /></div>
   </div>
      </div>
  </>:<h2 className='text-center text-inof'>Loading...</h2>}
     </>
}

export default FinalReport;