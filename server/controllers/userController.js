const User = require("../models/User");

exports.getProfile = async(req,res)=>{

    try{

        const user = await User.findById(req.user.id).select("-password");

        res.json(user);

    }

    catch(err){

        res.status(500).json({
            message:"Server Error"
        });

    }

}

exports.updateProfile = async(req,res)=>{

    try{

        const updatedUser = await User.findByIdAndUpdate(

            req.user.id,

            req.body,

            {
                new:true
            }

        ).select("-password");

        res.json(updatedUser);

    }

    catch(err){

        res.status(500).json({
            message:"Server Error"
        });

    }

}
exports.findDonors = async (req, res) => {
  try {
    const { bloodGroup, city } = req.query;

    const donors = await User.find({
      bloodGroup,
      city,
      available: true,
    }).select("-password");

    res.json(donors);

  } catch (err) {
    res.status(500).json({
      message: "Server Error",
    });
  }
};