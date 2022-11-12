const mongoose = require("mongoose");
const validator = require("validator");

const supplierSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please Provide a name"],
      trim: true,
      lowercase: true,
      minLength: [3, "Name must be at least 3 characters"],
      maxLength: [100, "Name is too large"],
    },
    email: {
      type: String,
      validate: [validator.isEmail, "Provide a valid Email"],
      trim: true,
      lowercase: true,
      unique: true,
    },
    brand: {
      name: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
      },
      id: {
        type: String,
        required: true,
        ref: "Brand",
      },
    },
    contactNumber: [
      {
        type: String,
        required: [true, "Please Provid a contact number"],
        validate: {
          validator: (value) => {
            return validator.isMobilePhone(value);
          },
          message: "Please Provide a valid phone number",
        },
      },
    ],
    emergencyContactNumber: {
      type: String,
      required: [true, "Please provide a emergency contact number"],
      validate: {
        validator: (value) => {
          return validator.isMobilePhone(value);
        },
        message: "Please Provide a valid phone number",
      },
    },
    tradeLicenceNumber: {
      type: Number,
      require: [true, "Please Provid you trade licence number"],
    },
    presentAddress: {
      type: String,
      required: [true, "Please Provid you present address"],
    },
    parmanentAddress: {
      type: String,
      require: [true, "Please Provide you parmanent Address"],
    },
    location: {
      type: String,
      require: true,
      lowercase: true,
      enum: {
        values: [
          "dhaka",
          "rajshahi",
          "chattogram",
          "sylhet",
          "khulna",
          "barishal",
          "rangpur",
          "mymensingh",
        ],
        message: "{VALUE} is not a correct division!",
      },
    },
    imageURL: {
      type: String,
      validate: [validator.isURL, "Please Provide a valid url"],
    },
    nationalIdImageURL: {
      type: String,
      require: true,
      validate: [validator.isURL, "Please Provid a valid url"],
    },
    status: {
      type: String,
      default: "active",
      enum: ["active", "inactive"],
    },
  },

  { timestamps: true, versionKey: false }
);

const Supplier = mongoose.model("Sapplier", supplierSchema);
module.exports = Supplier;
