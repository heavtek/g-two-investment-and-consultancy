const express = require('express');

const router = express.Router();
const contactusModel = require('../../models/contactus/contactus.model');

router.get('/contactus',(req,res,next)=>{
  contactusModel.find({},(error,data)=>{
      if(error) return res.status(500).send("Something went wrong!!");
      res.status(200).send(data);
  })
})

router.get('/contactus/:id',(req,res,next)=>{
    contactusModel.find({_id:req.params.id},(error,data)=>{
        if(error) return res.status(500).send("Something went wrong!!");
        res.status(200).send(data);
    })
})

router.put('/contactus/:id',(req,res,next)=>{
    contactusModel.findOneAndUpdate({_id:req.params.id},req.body,(error,data)=>{
        if(error) return res.status(404).send("Something went wrong!!");
        res.status(200).send("Record Updated Successfully!!");
    })
})

router.post('/contactus',(req,res,next)=>{
    contactusModel.create(req.body,(error,data)=>{
        if(error) return res.status(404).send("Something went wrong!!");
        res.status(200).send("Record Created Successfully!!");
    })
})

router.delete('/contactus/:id',(req,res)=>{
    contactusModel.findOneAndDelete({_id:req.params.id},req.body,(error,data)=>{
        if(error) return res.status(500).send("Something went wrong!!");
        res.status(200).send("Record Deleted Successfully!!");
    })
})

module.exports = router;