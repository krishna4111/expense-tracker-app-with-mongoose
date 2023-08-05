const mongoose=require('mongoose');

const Schema=mongoose.Schema;

const expenseSchema = new Schema({
    amount:{
        type:Number,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    }

})

module.exports=mongoose.model('Expense',expenseSchema);


// const Sequelize=require('sequelize');
// const sequelize=require('../util/database');


// const expense=sequelize.define('expense',{
//     id:{
//         type:Sequelize.INTEGER,
//         allowNull:false,
//         unique:true,
//         autoIncrement:true,
//         primaryKey:true
//     },
//     amount:{
//         type:Sequelize.DOUBLE,
//         allowNull:false
//     },
//     description:{
//         type:Sequelize.STRING,
//         allowNull:false
//     },
//     category:{
//         type:Sequelize.STRING,
//         alloeNull:false
//     }
// })

// module.exports=expense;