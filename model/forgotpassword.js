const mongoose =require('mongoose');

const Schema=mongoose.Schema;

const forgotPassword = new Schema({
    active:{
        type:Boolean,
        required:true
    },
    userId:{
        type:String,
        required:true
    }
})

module.exports= mongoose.model('Forgotpasswoed',forgotPassword )

// const Sequelize=require('sequelize');
// const sequelize=require('../util/database');


// const forgotpassword=sequelize.define('forgotpasswordrequests',{
//     id:{
//         type:Sequelize.UUID,
//         allowNull:false,
//         primaryKey:true        
//     },
//     active:{
//         type:Sequelize.BOOLEAN
//     }
// })

// module.exports=forgotpassword;