import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import connectDB from '@/lib/db';
import User from '@/models/User';
import Property from '@/models/Property';
import Inquiry from '@/models/Inquiry';

const SEED_PROPERTIES = [
  {
    title: 'Ultra-Luxury 4BHK Sky Villa with Panoramic Sea Views',
    description: 'Experiential oceanfront living in Mumbai’s prestigious Worli Sea Face. Features Italian marble flooring, expansive private balcony, home automation system, and floor-to-ceiling double-glazed glass windows.',
    price: 185000000,
    propertyType: 'villa',
    listingType: 'sale',
    bedrooms: 4,
    bathrooms: 5,
    areaSqft: 4200,
    address: {
      city: 'Mumbai',
      locality: 'Worli Sea Face',
      pincode: '400018',
      state: 'Maharashtra',
    },
    images: [
      { url: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80', publicId: 'sea_villa_1' },
      { url: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80', publicId: 'sea_villa_2' },
    ],
    amenities: ['Sea View', 'Private Elevator', 'Infinity Pool', 'Gymnasium', 'Home Theater', '24/7 Security'],
    ownerName: 'Vikramaditya Singhania',
    ownerPhone: '+91 98200 12345',
    ownerEmail: 'vikram.singhania@luxuryspaces.in',
    status: 'available',
    featured: true,
    views: 342,
  },
  {
    title: 'Modern Tech-Park View 3BHK Apartment in Indiranagar',
    description: 'Prime contemporary apartment located in heart of Indiranagar. Fully furnished with modular German kitchen, wooden deck flooring, and immediate proximity to metro.',
    price: 24500000,
    propertyType: 'apartment',
    listingType: 'sale',
    bedrooms: 3,
    bathrooms: 3,
    areaSqft: 2150,
    address: {
      city: 'Bengaluru',
      locality: 'Indiranagar 100ft Road',
      pincode: '560038',
      state: 'Karnataka',
    },
    images: [
      { url: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80', publicId: 'blore_apt_1' },
    ],
    amenities: ['Clubhouse', 'Power Backup', 'Covered Parking', 'Children Play Area'],
    ownerName: 'Priya Sharma',
    ownerPhone: '+91 99000 87654',
    ownerEmail: 'priya.sharma@gmail.com',
    status: 'available',
    featured: true,
    views: 189,
  },
  {
    title: 'Premium 2BHK Furnished Flat near SG Highway',
    description: 'Sun-drenched, airy 2-bedroom apartment situated in high-demand residential township along SG Highway. Gated complex with lush landscaped garden.',
    price: 6800000,
    propertyType: 'apartment',
    listingType: 'sale',
    bedrooms: 2,
    bathrooms: 2,
    areaSqft: 1350,
    address: {
      city: 'Ahmedabad',
      locality: 'SG Highway, Bodakdev',
      pincode: '380054',
      state: 'Gujarat',
    },
    images: [
      { url: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80', publicId: 'ahmedabad_1' },
    ],
    amenities: ['Swimming Pool', 'CCTV Security', 'Intercom', 'Gazebo'],
    ownerName: 'Rajesh Patel',
    ownerPhone: '+91 98980 43210',
    ownerEmail: 'rajesh.patel@gujaratestates.com',
    status: 'available',
    featured: true,
    views: 210,
  },
  {
    title: 'High-Rise Commercial Office Space in Cyber City',
    description: 'Grade A corporate office space on 14th floor with panoramic city skyline views. Includes 3 executive cabins, conference room, and seating for 45 employees.',
    price: 350000,
    propertyType: 'commercial',
    listingType: 'rent',
    bedrooms: 0,
    bathrooms: 4,
    areaSqft: 3800,
    address: {
      city: 'Gurugram',
      locality: 'DLF Cyber City Phase 2',
      pincode: '122002',
      state: 'Haryana',
    },
    images: [
      { url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80', publicId: 'office_1' },
    ],
    amenities: ['Central AC', 'Fiber Optic Ready', '100% Power Backup'],
    ownerName: 'Anil Agarwal',
    ownerPhone: '+91 98111 22334',
    ownerEmail: 'anil.agarwal@cyberoffices.com',
    status: 'available',
    featured: false,
    views: 155,
  },
  {
    title: 'Spacious 4BHK Independent Duplex Villa with Garden',
    description: 'Elegant independent architectural villa featuring a private swimming pool, landscaped lawn, multi-car garage, and servant quarters.',
    price: 125000000,
    propertyType: 'villa',
    listingType: 'sale',
    bedrooms: 4,
    bathrooms: 5,
    areaSqft: 5400,
    address: {
      city: 'Hyderabad',
      locality: 'Jubilee Hills Road No. 36',
      pincode: '500033',
      state: 'Telangana',
    },
    images: [
      { url: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1200&q=80', publicId: 'hyderabad_villa_1' },
    ],
    amenities: ['Private Garden', 'Swimming Pool', 'Servant Room', 'Italian Marble'],
    ownerName: 'Kavitha Reddy',
    ownerPhone: '+91 97000 55443',
    ownerEmail: 'kavitha.reddy@hyderabadhomes.in',
    status: 'available',
    featured: true,
    views: 290,
  },
  {
    title: 'Charming 2BHK Rental Flat near Satellite Hub',
    description: 'Cozy, tastefully designed 2-bedroom rental home with modular kitchen, ACs in all rooms, and balcony overlooking park.',
    price: 28000,
    propertyType: 'apartment',
    listingType: 'rent',
    bedrooms: 2,
    bathrooms: 2,
    areaSqft: 1100,
    address: {
      city: 'Ahmedabad',
      locality: 'Satellite, ISCON Circle',
      pincode: '380015',
      state: 'Gujarat',
    },
    images: [
      { url: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=80', publicId: 'ahmedabad_rent_1' },
    ],
    amenities: ['Lift', '24/7 Water Supply', 'Reserved Parking', 'Balcony'],
    ownerName: 'Mehul Mehta',
    ownerPhone: '+91 94260 11223',
    ownerEmail: 'mehul.mehta@gmail.com',
    status: 'available',
    featured: false,
    views: 140,
  },
];

export async function GET() {
  try {
    await connectDB();

    // Reset collections
    await User.deleteMany({});
    await Property.deleteMany({});
    await Inquiry.deleteMany({});

    // Hash default passwords
    const adminPassword = await bcrypt.hash('admin123', 10);
    const userPassword = await bcrypt.hash('user123', 10);

    // Create Admin & Demo User
    const admin = await User.create({
      name: 'Portal Admin',
      email: 'admin@realestate.com',
      password: adminPassword,
      role: 'admin',
    });

    const user = await User.create({
      name: 'Rahul Sharma',
      email: 'user@realestate.com',
      password: userPassword,
      role: 'user',
    });

    // Create seed properties attached to Admin user
    const propertyDocs = SEED_PROPERTIES.map((prop) => ({
      ...prop,
      postedBy: admin._id,
    }));

    const createdProperties = await Property.insertMany(propertyDocs);

    // Set sample favorite for user
    if (createdProperties.length > 0) {
      user.favorites = [createdProperties[0]._id, createdProperties[1]._id];
      await user.save();
    }

    // Seed sample inquiry
    if (createdProperties.length > 0) {
      await Inquiry.create({
        property: createdProperties[0]._id,
        name: 'Siddharth Varma',
        email: 'siddharth@example.com',
        phone: '+91 98765 43210',
        message: 'Hi, I am interested in viewing this property. Please send floor plan details.',
        status: 'pending',
      });
    }

    return NextResponse.json({
      success: true,
      message: 'Database seeded successfully into MongoDB Atlas!',
      stats: {
        users: 2,
        properties: createdProperties.length,
        inquiries: 1,
      },
      demoCredentials: {
        admin: { email: 'admin@realestate.com', password: 'admin123' },
        user: { email: 'user@realestate.com', password: 'user123' },
      },
    });
  } catch (error) {
    console.error('Database seed error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Failed to seed database',
      },
      { status: 500 }
    );
  }
}
