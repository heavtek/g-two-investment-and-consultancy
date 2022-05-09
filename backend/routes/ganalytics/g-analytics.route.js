const express = require('express');
const router = express.Router();
const {BetaAnalyticsDataClient} = require('@google-analytics/data');
const propertyID = 312177151;
const analyticsDataClient = new BetaAnalyticsDataClient();
    
  
router.get('/ga-data',async (req,res,next)=>{
    try {
      
    const [response] = await analyticsDataClient.runRealtimeReport({

      property: `properties/${propertyID}`,
      dimensions: [
        {
          name: 'country',
        },
        {
          name: 'city',
        },
        {
          name:'deviceCategory'
        },
       
      ],
      dateRanges: [
        {
          startDate: '7daysAgo',
          endDate: 'today'
        }
      ],
      metrics: [
        {
          name: 'activeUsers',
        },
        {
          name:'screenPageViews'
        }
      ],
    });
    res.status(200).send(response);
    
    } catch (e) {
      res.send(e.message)
    }
})

router.get('/ga-report',async (req,res,next)=>{
  try{
    const [response] = await analyticsDataClient.runReport({
      property: `properties/${propertyID}`,
      dateRanges: [
        {
          startDate: '2022-03-08',
          endDate: 'today',
        },
       
      ],
      dimensions: [
        {
          name:'browser'
        },
        {
          name:'country'
        },{
          name:'city'
        },
        {
          name:'date'
        },
        {
          name: 'deviceCategory',
        },
        {
          name:'year'
        }
      ],
      metrics: [
        {
          name: 'activeUsers',
        },
        {
          name:'totalUsers'
        }
        
      ],
    });
    res.send(response)
  }catch(error){
    res.send(error.message)
  }
})

module.exports = router;