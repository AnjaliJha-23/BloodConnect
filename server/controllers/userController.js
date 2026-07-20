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
        returnDocument: "after",
        runValidators: true
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
    // Prevent 304 Caching issues
    res.set('Cache-Control', 'no-store, no-cache, must-revalidate, private');
    
    // Extract what the frontend actually sends
    const { bloodGroup, city, area } = req.query;
    
    // Base filter: only fetch active donors
    let query = { available: true };

    // 1. Blood Group Filter
    if (bloodGroup && bloodGroup.trim() !== "") {
      query.bloodGroup = bloodGroup;
    }
    
    // 2. City Dropdown Filter (Maps to BOTH database city and state fields)
    if (city && city.trim() !== "") {
      query.$or = [
        { city: { $regex: `^${city.trim()}$`, $options: 'i' } },
        { state: { $regex: `^${city.trim()}$`, $options: 'i' } }
      ];
    }

    // 3. Area Input Filter (Fall back to check city/state if they type a sub-locality)
    if (area && area.trim() !== "") {
      const areaRegex = { $regex: area.trim(), $options: 'i' };
      
      // If $or already exists from the city dropdown, we must combine them using $and
      if (query.$or) {
        query.$and = [
          { $or: query.$or },
          { 
            $or: [
              { city: areaRegex },
              { state: areaRegex }
            ] 
          }
        ];
        delete query.$or; // Remove the single $or to avoid conflict with $and
      } else {
        // If no city dropdown was selected, just search the text in city/state
        query.$or = [
          { city: areaRegex },
          { state: areaRegex }
        ];
      }
    }

    // Execute the clean query against the database
    const donors = await User.find(query).select("-password");
    res.json(donors);

  } catch (err) {
    console.error("Search Error Details:", err);
    res.status(500).json({
      message: "Server Error",
    });
  }
};