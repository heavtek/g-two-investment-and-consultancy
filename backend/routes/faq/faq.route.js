const express = require('express');
const  faqModel = require('../../models/faq/faq.model');

const router = express.Router();

 router.get('/faq',(req,res)=>{
     faqModel.find({},(error,data)=>{
         if(error) return res.status(500).send("Something went wrong!!");
         res.status(200).send(data);
     })
 })

 router.get('/faq/:id',(req,res)=>{
    faqModel.find({_id:req.params.id},(error,data)=>{
        if(error) return res.status(500).send("Something went wrong!!");
        res.status(200).send(data);
    })
})
router.delete('/faq/:id',(req,res)=>{
    faqModel.findOneAndDelete({_id:req.params.id},(error,data)=>{
        if(error) return res.status(500).send("Something went wrong!!");
        res.status(200).send("Record deleted successfully!!");
    })
})

router.put('/faq/:id',(req,res)=>{
    faqModel.findOneAndUpdate({_id:req.params.id},(error,data)=>{
        if(error) return res.status(500).send("Something went wrong!!");
        res.status(200).send("Record updated successfully!!");
    })
})

router.post('/faq',(req,res)=>{
    faqModel.create(req.body,(error,data)=>{
        if(error) return res.status(400).send("Invalid data");
        res.status(200).send("Record added successfully!!")
    })
})

module.exports = router;