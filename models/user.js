const mongoose =  require("mongoose")
const validator = require("validator");
const crypto = require("crypto");
const bcrypt = require('bcrypt');


//use Schema
const useSchema = mongoose.Schema({
    //user email
    email:{
        type:String,
        validator:[validator.isEmail,"Provide a Valid Email"],
        trim : true,
        unique:true,
        require:[true,"Email Address is Required"]
    },
    password:{
        type:String,
        required:[true,"Email address is required"],
        validate:{
            validator:(value)=>
            validator.isStrongPassword(value,{
                minLength:6,
                minLowercase:3,
                minNumbers:1,
                minUppercase:1

            }),
            message:"Password {VALUE} is not strong enough"
        },
    },
    confirmPassword:{
        type:String,
        required: [true,"Please confirm you password "],
        validate: {
            validator:function (value){
                return value === this.password;
        },
        message: "Password Dont match!"
        },
    },
    role:{
        type:String,
        enum:["buyer","store-manager","admin"],
        default:"buyer"
    },
    firstName:{
        type:String,
        required:[true,"Please Provide a first name"],
        trim: true,
        minLength:[3,"Name must be at least 3 Characters"],
        maxLength:[30,"Name is To Large "]
    },
    lastName:{
        type:String,
        required:[true,"Please Provide a last name"],
        trim:true,
        minLength: [3,"Name Must be at least 3 Characters"],
        maxLength: [30,"Last Name To Large"]
    },
    contactNumber:{
        type:String,
        validator:[validator.isMobilePhone,"Please Provided a valid Contact Number"],
    },
    shippingAddress:String,
    imageURL:{
        type:String,
        validate:[validator.isURL,"Please Provide a Valid  url"],
    },
    status:{
        type:String,
        default: "inactive",
        enum: ["active","inactive","blocked"]
    },

      confirmationToken: String,
      confirmationTokenExpires: Date,
      passwordChangedAt: Date,
      passwordResetToken: String,
      passwordResetExpires: Date,

},
{timestamps:true,versionKey:false}

)
useSchema.pre("save", function (next) {
    if(!this.isModified("password")){
        return next();
    }
    const password= this.password;
    const hashedPassword =  bcrypt.hashSync(password);
    this.password = this.password;
    this.confirmPassword = undefined;
    next();
    
});

useSchema.methods.comparePassword = function (password,hashedPassword){
    const isPasswordValid = bcrypt.compareSync(password,hashedPassword);
    return isPasswordValid;
}
useSchema.methods.generateConfirmationToken = function (){
    const token = crypto.randomBytes(32).toString("hex");
    this.confirmationToken = token;
    const date = new Date();
    data.setData(date.getDate() + 1);
    this.confirmationTokenExpires = date;
    return token;
}


module.exports=mongoose.model("User",useSchema)