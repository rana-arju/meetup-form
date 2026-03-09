import mongoose, { Schema, Model } from "mongoose";

export interface ISubmission {
  fullName: string;
  rollNumber?: string;
  phone: string;
  currentLocation?: string;
  interest: "definitely" | "maybe" | "unsure";
  suggestions?: string;
  wantUpdates: boolean;
  submittedAt: Date;
}

const SubmissionSchema = new Schema<ISubmission>(
  {
    fullName: {
      type: String,
      required: [true, "Full name is required"],
      trim: true,
      minlength: [3, "Name must be at least 3 characters"],
    },
    rollNumber: {
      type: String,
      trim: true,
    },
    phone: {
      type: String,
      required: [true, "Phone number is required"],
      unique: true,
      trim: true,
      index: true,
    },
    currentLocation: {
      type: String,
      trim: true,
    },
    interest: {
      type: String,
      required: [true, "Interest level is required"],
      enum: ["definitely", "maybe", "unsure"],
    },
    suggestions: {
      type: String,
      trim: true,
    },
    wantUpdates: {
      type: Boolean,
      default: true,
    },
    submittedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  },
);

// Create index for phone number to ensure uniqueness and fast lookups
SubmissionSchema.index({ phone: 1 }, { unique: true });

const Submission: Model<ISubmission> =
  mongoose.models.Submission ||
  mongoose.model<ISubmission>("Submission", SubmissionSchema);

export default Submission;
