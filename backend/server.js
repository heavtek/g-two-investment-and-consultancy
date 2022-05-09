const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dontenv = require('dotenv');
 dontenv.config();
const aboutusRouter = require('./routes/aboutus/aboutus.route');
const analyticsRouter=require('./routes/ganalytics/g-analytics.route')
const clientRouter  = require('./routes/client/client.route');
const contactusRouter = require('./routes/contactus/contactus.route');
const faqRouter = require('./routes/faq/faq.route');
const feedbackRouter = require('./routes/feedback/feedback.route');
const notificationRouter = require('./routes/notification/notification.route');
const ratingRouter = require('./routes/ratings/ratings.route');
const subscriptionsRouter = require('./routes/subscriptions/subscription.route');
const teamRouter = require('./routes/team/team.route');
const testimonalRouter = require('./routes/testimonals/testimonals.route');
const userRouter = require('./routes/user/user.route');
const formativeRouter = require('./routes/service/formative/formative.route')
const businessRouter = require('./routes/service/business/business.route')
const investmentRouter = require('./routes/service/invenstment/investment.route')
const trainingRouter = require('./routes/service/training/training.route')
const traininglistRouter = require('./routes/service/training/training-list/training-list.route')
const businesslistRouter = require('./routes/service/business/business-list/business-list.route')
const invenstmentlistRouter = require('./routes/service/invenstment/investment-list/investment-list.route')
const formativelistRouter = require('./routes/service/formative/formative-list/formative-list.route')
const valuseListRouter = require('./routes/aboutus/values/values.route')
const loginRouter = require('./routes/login/login.route');
const makeListRouter = require('./routes/aboutus/values/make.route');
 const app = express();
 
 mongoose.connect(process.env.DB_URL).then(()=>{
    console.log("Db Connected")
 }).catch((error)=>{
     console.log(error)
 })
 
const domainsFromEnv = process.env.CORS_DOMAINS || "";
const whitelist = domainsFromEnv.split(",").map(item => item.trim())

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error("Not allowed by CORS"))
    }
  },
  credentials: true,
}
app.use(cors(corsOptions))
 app.use(express.json());


 app.use(express.static('public'));
 //routes

 app.use('',aboutusRouter)
 app.use('',clientRouter)
 app.use('',contactusRouter)
 app.use('',faqRouter)
 app.use('',feedbackRouter)
 app.use('',notificationRouter)
 app.use('',ratingRouter)
 app.use('',subscriptionsRouter)
 app.use('',teamRouter)
 app.use('',testimonalRouter)
 app.use('',userRouter)
 app.use('',investmentRouter)
 app.use('',formativeRouter)
 app.use('',trainingRouter)
 app.use('',businessRouter)
 app.use('',analyticsRouter)
 app.use('',loginRouter)
 app.use('',traininglistRouter)
 app.use('',businesslistRouter)
 app.use('',formativelistRouter)
 app.use('',invenstmentlistRouter)
 app.use('',valuseListRouter)
 app.use('',makeListRouter)

 app.listen(process.env.PORT||5000,()=>{
     console.log(`Server running at http://localhost:${process.env.PORT}`);
 })