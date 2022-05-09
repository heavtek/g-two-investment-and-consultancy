const router = require('express').Router();
const formativeListModel = require('../../../../models/service/formative/formative-list/formative-list.model');
router.post('/formative-list',(req,res,next)=>{
    formativeListModel.create(req.body,(error,data)=>{
        if(error) return res.status(400).send("Something went wrong!!");
        res.status(200).send("Record Added Successfully!!")
    })
})

router.get('/formative-list',(req,res,next)=>{
  formativeListModel.find({},(error,data)=>{
     if(error) return res.status(500).send("Something went wrong!!") ;
     return res.status(200).send(data);     
  })
})

router.get('/formative-list/:id',(req,res,next)=>{
  formativeListModel.find({_id:req.params.id},(error,data)=>{
      if(error) return res.status(500).send("Something went wrong!!");
      res.status(200).send(data);
  })
})
router.delete('/formative-list/:id',(req,res,next)=>{
  formativeListModel.findOneAndDelete({_id:req.params.id},(error,data)=>{
      if(error) return res.status(500).send("Something went wrong!!");
      res.status(200).send("Record Deleted Successfully!!");
  })
})
router.put('/formative-list/:id',(req,res,next)=>{
  formativeListModel.findOneAndUpdate({_id:req.params.id},req.body,(error,data)=>{
      if(error) return res.status(500).send("Something went wrong!!");
      res.status(200).send("Record Updated Successfully!!");
  })
})
router.get('/formative-list/:id',(req,res,next)=>{
  formativeListModel.findOneAndUpdate({_id:req.params.id},req.body,(error,data)=>{
      if(error) return res.status(400).send("Something went wrong!!");
      res.status(200).send("Record Updated Successfully!!");
  })
})

router.get('/formative/formative-list/:fid',(req,res,next)=>{
  formativeListModel.find({formativeId:req.params.fid},(error,data)=>{
      if(error) return res.status(500).send("Something went wrong!!");
      res.status(200).send(data);
  })
})
module.exports = router;