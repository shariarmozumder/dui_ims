const  mongoose=require("mongoose");
const validator = require("validator");
const {ObjectId } = mongoose.Schema.Types;

const brandSchema = mongoose.Schema({
    products: [{
        type:String,
        ref: "Product"
    }],
    name:{
        type:String,
        trim:true,
        require:[true,"Please Provide a brand name"],
        maxLength:100,
        unique:true,
        lowwecase:true
    },
    description:String,
    email:{
        type:String,
        lowercase:true,
        validate:[validator.isURL,"Please Provide a valid url"]
    },
    location:String,
    suppliers:[{
        name:String,
        contactNumber:String,
        id:{
            type:ObjectId,
            ref:"Supplier"
        }
    }],
    status:{
        type:String,
        enum:["active","inactive"],
        default:"active"

    }
},
{timestamps:true,versionKey:false}
)

const Brand = mongoose.model("Brand",brandSchema)
module.exports = Brand;