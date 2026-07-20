const User = require("../models/User");

exports.searchDonors = async (req, res) => {

    try {

        const { bloodGroup, city, area } = req.query;

        let filter = {
            available: true,
            bloodGroup: { $ne: "" },
            phone: { $ne: "" },
            city: { $ne: "" },
            gender: { $ne: "" }
        };

        // Search by blood group
        if (bloodGroup) {
            filter.bloodGroup = bloodGroup;
        }

        // Search by city
        if (city) {
            filter.city = city;
        }

        // Search by area (case-insensitive)
        if (area) {
            filter.area = {
                $regex: area,
                $options: "i"
            };
        }

        const donors = await User.find(filter).select("-password");

        res.json(donors);

    } catch (err) {

        console.error(err);

        res.status(500).json({
            message: "Server Error"
        });

    }

};