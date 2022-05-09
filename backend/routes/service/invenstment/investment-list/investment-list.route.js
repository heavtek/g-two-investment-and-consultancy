const router = require('express').Router();

const investementModel = require('../../../../models/service/investment/investment-list/investment-list.model');
router.post('/investment-list',(req,res,next)=>{
    investementModel.create(req.body,(error,data)=>{
        if(error) return res.status(400).send("Something went wrong!!");
        res.status(200).send("Record Added Successfully!!")
    })
})

router.get('/investment-list',(req,res,next)=>{
  investementModel.find({},(error,data)=>{
     if(error) return res.status(500).send("Something went wrong!!") ;
     return res.status(200).send(data);     
  })
})

router.get('/investment/investment-list/:iid',(req,res,next)=>{
  formativeListModel.find({investmentId:req.params.iid},(error,data)=>{
      if(error) return res.status(500).send("Something went wrong!!");
      res.status(200).send(data);
  })
})
router.get('/investment-list/:id',(req,res,next)=>{
  investementModel.find({_id:req.params.id},(error,data)=>{
      if(error) return res.status(500).send("Something went wrong!!");
      res.status(200).send(data);
  })
})
router.delete('/investment-list/:id',(req,res,next)=>{
  investementModel.findOneAndDelete({_id:req.params.id},(error,data)=>{
      if(error) return res.status(500).send("Something went wrong!!");
      res.status(200).send("Record Deleted Successfully!!");
  })
})
router.put('/investment-list/:id',(req,res,next)=>{
  investementModel.findOneAndUpdate({_id:req.params.id},req.body,(error,data)=>{
      if(error) return res.status(500).send("Something went wrong!!");
      res.status(200).send("Record Updated Successfully!!");
  })
})
router.get('/investment-list/:id',(req,res,next)=>{
  investementModel.findOneAndUpdate({_id:req.params.id},req.body,(error,data)=>{
      if(error) return res.status(400).send("Something went wrong!!");
      res.status(200).send("Record Updated Successfully!!");
  })
})

module.exports = router;