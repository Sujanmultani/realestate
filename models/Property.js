import mongoose from 'mongoose';

const PropertySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Property title is required'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Property description is required'],
    },
    price: {
      type: Number,
      required: [true, 'Price is required'],
      min: 0,
    },
    propertyType: {
      type: String,
      required: true,
      enum: ['apartment', 'villa', 'house', 'plot', 'commercial'],
      default: 'apartment',
    },
    listingType: {
      type: String,
      required: true,
      enum: ['sale', 'rent'],
      default: 'sale',
    },
    bedrooms: {
      type: Number,
      default: 1,
    },
    bathrooms: {
      type: Number,
      default: 1,
    },
    areaSqft: {
      type: Number,
      required: true,
    },
    address: {
      city: { type: String, required: true, trim: true },
      locality: { type: String, required: true, trim: true },
      pincode: { type: String, trim: true },
      state: { type: String, trim: true, default: 'Gujarat' },
    },
    images: [
      {
        url: { type: String, required: true },
        publicId: { type: String, default: '' },
      },
    ],
    amenities: [{ type: String }],
    ownerName: { type: String, required: true },
    ownerPhone: { type: String, required: true },
    ownerEmail: { type: String, required: true },
    status: {
      type: String,
      enum: ['available', 'sold', 'rented'],
      default: 'available',
    },
    featured: {
      type: Boolean,
      default: false,
    },
    postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    views: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

// Add index for fast location and type filtering
PropertySchema.index({ 'address.city': 1, listingType: 1, propertyType: 1, price: 1 });

export default mongoose.models.Property || mongoose.model('Property', PropertySchema);
