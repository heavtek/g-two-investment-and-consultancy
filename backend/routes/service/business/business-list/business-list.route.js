const router = require('express').Router();
const businessListModel = require('../../../../models/service/business/business-list/business-list.model');
router.post('/business-list',(req,res,next)=>{
    businessListModel.create(req.body,(error,data)=>{
        if(error) return res.status(400).send("Something went wrong!!");
        res.status(200).send("Record Added Successfully!!")
    })
})

router.get('/business-list',(req,res,next)=>{
  businessListModel.find({},(error,data)=>{
     if(error) return res.status(500).send("Something went wrong!!") ;
     return res.status(200).send(data);     
  })
})

router.get('/business/business-list/:bid',(req,res,next)=>{
  formativeListModel.find({businessId:req.params.bid},(error,data)=>{
      if(error) return res.status(500).send("Something went wrong!!");
      res.status(200).send(data);
  })
})

router.get('/business-list/:id',(req,res,next)=>{
  businessListModel.find({_id:req.params.id},(error,data)=>{
      if(error) return res.status(500).send("Something went wrong!!");
      res.status(200).send(data);
  })
})
router.delete('/business-list/:id',(req,res,next)=>{
  businessListModel.findOneAndDelete({_id:req.params.id},(error,data)=>{
      if(error) return res.status(500).send("Something went wrong!!");
      res.status(200).send("Record Deleted Successfully!!");
  })
})
router.put('/business-list/:id',(req,res,next)=>{
  businessListModel.findOneAndUpdate({_id:req.params.id},req.body,(error,data)=>{
      if(error) return res.status(500).send("Something went wrong!!");
      res.status(200).send("Record Updated Successfully!!");
  })
})
router.get('/business-list/:id',(req,res,next)=>{
  businessListModel.findOneAndUpdate({_id:req.params.id},req.body,(error,data)=>{
      if(error) return res.status(400).send("Something went wrong!!");
      res.status(200).send("Record Updated Successfully!!");
  })
})

module.exports = router;