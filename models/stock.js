const mongoose= require("mongoose")

const {ObjectId} = mongoose.Schema.Types;
const validator= require("validator")

//Stock Schema
const stockSchema = mongoose.Schema({
    projectId:{
        type:ObjectId,
        require:true,
        ref:"Product"
    },
    name:{
        type:String,
        require:[true,"Please proide a name for this product"],
        trim:true,
        lowecase:true,
        minLength:[3,"Name must be at least 3 characters"],
        maxLength:[100,"Name is too large"]
    },
    description:{
        type:String,
        require:true
    },
    unit:{
        type:String,
        required:true,
        enum:{
            values:["kg","liter","pcs","bag"],
            message: "unit value can't be {VALUE},must be kg/liter/pcs/bag"
        }
    },
    imageUrl:[{
        type:String,
        required:true,
        validate:[validator.isUrl,"Please provide valid url(s"]

    }],
    price:{
        type:Number,
        require:true,
        min:[0,"Product price can't be negative"]
    },
    quantity:{
        type:Number,
        required:true,
        min:[0,"Product quantity can't be negative"]
    },
    category:{
        type:String,
        require:true
    },
    brand:{
        name:{
            type:String,
            required:true
        },
        id:{
            type:ObjectId,
            ref: "Brand",
            require:true,
        }
    },
    status:{
        type:String,
        require:true,
        enum:{
            values:["in-stock","out-of-stock","discontinued"],
            message:"status can't be {VALUE}"
        }
    },
    store:{
        name:{
            type:String,
            trim:true,
            require:[true,"Please provide a store name"],
            lowecase:true,
            enum:{
                values:["dhaka","chattogram","rajshahi","sylhet","khulna","barisal","rangpur","mymensingh"],
                message: "{VALUE} is not a valid name"
            }
        }
    },
    id:{
        type:ObjectId,
        require:true,
        ref:"Store"
    },
    sellCount:{
        type: Number,
        default:0,
        min : 0
    }




},
{timestamps:true,versionKey:false})

const Stock = mongoose.model("Stock",stockSchema)
module.exports = Stock;