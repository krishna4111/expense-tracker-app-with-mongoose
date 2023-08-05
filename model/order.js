const mongoose=require('mongoose');

const Schema=mongoose.Schema;

const orderSchema = new Schema({
    paymentid:{
        type:String,
        default:null
    },
    orderid:{
        type:String,
        required:true
    },
    status:{
        type:String,
        required:true
    }


})

module.exports=mongoose.model('Order', orderSchema)

// const Sequelize=require('sequelize');
// const sequelize=require('../util/database');


// const order=sequelize.define('order',{
//     id:{
//         type:Sequelize.INTEGER,
//         allowNull:false,
//         unique:true,
//         primaryKey:true,
//         autoIncrement:true
//     },
//     //paymentid get from successfull payment or failure payment
//     paymentid:Sequelize.STRING,
//     //we get orderid from razorpay
//     orderid:Sequelize.STRING,
//     //status is bending
//     status:Sequelize.STRING
// })

// module.exports=order;