const express = require('express');

const router = express.Router();
const clientModel = require('../../models/clients/clients.model');

const multer = require('multer');
const storage = multer.diskStorage({
    filename:(req,file,cb)=>{
    const fileName = file.originalname.toLowerCase().split(' ').join('-');
    cb(null,Date.now()+fileName)
    },
    destination:(req,file,cb)=>{
        cb(null,'public/client-images')
    }
})

const upload = multer({
    storage:storage
})

router.get('/client',(req,res,next)=>{
  clientModel.find({},(error,data)=>{
   if(error) return res.status(500).send('Something went wrong!!');
   res.status(200).send(data);
  }) 
})

router.get('/client/:id',(req,res,next)=>{
    clientModel.find({_id:req.params.id},(error,data)=>{
        if(error) return res.status(500).send('Something went wrong!!');
        res.status(200).send(data);
       }) 
})

router.put('/client/:id',upload.single('clientLogo'),(req,res,next)=>{
    const regex = new RegExp(/^(ftp|http|https):\/\/[^ "]+$/);
   if(!regex.test(req.body.clientLogo)){
    const url = req.protocol +'://' +req.get('host');
    let clientData = {};
    let fileName = "";
    if(req.file){
        
    fileName = req.file.filename.toLowerCase().split(' ').join('-');
        clientData={
            clientName:req.body.clientName,
            clientLogo: url+'/client-images/'+ fileName
        }
    }else{
        clientData=req.body;
    }
       clientModel.findByIdAndUpdate({_id:req.params.id},clientData,(error,data)=>{
        if(error) return res.status(400).send("Can't Save Inavlid Data");
        res.status(201).send("Record Updated Successfully!!")
    })
   }else next()},(req,res)=>{
     clientModel.findOneAndUpdate({_id:req.params.id},req.body,(error,data)=>{
         if(error) return res.status(400).send('Can"t Update Invalid Data!!');
         res.status(200).send('Redord Updated Successfully')
     })
   }
)

router.post('/client',upload.single('clientLogo'),(req,res,next)=>{
 const url = req.protocol +'://' +req.get('host');
 let clientData={};
  if(req.file){
    const fileName = req.file.filename.toLowerCase().split(' ').join('-');
 clientData = {
        clientName : req.body.clientName,
        clientLogo: url+'/client-images/'+ fileName
    }
  }else{
      clientData=req.body;
  }
    clientModel.create(clientData,(error,data)=>{
     if(error) return res.status(400).send("Inavlid Data");
     res.status(201).send("Record Added Successfully!!")
 })
}) 

router.delete('/client/:id',(req,res)=>{
 clientModel.findOneAndDelete({_id:req.params.id},(error,data)=>{
     if(error) return res.status(400).send("Can't Delete Something went wrong!!");
     res.status(200).send("Record Delted Succesfully!!")
 })
})

module.exports = router;