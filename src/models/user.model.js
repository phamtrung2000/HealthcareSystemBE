import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import moment from "moment";
import {RoleEnum} from "../utils/enums.js";
import { toArray } from "../utils/utils.js";

const userSchema = new mongoose.Schema(
  {
    role:{
      type:Number,
      enum:[toArray(RoleEnum)],
      required:true,
      default:"2",
    },
    fullname: {
      type: String,
      trim: true,
      required: true,
    },
    password: {
      type: String,
      trim: true,
      minLength: 7,
      validate: (value) => {
        if (value.toLowerCase().includes("password")) {
          throw new Error("Password must not contain 'password'");
        }
        if (value.trim().includes(" "))
          throw new Error("Password must not contain space");
      },
    },
    dateOfBirth: {
      type: Date,
      default: Date.now,
      trim: true,
      required: true,
      validate: (value) => {
        let dob = moment(value);
        let now = moment();
        if (dob > now) {
          throw new Error(`DateOfBirth(${dob}) can not be greater than current datetime(${now}`);
        }
      }
    },
    
    email: {
      type: String,
      unique: true,
      trim: true,
      lowercase: true,
      sparse: true,
      index: true,
      validate: (value) => {
        if (!validator.isEmail(value)) {
          throw new Error("Invalid email address");
        }
      }
    },
    gender: {
      type: String,
      enum: ['male', 'Male', 'female', 'Female', 'others', 'Others'],
    },
    phoneNumber: {
      type: String,
      unique: true,
      sparse: true,
      index: true,
      validate: (value) => {
        if (!validator.isMobilePhone(value)) {
          throw new Error("Invalid phone number!");
        }
      },
    },
    isVerifyEmail: {
      type : Boolean,
      default:"false",
    },
    isVerifyPhone: {
      type : Boolean,
      default:"false"
    },
    emailToken: {
      type: String,
      default: null,
    },
    lastLogin: {
      type: Date,
      default: Date.now,
      timestamps: true,
    },
    lastLogout: {
      type: Date,
      default: Date.now,
      timestamps: true,
    },
    tokens: [
      {
        token: {
          type: String,
          required: true,
        },
      },
    ],
    avatar: {
      type: String
    },
  },
  {
    timestamps: true,
  }
);
userSchema.methods.toJSON = function () {
  const userObject = this.toObject();
  delete userObject.password;
  userObject.tokens = undefined;
  return userObject;
};
///Get User Token
userSchema.methods.getToken = async function () {
  const user = this;
  const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET_KEY);
  user.tokens.push({ token });
  await user.save();
  return token;
};
//Hash the plain text password before saving
userSchema.pre("save", async function (next) {
  const user = this;

  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 10);
  }
  next();
});
///Find User In the database

userSchema.statics.findByCredentials = async (email, password, phoneNumber) => {
  let user = await User.findOne({ email });
  if (!user) {
    user = await User.findOne({ phoneNumber });
    if (!user) {
      throw new Error("User does not exist")
    }
  }
  if(password!=null){
  const isMatchPassword = await bcrypt.compare(password, user.password);
  if (!isMatchPassword) {
    throw new Error("Password is not correct");
  }}
  return user;
};

const User = mongoose.model("User", userSchema)
export default User;