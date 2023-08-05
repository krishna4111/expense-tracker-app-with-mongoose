const Razorpay = require("razorpay");

const Order = require("../model/order");

const userController=require('./usercontroller')

exports.purchasePremium = async (req, res) => {
  try {
    //in here i just create an object for new razorpay
    var rzp = new Razorpay({
      //the secret things which we dont want to push into git is inside the .env files
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRECT,
    });
    //the above code creates a new instance of the Razorpay object and assigns it to the variable rzp., this line initializes the Razorpay
    // object, which allows you to interact with the Razorpay API and perform various operations such as creating payments,
    // fetching transactions, or performing refunds.
    //here the amount is in paisa
    const amount = 2500;
    //create the order here
    //the reason for using "rzp" in below code is the razorpay already knows the company ny this object
    rzp.orders.create({ amount, currency: "INR" }, async (err, order) => {
      //console.log("order>>", order);
      //if the order creation is successfull then we get the order id otherwise throw error
      if (err) {
        console.log("this err", err);
        throw new Error(JSON.stringify(err));
      }
      //onece the order gets created we obviously save it in the dB,bcz the payment has not been done
      // await req.user.createOrder({ orderid: order.id, status: "pending" });

      // return res.status(201).json({ order, key_id: rzp.key_id });

      const newOrder = new Order({ orderid: order.id, status: 'pending', user: req.user.id });
      await newOrder.save();
      
       return res.status(201).json({ order, key_id: rzp.key_id });
    });
  } catch (err) {
    console.log(err);
    res.status(403).json({ message: "something went wrong", error: err });
  }
};


exports.updateTransaction = async (req, res) => {
  try {
    console.log("update transaction")
    console.log("req.bod>>>>y", req.body);
    const { payment_id, order_id ,status} = req.body;
    //const orderUpdate = await Order.findOne({ where: { orderid: order_id } });
    if (status !== 'SUCCESSFUL') {
    const detail = await Order.updateMany({ orderid: order_id } , {paymentid: "null" , status:"failed"})
  //  const detail= await Order.update(
  //     { where: { orderid: order_id } },
      
  //     )
      
      return res.status(500).json({ message: "cause some error in update transactions" });
   }
   else{
    const promise1 = Order.updateMany({ orderid: order_id},
      { status: "successful" ,paymentid: payment_id} );
    const promise2 = req.user.updateOne({ ispremiumuser: true });
    Promise.all([promise1, promise2])
      .then(() => {
        return res.status(202).json({ success: true, message: "Transaction successful", token: userController.generateAccessToken(req.user.id,req.user.name,req.user.ispremiumuser) });
      })
      .catch((err) => {
        console.log(err);
        throw new Error(err);
      });

   }
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ message: "cause some error in update transactions" });
  }
};

