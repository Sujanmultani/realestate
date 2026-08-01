import mongoose from 'mongoose';

const InquirySchema = new mongoose.Schema(
  {
    property: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Property',
      required: true,
    },
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      trim: true,
      lowercase: true,
    },
    phone: {
      type: String,
      required: [true, 'Phone number is required'],
      trim: true,
    },
    message: {
      type: String,
      required: [true, 'Message is required'],
    },
    status: {
      type: String,
      enum: ['pending', 'contacted', 'closed'],
      default: 'pending',
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Inquiry || mongoose.model('Inquiry', InquirySchema);
