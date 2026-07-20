const User = require("../models/User");

exports.findDonors = async (req, res) => {
  try {
    res.set('Cache-Control', 'no-store, no-cache, must-revalidate, private');
    const { bloodGroup, city, area } = req.query;
    
    let query = { available: true };

    if (bloodGroup && bloodGroup.trim() !== "") {
      query.bloodGroup = bloodGroup;
    }
    
    // Checks BOTH city and state schema fields for the dropdown selection
    if (city && city.trim() !== "") {
      query.$or = [
        { city: { $regex: `^${city.trim()}$`, $options: 'i' } },
        { state: { $regex: `^${city.trim()}$`, $options: 'i' } }
      ];
    }

    // Secondary text search logic
    if (area && area.trim() !== "") {
      const areaRegex = { $regex: area.trim(), $options: 'i' };
      if (query.$or) {
        query.$and = [
          { $or: query.$or },
          { $or: [{ city: areaRegex }, { state: areaRegex }] }
        ];
        delete query.$or;
      } else {
        query.$or = [{ city: areaRegex }, { state: areaRegex }];
      }
    }

    const donors = await User.find(query).select("-password");
    res.json(donors);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};