import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import User from '@/models/User';
import Property from '@/models/Property';
import Inquiry from '@/models/Inquiry';
import bcrypt from 'bcryptjs';
import dns from 'dns';

try {
  dns.setServers(['8.8.8.8', '1.1.1.1']);
} catch (e) {}

export async function GET() {
  try {
    await connectDB();

    await User.deleteMany({});
    await Property.deleteMany({});
    await Inquiry.deleteMany({});

    const adminPassword = await bcrypt.hash('admin123', 10);
    const admin = await User.create({
      name: 'Portal Admin',
      email: 'admin@realestate.com',
      password: adminPassword,
      role: 'admin',
    });

    const prop = await Property.create({
      title: 'Luxury 4BHK Sky Villa in Worli',
      description: 'Oceanfront villa with sea view balcony and private pool.',
      price: 185000000,
      propertyType: 'villa',
      listingType: 'sale',
      bedrooms: 4,
      bathrooms: 5,
      areaSqft: 4200,
      address: { city: 'Mumbai', locality: 'Worli', pincode: '400018', state: 'Maharashtra' },
      images: [{ url: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80' }],
      amenities: ['Sea View', 'Private Pool'],
      ownerName: 'Vikram Singhania',
      ownerPhone: '+91 98200 12345',
      ownerEmail: 'vikram@example.com',
      status: 'available',
      featured: true,
      postedBy: admin._id,
    });

    return NextResponse.json({
      status: 'SUCCESS',
      message: 'MongoDB Atlas connected and seeded cleanly!',
      userCount: 1,
      propertyCount: 1,
    });
  } catch (err) {
    return NextResponse.json({
      status: 'FAILED',
      errorMessage: err.message,
      errorName: err.name,
    }, { status: 200 });
  }
}
