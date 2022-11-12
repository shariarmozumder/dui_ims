const mongoose = require("mongoose")
const {ObjectId} = mongoose.Schema.Types;
const valid = require("validator");

//Schema Designe

const productSchema= mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please provide a name for this product."],
        trim: true,
        unique:[true,"Name Must Be Unique"],
        lowercase: true,
        minLength:[3,"Name must be at least 3 charcters"],
        maxLength:[100, "Name is too large"],

    },
    description:{
        type:String,
        required:true
    },
    unit:{
        type: String,
        required:true,
        enum:{
            values:["kg","liter","pcs","bag"],
            message:"unit value can't {VALUE}, must be kg/liter/pcs/bag"
        }
    },
    imageURLS:[{
        type:String,
        require:true,
        validate:[valid.isURL,"Wronge url"]
    }],
    category:{
        type:String,
        required :true
    },

},{timestamps:true,versionKey:false}

)

productSchema.pre("save",function(next){
    //This 
    console.log("Before Save Data");
    if (this.quantity ==0) {
        this.status ="out-of-stock"
        
    }
    next()
})





const Product = mongoose.model("Product",productSchema)
module.exports = Product;