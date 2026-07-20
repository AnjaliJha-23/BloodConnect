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

        if (bloodGroup) {

            filter.bloodGroup = bloodGroup;

        }

        if (city) {

            filter.city = city;

        }

        let donors = await User.find(filter).select("-password");

        // Area search (optional)
        if (area) {

            donors = donors.filter((d) =>
                d.state.toLowerCase().includes(area.toLowerCase())
            );

        }

        res.json(donors);

    } catch (err) {

        res.status(500).json({
            message: "Server Error"
        });

    }

};