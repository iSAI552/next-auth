import { Schema } from "mongoose";
import mongoose from "mongoose";

const userSchema = new Schema({
    username: {
        type: String,
        required: [true, "Please provide a username"],
        unique: [true, "The username must be unique"],
    },
    email: {
        type: String,
        required: [true, "Please provide an email"],
        unique: [true, "The email must be unique"],
    },
    password: {
        type: String,
        required: [true, "Please provide a password"],
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    forgotPasswordToken: String,
    forgotPasswordTokenExpiry: Date,
    verifyToken: String,
    verifyTokenExpiry: Date,
},{timestamps: true})

const User = mongoose.models.users || mongoose.model("users", userSchema)

export default User
