const User = require("../models/User");
const Request = require("../models/Request");

exports.getDashboardStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();

    const availableDonors = await User.countDocuments({
      available: true,
    });

    const totalRequests = await Request.countDocuments();

    const completedRequests = await Request.countDocuments({
      status: "Completed",
    });

    const openRequests = await Request.countDocuments({
      status: "Open",
    });

    res.status(200).json({
      success: true,
      stats: {
        totalUsers,
        availableDonors,
        totalRequests,
        completedRequests,
        openRequests,
      },
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find()
      .select("-password")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      users,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};