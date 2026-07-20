const Request = require("../models/Request");

exports.createRequest = async (req,res)=>{

    try{

        const request = await Request.create({

            ...req.body,

            createdBy:req.user.id

        });

        res.status(201).json(request);

    }

    catch(err){

        res.status(500).json({

            message:"Server Error"

        });

    }

};

exports.getRequests = async(req,res)=>{

    try{

        const requests = await Request.find({

    status: "Open"

})
        .populate("createdBy","name email")
        .sort({createdAt:-1});

        res.json(requests);

    }

    catch(err){

        res.status(500).json({

            message:"Server Error"

        });

    }

};

exports.getMyRequests = async (req, res) => {

    try {

        const requests = await Request.find({

            createdBy: req.user.id

        }).sort({

            createdAt: -1

        });

        res.json(requests);

    }

    catch (err) {

        res.status(500).json({

            message: "Server Error"

        });

    }

};
exports.deleteRequest = async (req, res) => {

    try {

        const request = await Request.findById(req.params.id);

        if (!request) {

            return res.status(404).json({

                message: "Request not found"

            });

        }

        if (request.createdBy.toString() !== req.user.id) {

            return res.status(401).json({

                message: "Unauthorized"

            });

        }

        await Request.findByIdAndDelete(req.params.id);

        res.json({

            message: "Request Deleted"

        });

    }

    catch (err) {

        res.status(500).json({

            message: "Server Error"

        });

    }

};
exports.completeRequest = async (req, res) => {

    try {

        const request = await Request.findById(req.params.id);

        if (!request) {

            return res.status(404).json({

                message: "Request not found"

            });

        }

        if (request.createdBy.toString() !== req.user.id) {

            return res.status(401).json({

                message: "Unauthorized"

            });

        }

        request.status = "Completed";

        await request.save();

        res.json(request);

    }

    catch (err) {

        res.status(500).json({

            message: "Server Error"

        });

    }

};

exports.respondToRequest = async(req,res)=>{

    try{

        const request = await Request.findById(req.params.id);

        if(!request){

            return res.status(404).json({
                message:"Request not found"
            });

        }

        if(request.responses.includes(req.user.id)){

            return res.status(400).json({
                message:"Already Responded"
            });

        }

        request.responses.push(req.user.id);

        await request.save();

        res.json({
            message:"Response Sent Successfully"
        });

    }

    catch(err){

        res.status(500).json({
            message:"Server Error"
        });

    }

}