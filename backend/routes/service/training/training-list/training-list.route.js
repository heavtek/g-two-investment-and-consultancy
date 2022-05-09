const router = require('express').Router();
const trainingModel = require('../../../../models/service/training/training-list/training-list.model');

router.post('/training-list',(req,res,next)=>{
    trainingModel.create(req.body,(error,data)=>{
        if(error) return res.status(400).send("Something went wrong!!");
        res.status(200).send("Record Added Successfully!!")
    })
})

router.get('/training-list',(req,res,next)=>{
    trainingModel.find({},(error,data)=>{
     if(error) return res.status(500).send("Something went wrong!!") ;
     return res.status(200).send(data);     
  })
})

router.get('/training-list/:id',(req,res,next)=>{
  trainingModel.find({_id:req.params.id},(error,data)=>{
      if(error) return res.status(500).send("Something went wrong!!");
      res.status(200).send(data);
  })
})
router.delete('/training-list/:id',(req,res,next)=>{
  trainingModel.findOneAndDelete({_id:req.params.id},(error,data)=>{
      if(error) return res.status(500).send("Something went wrong!!");
      res.status(200).send("Record Deleted Successfully!!");
  })
})
router.put('/training-list/:id',(req,res,next)=>{
    trainingModel.findOneAndUpdate({_id:req.params.id},req.body,(error,data)=>{
        if(error) return res.status(500).send("Something went wrong!!");
        res.status(200).send("Record Updated Successfully!!");
    })
  })
router.get('/training-list/:id',(req,res,next)=>{
  trainingModel.findOneAndUpdate({_id:req.params.id},req.body,(error,data)=>{
      if(error) return res.status(400).send("Something went wrong!!");
      res.status(200).send("Record Updated Successfully!!");
  })
})

router.get('/training/training-list/:tid',(req,res,next)=>{
    trainingModel.find({trainingId:req.params.tid},(error,data)=>{
        if(error) return res.status(500).send("Something went wrong!!");
        res.status(200).send(data);
    })
})
module.exports = router;