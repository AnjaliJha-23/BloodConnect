const User = require("../models/User");

const searchDonors = async (req, res) => {
  try {
    res.set('Cache-Control', 'no-store, no-cache, must-revalidate, private');
    const { bloodGroup, state, city, area } = req.query;

    let filter = {
      available: true,
      bloodGroup: { $ne: "" },
      phone: { $ne: "" },
      city: { $ne: "" }
    };

    if (bloodGroup && bloodGroup.trim() !== "") {
      filter.bloodGroup = bloodGroup;
    }

    if (state && state.trim() !== "") {
      filter.state = { $regex: `^${state.trim()}$`, $options: "i" };
    }

    if (city && city.trim() !== "") {
      filter.city = { $regex: `^${city.trim()}$`, $options: "i" };
    }

    if (area && area.trim() !== "") {
      filter.area = { $regex: area.trim(), $options: "i" };
    }

    const donors = await User.find(filter).select("-password");
    res.json(donors);

  } catch (err) {
    console.error("Search Donors Error: ", err);
    res.status(500).json({ message: "Server Error" });
  }
};

// Explicitly export it here
module.exports = { searchDonors };