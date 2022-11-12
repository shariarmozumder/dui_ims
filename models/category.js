const mongoose = require("mongoose");
const validator = require("validator");
const categorySchema = mongoose.Schema({
    name:{
        type:String,
        trim:true,
        lowercase:true,
        required:[true,"Please Provide a category name"]
    },
    description:String,
    imageUrl:{
        type:String,
        validate:[validator.isURL,"Please Provide a valid URL"]
    },
},
{timestamps:true,versionKey:false}
)
const Category = mongoose.model("Category",categorySchema);
module.exports= Category;