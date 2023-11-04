import { Schema, model, Document } from "mongoose";
import { IUser } from "./interfaces";


const userSchema = new Schema<IUser>({
    name: {
        type: String,
        required: [true, "The name is required"]
    },
    email:{
        type: String,
        required: [true, "Email is required"]
    },
    password:{
        type: String,
        required: [true, "Password is required"]
    },
    status:{
        type: Boolean,
        default: true
    }
});


export const User = model<IUser>('User', userSchema)