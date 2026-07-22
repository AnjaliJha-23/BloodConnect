const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({

    name:{
        type:String,
        required:true
    },

    email:{
        type:String,
        required:true,
        unique:true
    },

    password:{
        type:String,
        required:true
    },

    phone:{
        type:String,
        default:""
    },

    bloodGroup:{
        type:String,
        default:""
    },

    age:{
        type:Number
    },

    gender:{
        type:String,
        default:""
    },

    city:{
        type:String,
        default:""
    },

    state:{
    type:String,
    default:""
},

area:{
    type:String,
    default:""
},

available:{
    type:Boolean,
    default:true
},
role:{
    type: String,
    enum: ["user", "admin"],
    default: "user",
}

},{
    timestamps:true
});

module.exports = mongoose.model("User",userSchema);