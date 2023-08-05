const mongoose=require('mongoose');

const Schema=mongoose.Schema;

const userSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    ispremiumuser:{
        type:Boolean,
        default:false
    },
    totalexpense:{
        type:Number,
        default:0
    }
})


module.exports=mongoose.model('User' ,userSchema);





// const Sequelize=require('sequelize');
// const sequelize=require('../util/database');


// const user=sequelize.define('user',{
//     id:{
//         type:Sequelize.INTEGER,
//         allowNull:false,
//         unique:true,
//         autoIncrement:true,
//         primaryKey:true
//     },
//     name:{
//         type:Sequelize.STRING,
//         allowNull:false
//     },
//     email:{
//         type:Sequelize.STRING,
//         unique:true,
//         allowNull:false
//     },
//     password:{
//         type:Sequelize.STRING,
//         allowNull:false
//     },
//     ispremiumuser:Sequelize.BOOLEAN,
//     totalexpense:{
//       type:Sequelize.INTEGER,
//       defaultValue:0
//     }

// })

// module.exports=user;