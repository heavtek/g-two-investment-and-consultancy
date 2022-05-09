import React,{useState,useEffect} from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import CountryCityList from './Country-city';
import { Doughnut } from 'react-chartjs-2';
import axios from 'axios';
ChartJS.register(ArcElement, Tooltip, Legend);


const GAnalytics=() => {
    const [activeUsers,setActiveUsers] = useState('');
    const [pageViews,setPageViews] = useState([]);
    const [tablet,setTablet] = useState([]);
    const [desktop,setDesktop] = useState([])
    const [mobile,setMobile] = useState([]);
    const [isLoaded,setIsLoaded] = useState(false);
    const [numberofMobiles,setNumberofMobiles] = useState(0);
    const [numberofDesktops,setNumberofDesktops] = useState(0);
    const [numberofTablets,setNumberofTablets] = useState(0);
    const getGaData = async () => {
    try {
        const res = await axios.get(`${process.env.REACT_APP_DB_SERVER_URL}/ga-data`);
         console.log(res.data) 
        for(let i=0;i<res.data?.rows.length;i++){
          for(let j=0;j<res.data.rows[i].dimensionValues.length;j++){
            if(res.data.rows[i].dimensionValues[2].value==='desktop'){
              console.log('found desk',res.data.rows[i].dimensionValues[2].value)
              desktop.push( res.data.rows[i].dimensionValues[2].value);
              break;
            }else if(res.data.rows[i].dimensionValues[2].value==='mobile'){
             mobile.push(res.data.rows[i].dimensionValues[2].value);
             break;
            }else if(res.data.rows[i].dimensionValues[2].value==='tablet'){
              tablet.push(res.data.rows[i].dimensionValues[2].value);
              break;
            }
          }
          setNumberofDesktops(desktop.length);
          setNumberofMobiles(mobile.length);
          setNumberofTablets(tablet.length);
          console.log('desktop',res.data,desktop.length,'mobile',mobile.length)
          var activeusers=0;
          for(let j=0;j<res.data.rows[i].metricValues.length;j++){
            if(res.data.rows[i].metricValues[0].value!==null){
              activeusers = activeusers+1;
              setActiveUsers(activeusers)
              setPageViews(res.data.rows[i].metricValues[1]?.value)
              break;
            }
          }
         }

          setIsLoaded(true);
    } catch (error) {
      setIsLoaded(false)
        console.log('error',error.message)
    }
    }
    useEffect(async()=>{
     await getGaData();
    },[])
  return <div style={{height:400}} className="row text-center">
          {isLoaded?<>
            <div className='col' style={{width:2}}>
            <Doughnut options={{
          responsive: true,
          maintainAspectRatio: false,
        }}  data={
            {
                labels: [ 'Active Users', 'Screen Page Views'],
                datasets: [
                  {
                    label: '# of Votes',
                    data: [activeUsers, pageViews],
                    backgroundColor: [
                      'rgba(255, 99, 132, 0.2)',
                      'rgba(54, 162, 235, 0.2)',
                      'rgba(153, 102, 255, 0.2)',
                    ],
                    borderColor: [
                      'rgba(255, 99, 132, 1)',
                      'rgba(54, 162, 235, 1)',
                      'rgba(255, 159, 64, 1)',
                    ],
                    borderWidth: 1,
                    innerHeight:1
                  },
                ],
              }
        } />
            </div>
          <div className='col'>
          <Doughnut options={{
          responsive: true,
          maintainAspectRatio: false,
        }}  data={
        
            {
                labels: [ 'Desktop','Mobile','Tablet'],
                datasets: [
                  {
                    label: '# of Votes',
                    data: [numberofDesktops,numberofMobiles,numberofTablets],
                    backgroundColor: [
                      'rgba(255, 99, 132, 1)',
                      'rgba(54, 162, 235, 1)',
                      'rgba(255, 159, 64, 1)',
                    ],
                    borderColor: [
                      'rgba(25, 99, 132, 1)',
                      'rgba(50, 62, 235, 1)',
                      'rgba(255, 59, 64, 1)',
                    ],
                    borderWidth: 1,
                    innerHeight:1
                  },
                ],
              }
        } />
  
            </div>      
        <CountryCityList/>
        </>:<p  className="text-center display-4 text-warning">Loading...</p>}
         </div>;
}

export default GAnalytics;
