const nodemailer=require('nodemailer');
const ForgotPassword=require('../model/forgotpassword');
const User=require('../model/user');
const bcrypt=require('bcrypt');
const saltroutes=10;



const forgotPassword=async(req,res)=>{
    try{
        const email=req.body.email;
        console.log("email" , email);
        const user=await User.findOne({email:email});
        console.log("user>>>" , user)
        if(user){

          const forgotpasswordcreate= new ForgotPassword({active:true,userId:user._id});
          await forgotpasswordcreate.save();
        // const forgotpasswordcreate= await ForgotPassword.create({id, active:true,userId:user.id});


            const mailTransport = nodemailer.createTransport({
                service:"hotmail",
                auth:{
                    user:process.env.NODEMAILER_EMAIL,
                    pass:process.env.EMAIL_PASSWORD
                }
            })
            const detail={
                from:"dummy-001-001@outlook.com",
                to:email,
                subject:"This is about resetting your password",
                text:`http://localhost:4000/password/resetpassword/${forgotpasswordcreate.id}`
            }
            
            mailTransport.sendMail(detail ,(err)=>{
                if(err){
                    console.log(err)
                    res.status(404).json({message:"the email is not valid" , error:err});
                }
                else{
                    console.log("email sended");
                    res.status(201).json({message:"email sended successfully"})
                }
            })
        }
        else{
            return res.status(404).json({message:"This user is not registered till now" , error:err})
        }
      
    }
    catch(err){
        console.log(err);
        res.status(500).json({message:"something went wrong",error:err});
    }
}
    const resetpassword=async(req,res)=>{
        try{
            const forgotPasswordId=req.params.id;
            const forgotpassword=await ForgotPassword.findById(forgotPasswordId);
            if(forgotpassword){
                const update=await forgotpassword.updateOne({_id:forgotPasswordId},{active:false});
                res.status(200).send(`<html>
                <script>
                    function formsubmitted(e){
                        e.preventDefault();
                        console.log('called')
                    }
                </script>
                <form action="/password/updatepassword/${forgotPasswordId}" method="get">
                    <label for="newpassword">Enter New password</label>
                    <input name="newpassword" type="password" required></input>
                    <button>reset password</button>
                </form>
            </html>`
            )}
        }
    catch(err){
        console.log(err);
        res.status(500).json({message:'something went wrong', error:err});
    }
}

const updatepassword=async(req,res)=>{
    try{
        const newpassword = req.query.newpassword;
        const forgotpasswordId=req.params.forgotpasswordId;
        const detail=await ForgotPassword.findById(forgotpasswordId);
        const user=await User.findById(detail.userId);

        if(user){
            bcrypt.hash(newpassword , saltroutes , async (err, hash)=>{
                if(err){
                    console.log(err);
                    throw new Error(err);
                }
              await  user.updateOne({_id:user._id},{password:hash});
              res.status(201).json({message:'password updated successfully'})
            })
        }
        else{
            throw new Error ('user not found');
        }

    }
    catch(err){
        console.log(err);
        res.status(501).json({message:'passsword is not changed'})
    }
}

module.exports={
    forgotPassword,
    resetpassword,
    updatepassword
}