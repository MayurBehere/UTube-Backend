import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken"; //for token generation
import bcrypt from "bcrypt"; //for password encryption

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      index: true, //use when required only used for searchin DB
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    avatar: {
      type: String, //cloud URL for image
      required: true,
    },
    fullname: {
      type: String,
      required: true,
      trim: true,
      index: true, //use when required only used for searchin DB
    },
    coverImage: {
      type: String, //URL
    },
    watchHistory: [
      {
        types: Schema.Types.ObjectId,
        ref: "Video",
      },
    ],
    password: {
      type: String, //need to encrypted
      required: [true, "Password is required"],
    },
    refreshTokens: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

//pre hook is a middleware function that mongoose calls before an operation is executed
//so basicaaly if we are saving any changes to the password field we will encrypt it
userSchema.pre("save", async function (next) {
  //
  if (!this.isModified("password")) return next(); //if password is not modified then return next
  //next can be used to call the next middleware function in the stack
  this.password = await bcrypt.hash(this.password, 10); //encrypting the password
  next(); //calling the next middleware function in the stack
});


//methods are used to add new methods to the schema
userSchema.methods.isPasswordCorrect = async function (password) {
  //method to check if the password is correct
  return await bcrypt.compare(password, this.password); //comparing the password with the encrypted password
};


//Access Token: This is a short-lived token, typically valid for a few minutes to a few hours. It is used to authenticate a user for a specific application and grants the user access to specific types of resources (like a particular API). In your code, the access token is generated using the user's ID, email, username, and fullname.
userSchema.methods.generateAccessToken = async function () {
  //method to generate access token
  return jwt.sign(
    {
      _id: this._id, //From database we are taking id of the user
      email: this.email,
      username: this.username,
      fullname: this.fullname,
    },
    process.env.ACCESS_TOKEN_SECRET, //secret key for token generation
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY, //expiry time for token
    }
  );
};


//Refresh Token: This is a long-lived token, typically valid for days, weeks, or even months. Its purpose is to obtain a new access token when the current access token becomes invalid or expires, without requiring the user to authenticate again. In your code, the refresh token is generated using only the user's ID.
userSchema.methods.generateRefreshToken = async function () {
  return jwt.sign(
    {
      _id: this._id, //From database we are taking id of the user
    },
    process.env.REFRESH_TOKEN_SECRET, //secret key for token generation
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY, //expiry time for token
    }
  );
};

export const user = mongoose.model("User", userSchema);
