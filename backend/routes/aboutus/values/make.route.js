const router = require('express').Router();
const valuesModel = require('../../../models/aboutus/values/make.model');

router.post('/make-list',(req,res)=>{
  valuesModel.create(req.body,(error,data)=>{
      if(error) return res.status(500).send("Something went wrong!!");
      res.status(200).send("Record added successfully!!");
  })  
})

router.get('/make-list',(req,res)=>{
    valuesModel.find({},(error,data)=>{
        if(error) return res.status(404).send("Something went wrong!!");
        res.status(200).send(data);
    })
})

router.get('/make-list/:id',(req,res)=>{
    valuesModel.find({_id:req.params.id},(error,data)=>{
        if(error) return res.status(404).send("Something went wrong!!");
        res.status(200).send(data);
    })
})

router.put('/make-list/:id',(req,res)=>{
    valuesModel.findOneAndUpdate({id:req.params.id},req.body,(error,data)=>{
        if(error) return res.status(404).send("Something went wrong!!");
         res.status(200).send("Record updated successfully!!");
    })
})

router.delete('/make-list/:id',(req,res)=>{
    valuesModel.findOneAndDelete({_id:req.params.id},(error,data)=>{
        if(error) return res.status(400).send("Something went wrong!!");
        res.status(200).send("Record deleted successfully!!");
    })
})

module.exports = router;