const express = require('express');
const webPush = require('web-push');

const router = express.Router();
const notificationModel = require('../../models/notification/notification.model');
router.get('/web-push',(req,res)=>{
    const key = webPush.generateVAPIDKeys();
    res.send(key)
})
const multer = require('multer');
const storage = multer.diskStorage({
    filename:(req,file,cb)=>{
    const fileName = file.originalname.toLowerCase().split(' ').join('-');
    cb(null,Date.now()+fileName)
    },
    destination:(req,file,cb)=>{
        cb(null,'public/notification-images')
    }
})

const upload = multer({
    storage:storage
})

router.get('/notification',(req,res,next)=>{
  notificationModel.find({},(error,data)=>{
   if(error) return res.status(500).send('Something went wrong!!');
   res.status(200).send(data);
  }) 
})

router.get('/notification/:id',(req,res,next)=>{
    notificationModel.find({_id:req.params.id},(error,data)=>{
        if(error) return res.status(500).send('Something went wrong!!');
        res.status(200).send(data);
       }) 
})

router.put('/notification/:id',upload.single('image'),(req,res,next)=>{
    const regex = new RegExp(/^(ftp|http|https):\/\/[^ "]+$/);
   if(!regex.test(req.body.notificationImage)){
    const url = req.protocol +'://' +req.get('host');
    const fileName = req.file.filename.toLowerCase().split(' ').join('-');
    const notificationData = {
        title:req.body.title,
        url : req.body.url,
        description : req.body.description,
        image: url+'/notification-images/'+ fileName
    }
       notificationModel.findOneAndUpdate({_id:req.params.id},notificationData,(error,data)=>{
        if(error) return res.status(400).send("Can't Save Inavlid Data");
        res.status(201).send("Record Added Successfully!!")
    })
   }else next()},(req,res)=>{
     notificationModel.findOneAndUpdate({_id:req.params.id},req.body,(error,data)=>{
         if(error) return res.status(400).send('Can"t Update Invalid Data!!');
         res.status(200).send('Redord Updated Successfully')
     })
   }
)

router.post('/notification',upload.single('image'),(req,res,next)=>{
 const url = req.protocol +'://' +req.get('host');
 const fileName = req.file.filename.toLowerCase().split(' ').join('-');
 const notificationData = {
     title:req.body.title,
     url : req.body.url,
     description : req.body.description,
     image: url+'/notification-images/'+ fileName
 }
    notificationModel.create(notificationData,(error,data)=>{
     if(error) return res.status(400).send("Inavlid Data");
     res.status(201).send("Record Added Successfully!!")
 })
}) 

router.delete('/notification/:id',(req,res)=>{
 notificationModel.findOneAndDelete({_id:req.params.id},(error,data)=>{
     if(error) return res.status(400).send("Can't Delete Something went wrong!!");
     res.status(200).send("Record Delted Succesfully!!")
 })
})

module.exports = router;