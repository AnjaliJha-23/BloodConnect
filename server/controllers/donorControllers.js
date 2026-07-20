const User = require("../models/User");

exports.searchDonors = async (req, res) => {
  try {
    // Set headers to prevent cached responses
    res.set('Cache-Control', 'no-store, no-cache, must-revalidate, private');

    const { bloodGroup, state, city, area } = req.query;

    // Base filter to ensure donors are active and have valid core data
    let filter = {
      available: true,
      bloodGroup: { $ne: "" },
      phone: { $ne: "" },
      city: { $ne: "" }
    };

    // 1. Filter by Blood Group
    if (bloodGroup && bloodGroup.trim() !== "") {
      filter.bloodGroup = bloodGroup;
    }

    // 2. Filter by State (exact match, case-insensitive)
    if (state && state.trim() !== "") {
      filter.state = { $regex: `^${state.trim()}$`, $options: "i" };
    }

    // 3. Filter by City (exact match, case-insensitive)
    if (city && city.trim() !== "") {
      filter.city = { $regex: `^${city.trim()}$`, $options: "i" };
    }

    // 4. Filter by Area / Locality (sub-string wildcard search)
    if (area && area.trim() !== "") {
      filter.area = { $regex: area.trim(), $options: "i" };
    }

    // Fetch matching donors, hiding passwords for safety
    const donors = await User.find(filter).select("-password");
    
    res.json(donors);

  } catch (err) {
    console.error("Search Donors Error: ", err);
    res.status(500).json({
      message: "Server Error"
    });
  }
};