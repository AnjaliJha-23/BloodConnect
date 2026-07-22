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
    const users = await User.find().select("-password").sort({ createdAt: -1 });

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
exports.getAllRequests = async (req, res) => {
  try {
    const requests = await Request.find()
      .populate("createdBy", "name email phone")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      requests,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
exports.toggleUserStatus = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    user.available = !user.available;

    await user.save();

    return res.status(200).json({
      success: true,
      message: `User ${
        user.available ? "Activated" : "Deactivated"
      } Successfully`,
      user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
exports.updateRequestStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const request = await Request.findById(id);

    if (!request) {
      return res.status(404).json({
        success: false,
        message: "Request not found",
      });
    }

    request.status = status;

    await request.save();

    return res.status(200).json({
      success: true,
      message: "Request status updated successfully",
      request,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
exports.getAnalytics = async (req, res) => {
  try {
    // Summary Stats
    const totalUsers = await User.countDocuments();

    const availableDonors = await User.countDocuments({
      available: true,
    });

    const openRequests = await Request.countDocuments({
      status: "Open",
    });

    const completedRequests = await Request.countDocuments({
      status: "Completed",
    });

    // Blood Group Distribution
    const bloodGroups = await User.aggregate([
      {
        $match: {
          bloodGroup: { $ne: "" },
        },
      },
      {
        $group: {
          _id: "$bloodGroup",
          count: { $sum: 1 },
        },
      },
      {
        $sort: { count: -1 },
      },
    ]);

    // Request Status Distribution
    const requestStatus = await Request.aggregate([
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 },
        },
      },
    ]);

    // Monthly User Registrations
    const monthlyUsers = await User.aggregate([
      {
        $group: {
          _id: { $month: "$createdAt" },
          count: { $sum: 1 },
        },
      },
      {
        $sort: { _id: 1 },
      },
    ]);

    res.status(200).json({
      success: true,

      summary: {
        totalUsers,
        availableDonors,
        openRequests,
        completedRequests,
      },

      bloodGroups,
      requestStatus,
      monthlyUsers,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (user.role === "admin") {
      return res.status(403).json({
        success: false,
        message: "Admin cannot be deleted",
      });
    }

    await User.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
exports.deleteRequest = async (req, res) => {
  try {
    const { id } = req.params;

    const request = await Request.findById(id);

    if (!request) {
      return res.status(404).json({
        success: false,
        message: "Request not found",
      });
    }

    await Request.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      message: "Request deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
exports.completeRequest = async (req, res) => {
  try {
    const { id } = req.params;

    const request = await Request.findById(id);

    if (!request) {
      return res.status(404).json({
        success: false,
        message: "Request not found",
      });
    }

    request.status = "Completed";

    await request.save();

    return res.status(200).json({
      success: true,
      message: "Request marked as completed",
      request,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};