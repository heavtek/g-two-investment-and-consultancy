const express = require('express');

const router = express.Router();
const subscriptionModel = require('../../models/subscribtion/subscription.model');

router.get('/subscription',(req,res,next)=>{
  subscriptionModel.find({},(error,data)=>{
      if(error) return res.status(500).send("Something went wrong!!");
      res.status(200).send(data);
  })
})

router.get('/subscription/:id',(req,res,next)=>{
    subscriptionModel.find({_id:req.params.id},(error,data)=>{
        if(error) return res.status(500).send("Something went wrong!!");
        res.status(200).send(data);
    })
})

router.put('/subscription/:id',(req,res,next)=>{
    subscriptionModel.findOneAndUpdate({_id:req.params.id},req.body,(error,data)=>{
        if(error) return res.status(404).send("Something went wrong!!");
        res.status(200).send("Record Updated Successfully!!");
    })
})

router.post('/subscription',(req,res,next)=>{
    subscriptionModel.create(req.body,(error,data)=>{
        if(error) return res.status(404).send("Something went wrong!!");
        res.status(200).send("Record Created Successfully!!");
    })
})

router.delete('/subscription/:id',(req,res)=>{
    subscriptionModel.findOneAndDelete({_id:req.params.id},req.body,(error,data)=>{
        if(error) return res.status(500).send("Something went wrong!!");
        res.status(200).send("Record Deleted Successfully!!");
    })
})

module.exports = router;