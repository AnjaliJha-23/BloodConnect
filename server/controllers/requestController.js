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

        const requests = await Request.find()
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