const User=require('../model/user');

const getLeaderBoard=async(req,res)=>{
    try{ 
        
        //  const leaderboardofusers = await User.find({}, 'name totalexpense').sort({ totalexpense: -1 });


         const leaderboardofusers = await User.find().select('name totalexpense').sort({ totalexpense: -1 });

        res.status(200).json(leaderboardofusers);
    }
    catch(err){
        console.log(err);
        res.status(500).json(err);
    }
}

module.exports={
    getLeaderBoard
}