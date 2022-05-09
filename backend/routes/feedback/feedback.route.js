const express = require('express');
const nodemailer = require('nodemailer');
const router = express.Router();
const feedbackModel = require('../../models/feedback/feedback.model');
const no = require('../../models/feedback/feedback.model');
const webPush = require('web-push');
const notificationModel = require('../../models/notification/notification.model')
const dotenv = require('dotenv');
   dotenv.config();
router.get('/feedback',(req,res,next)=>{
  feedbackModel.find({},(error,data)=>{
      if(error) return res.status(500).send("Something went wrong!!");
      res.status(200).send(data);
  })
})

router.get('/feedback/:id',(req,res,next)=>{
    feedbackModel.find({_id:req.params.id},(error,data)=>{
        if(error) return res.status(500).send("Something went wrong!!");
        res.status(200).send(data);
    })
})

router.put('/feedback/:id',(req,res,next)=>{
    feedbackModel.findOneAndUpdate({_id:req.params.id},req.body,(error,data)=>{
        if(error) return res.status(404).send("Something went wrong!!");
        res.status(200).send("Record Updated Successfully!!");
    })
})


webPush.setVapidDetails('mailto:gebrunayom@gmail.com', process.env.PUBLIC_VAPID_KEY, process.env.PRIVATE_VAPID_KEY);

router.post('/feedback/subscribe', (req, res) => {
  notificationModel.find({},(error,datas)=>{
    const subscription = req.body;
    res.status(201).json({'success': true})
    const payload = JSON.stringify({
      title: datas[0].title,
      body: datas[0].description,
      image:datas[0].image,
      data:{
        url:datas[0].url
      }
    })
    webPush.sendNotification(subscription, payload)
      .then(result => {
    
      })
      .catch(e => {
     
      })
  })
});

router.post('/send-email', async(req, res)=>{
    const feedbackEmails = await feedbackModel.find({});
    const emailList = [];
    for(let i = 0 ;i<feedbackEmails.length;i++){
      emailList.push(feedbackEmails[i].email);
    }
  var receiver = emailList;
  var subject = req.body.subject;
  var message = req.body.message;
  var urlLink = req.body.emailLink
  var transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure:false,
      requireTLS:true,
      auth: {
        user: process.env.EMAIL_SENDER, // enter your email address
        pass: process.env.APPa_Key  // enter your visible/encripted password
      }
    });
    
    var mailOptions = {
      from:process.env.EMAIL_SENDER,
      to: receiver,
      subject: subject,
      html:`
               <div>
                 <h1 style='color:red;font-size:12rem'>${subject}</h1>
                 <div style='border:2px solid red'>${message}</div>
                 <b>${urlLink}</b>
               </div>
              `
    };
    
    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
         res.status(400).send(error.message)
      } else {
       res.send('Email was sent successfully: ' + info.response);
      }
    });
})

router.post('/feedback',(req,res,next)=>{
    feedbackModel.create(req.body,(error,data)=>{
        if(error) return res.status(404).send("Something went wrong!!");
        res.status(200).send("Record Created Successfully!!");
    })
})

router.delete('/feedback/:id',(req,res)=>{
    feedbackModel.findOneAndDelete({_id:req.params.id},req.body,(error,data)=>{
        if(error) return res.status(500).send("Something went wrong!!");
        res.status(200).send("Record Deleted Successfully!!");
    })
})

module.exports = router;