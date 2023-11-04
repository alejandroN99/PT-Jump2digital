import { Schema, model, Document } from "mongoose";
import { ISkin } from "./interfaces";



const skinSchema = new Schema<ISkin>({
  name: {
    type: String,
    required: [true, "The name is required"],
  },
  kind: {
    type: String,
    required: [true, "The kind is required"],
  },
  price: {
    type: Number,
    required: [true, "The price is required"],
  },
  color: {
    type: String,
    required: [true, "The color is required"],
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

export const Skin = model<ISkin>("Skin", skinSchema);
