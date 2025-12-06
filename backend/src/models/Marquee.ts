import mongoose, { Document, Schema } from "mongoose";

export interface IMarquee extends Document {
  message: string;
  isActive: boolean;
}

const MarqueeSchema: Schema = new Schema(
  {
    message: { type: String, required: true },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.model<IMarquee>("Marquee", MarqueeSchema);
