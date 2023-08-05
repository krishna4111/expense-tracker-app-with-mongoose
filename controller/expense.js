const Expense = require("../model/expense");
const User=require('../model/user');


function isStringValid(string) {
  if (string == undefined || string.length == 0) {
    return true;
  } else {
    return false;
  }
}

exports.addExpense = async (req, res) => {
  try {
    
    const { amount, description, category } = req.body;
   // console.log(amount, description, category);

    if (isStringValid(description) || isStringValid(category)) {
      return res.status(400).json({ success: false, message: "bad parameter" });
    }
    const expense =new Expense({
      amount,
      description,
      category,
      userId: req.user.id,
    })
   await expense.save();
    const oldamount=req.user.totalexpense;
    const newamount=Number(oldamount)  + Number(amount) ;
   await User.updateOne({_id:req.user._id } ,{totalexpense:newamount});
    
    res.status(201).json({ success: true, message: "expense added successfully", expense });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err });
  }
};

exports.fetchAll = async (req, res) => {
  try {
    console.log("i am here");
    const ans = await Expense.find({ userId: req.user._id  })
    console.log("i am here>>>" , ans);
        return res.status(201).json({ success: true, ans });
  }
   catch (err) {
    return res.status(500).json({ success: false, error: err });
  }
};

exports.deleteExpense = async (req, res) => {
  try {
    console.log('i am inside of delete')
    console.log("userId>>>",req.user._id)
    
    const expenseId = req.params.id;
console.log(expenseId);
    const expense=await Expense.findById(expenseId);
    console.log("expense" ,expense);
    const reduce=Number(req.user.totalexpense) - Number(expense.amount);
  

    const remove=await Expense.findByIdAndRemove(expenseId);
    console.log("remove>>>" ,remove);

    await User.updateOne({ _id:req.user._id } , {totalexpense:reduce} )
   
    
      //in here the result either gives true or false(0 or 1)
      
        if (remove == 0) {
          return res.status(404).json({ success: false , message: "expense dosent belong to the user"  })
        }
        return res.status(200).json({ message: "expense deleted succcessfully" });
     
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, error: err });
  }
};

async function countExpenses(req){
  try{
    let totalExpenses=0;
   const allexpenses=await Expense.findAll({where:{userId:req.user.id}});
    allexpenses.forEach(element=>{
      totalExpenses++;
    })
    return totalExpenses;
  }
  catch(err){
   return err;
  }
}

exports.paginateData = async(req,res)=>{
  try{
    //+req.query.page: The unary plus operator (+) is used to convert the value of req.query.
    //page to a number. It coerces the string value to a numeric value.
    //|| 1: This is a logical OR operator (||) used for defaulting the value. It means if req.query.page is 
    //a falsy value (such as null, undefined, 0, or an empty string), then page will be assigned the value 1 as the default.
    page= +req.query.page || 1;
    const pageSize=+req.query.pageSize || 5;    
    totalExpenses=await countExpenses(req);
    // const getData=await Expense.findAll({
    //   where:{userId:req.user.id},
    //   offset:(page-1)*pageSize,
    //   limit:pageSize,
    //   order:[['id' , 'DESC']]
    // });
    const getData = await Expense.find({ userId: req.user._id })
  .skip((page - 1) * pageSize)
  .limit(pageSize)
  .sort({ _id: -1 });

    res.status(200).json({
      allExpenses: getData,
      currentPage: page,
      hasNextPage: (page*pageSize) <totalExpenses,
      nextPage:page+1,
      hasPreviousPage:page>1,
      previousPage:page-1,
      lastPage:Math.ceil(totalExpenses/pageSize)
    })

  }
  catch(err){
    console.log(err);
    res.status(400).json({success:'false' , Error:err});
  }
}
