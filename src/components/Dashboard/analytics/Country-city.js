import axios from "axios";
import React,{useState,useEffect} from "react";
import MUIDataTable from 'mui-datatables';


export const options = {
  curveType: "function",
  legend: { position: "bottom" },
  pageSize: 4,
  titleTextStyle: {
    fontSize:'300px'
}
};

const columns = ['Country','City'];

const CountryChartList = ()=> {
  let city = []
  let country = [];
  const mixedData = [];
  const [loaded,setLoaded] = useState(false);
  const [data,setData] =useState([]);;
  const getData = async () =>{
   try{
    const res = await axios.get(`${process.env.REACT_APP_DB_SERVER_URL}/ga-data`);
    setLoaded(true)
      for(let i=0;i<res.data?.rows.length;i++){
        for(let j = 0 ; j<res.data?.rows[i].dimensionValues.length ; j++){
            country.push(res.data.rows[i].dimensionValues[0].value)
            city.push(res.data.rows[i].dimensionValues[1].value);
            mixedData.push([res.data.rows[i].dimensionValues[0].value,res.data.rows[i].dimensionValues[1].value])
            break;
        }
        setTimeout(()=>{
          setData(mixedData)
        },1000)
      
      }
   } catch(error){
     console.log(error.message)
   }
  }

  useEffect(async ()=>{
    await getData();
  },[])
  return (
   <div className="row" style={{marginTop:20}}>
       {loaded?<>
        <div className="col-md-2"></div>
    <div className="col-md-8">
      <MUIDataTable
          title={"Visitor's Country and City"}
          data={data}
          columns={columns}
          options={{
            selectableRows: 'none',
            download:false,
            print:false,
            responsive: "standard",
            filter:false,
            viewColumns:false
          }}
        />
    
      </div>
    <div className="col-md-2"></div></>
:<h2 className="text-center text-info">Loading....</h2>}
       </div>
  );
}

export default CountryChartList;
