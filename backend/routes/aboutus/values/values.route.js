const router = require('express').Router();
const valuesModel = require('../../../models/aboutus/values/values.model');

router.post('/values-list',(req,res)=>{
  valuesModel.create(req.body,(error,data)=>{
      if(error) return res.status(500).send("Something went wrong!!");
      res.status(200).send("Record added successfully!!");
  })  
})

router.get('/values-list',(req,res)=>{
    valuesModel.find({},(error,data)=>{
        if(error) return res.status(404).send("Something went wrong!!");
        res.status(200).send(data);
    })
})

router.get('/values-list/:id',(req,res)=>{
    valuesModel.find({_id:req.params.id},(error,data)=>{
        if(error) return res.status(404).send("Something went wrong!!");
        res.status(200).send(data);
    })
})

router.put('/values-list/:id',(req,res)=>{
    valuesModel.findOneAndUpdate({id:req.params.id},req.body,(error,data)=>{
        if(error) return res.status(404).send("Something went wrong!!");
         res.status(200).send("Record updated successfully!!");
    })
})

router.delete('/values-list/:id',(req,res)=>{
    valuesModel.findOneAndDelete({_id:req.params.id},(error,data)=>{
        if(error) return res.status(400).send("Something went wrong!!");
        res.status(200).send("Record deleted successfully!!");
    })
})

module.exports = router;