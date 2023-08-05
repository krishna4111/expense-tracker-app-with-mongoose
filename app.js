const express = require("express");
const mongoose=require('mongoose');
const fs=require('fs');
const cors = require("cors");
const path = require("path");
const dotenv = require("dotenv");
const app = express();
const userRoute = require("./routes/userRoute");
const expenseRoute = require("./routes/expenseRoute");
const purchaseRoute = require("./routes/purchase");
const premiumRouter=require('./routes/premium');
const ForgotPasswordRouter=require('./routes/forgotpassword');
const User = require("./model/user");
const Expense = require("./model/expense");
const Order = require("./model/order");
const ForgotPassword=require('./model/forgotpassword');
const FilesDownloaded=require('./model/filesdoenloaded');
const helmet=require('helmet');
const compression=require('compression');
// const morgan=require('morgan');
require('dotenv').config();




// const accessLogStream=fs.createWriteStream(path.join(__dirname , 'access.log') ,{flag : 'a'});

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
const bodyPaer = require("body-parser");

app.use(bodyPaer.json());

app.use(cors());
dotenv.config();
//app.use(helmet());
// app.use(compression());
// app.use(morgan('combined' , {stream:accessLogStream}));

app.use("/user", userRoute);
app.use("/expense", expenseRoute);
app.use("/premium", purchaseRoute);
app.use('/premium',premiumRouter)
app.use('/password',ForgotPasswordRouter)

// app.use(express.static(path.join(__dirname, "public")));

// User.hasMany(Expense);
// Expense.belongsTo(User);

// User.hasMany(Order);
// Order.belongsTo(User);

// User.hasMany(ForgotPassword);
// ForgotPassword.belongsTo(User);

// User.hasMany(FilesDownloaded);
// FilesDownloaded.belongsTo(User);

// app.use((req,res)=>{
  
//   console.log("urll>>>.",req.url);
//   res.sendFile(path.join(__dirname , `public/${req.url}`))

// })


mongoose
.connect('mongodb+srv://krishna:7868889584@cluster0.6srxbte.mongodb.net/Expenses?retryWrites=true&w=majority')
.then(result => {
  console.log('connected')
  app.listen(4000);
})
.catch(err =>{
  console.log(err);
})

  