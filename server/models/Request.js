const mongoose = require("mongoose");

const requestSchema = new mongoose.Schema({

    patientName:{
        type:String,
        required:true
    },

    bloodGroup:{
        type:String,
        required:true
    },

    hospital:{
        type:String,
        required:true
    },

    city:{
        type:String,
        required:true
    },

    units:{
        type:Number,
        required:true
    },

    contact:{
        type:String,
        required:true
    },

    urgency:{
        type:String,
        default:"Normal"
    },

    message:{
        type:String,
        default:""
    },

    status:{
    type:String,
    enum:["Open","Completed"],
    default:"Open"
},

    responses:[
    {
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }
],
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }

},{
    timestamps:true
});

module.exports = mongoose.model("Request",requestSchema);