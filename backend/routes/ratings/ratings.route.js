const express = require('express');

const router = express.Router();
const ratingModel = require('../../models/ratings/rating.model');

router.get('/rating',(req,res,next)=>{
  ratingModel.find({},(error,data)=>{
      if(error) return res.status(500).send("Something went wrong!!");
      res.status(200).send(data);
  })
})

router.get('/rating/:id',(req,res,next)=>{
    ratingModel.find({_id:req.params.id},(error,data)=>{
        if(error) return res.status(500).send("Something went wrong!!");
        res.status(200).send(data);
    })
})

router.put('/rating/:id',(req,res,next)=>{
    ratingModel.findOneAndUpdate({_id:req.params.id},req.body,(error,data)=>{
        if(error) return res.status(404).send("Something went wrong!!");
        res.status(200).send("Record Updated Successfully!!");
    })
})

router.post('/rating',(req,res,next)=>{
    ratingModel.create(req.body,(error,data)=>{
        if(error) return res.status(404).send("Something went wrong!!");
        res.status(200).send("Record Created Successfully!!");
    })
})

router.delete('/rating/:id',(req,res)=>{
    ratingModel.findOneAndDelete({_id:req.params.id},req.body,(error,data)=>{
        if(error) return res.status(500).send("Something went wrong!!");
        res.status(200).send("Record Deleted Successfully!!");
    })
})

module.exports = router;