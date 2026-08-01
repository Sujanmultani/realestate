import connectDB from '@/lib/db';
import Property from '@/models/Property';
import Inquiry from '@/models/Inquiry';
import User from '@/models/User';

const FALLBACK_PROPERTIES = [
  {
    _id: '507f1f77bcf86cd799439011',
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
    _id: '507f1f77bcf86cd799439012',
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
    _id: '507f1f77bcf86cd799439013',
    title: 'Contemporary Commercial Office Suite in SG Highway Corridor',
    description: 'Grade-A commercial workspace with high-speed fiber internet, centralized HVAC, conference rooms, and 24/7 access control.',
    price: 38000000,
    propertyType: 'commercial',
    listingType: 'sale',
    bedrooms: 0,
    bathrooms: 2,
    areaSqft: 3400,
    address: {
      city: 'Ahmedabad',
      locality: 'SG Highway',
      pincode: '380054',
      state: 'Gujarat',
    },
    images: [
      { url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80', publicId: 'office_1' },
    ],
    amenities: ['High Speed Elevators', 'Central HVAC', 'Visitor Parking', 'Cafeteria'],
    ownerName: 'Rajesh Patel',
    ownerPhone: '+91 98980 55443',
    ownerEmail: 'rajesh@patelgroup.com',
    status: 'available',
    featured: true,
    views: 210,
  },
  {
    _id: '507f1f77bcf86cd799439014',
    title: 'Luxury 4BHK Gated Villa in Jubilee Hills',
    description: 'Exclusive independent villa featuring private garden, lap pool, servant quarters, and solar power backup in Hyderabad’s prime enclave.',
    price: 95000000,
    propertyType: 'villa',
    listingType: 'sale',
    bedrooms: 4,
    bathrooms: 5,
    areaSqft: 5100,
    address: {
      city: 'Hyderabad',
      locality: 'Jubilee Hills Road No. 36',
      pincode: '500033',
      state: 'Telangana',
    },
    images: [
      { url: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1200&q=80', publicId: 'hyd_villa_1' },
    ],
    amenities: ['Private Garden', 'Swimming Pool', 'Solar Power', 'Servant Quarters'],
    ownerName: 'K. V. Reddy',
    ownerPhone: '+91 98490 11223',
    ownerEmail: 'kvreddy@reddyproperties.in',
    status: 'available',
    featured: true,
    views: 412,
  },
  {
    _id: '507f1f77bcf86cd799439015',
    title: 'Premium 2BHK Rental Apartment in Koregaon Park',
    description: 'Charming fully-furnished apartment in leafy Koregaon Park. Quiet neighborhood, high-speed WiFi, balcony garden, and covered parking included.',
    price: 45000,
    propertyType: 'apartment',
    listingType: 'rent',
    bedrooms: 2,
    bathrooms: 2,
    areaSqft: 1350,
    address: {
      city: 'Pune',
      locality: 'Koregaon Park Lane 7',
      pincode: '411001',
      state: 'Maharashtra',
    },
    images: [
      { url: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80', publicId: 'pune_rent_1' },
    ],
    amenities: ['Furnished', 'Balcony Garden', 'Security', 'Covered Parking'],
    ownerName: 'Ananya Kulkarni',
    ownerPhone: '+91 97654 32109',
    ownerEmail: 'ananya.kulkarni@gmail.com',
    status: 'available',
    featured: false,
    views: 156,
  },
  {
    _id: '507f1f77bcf86cd799439016',
    title: 'Golf Course Road 3BHK Penthouse with Private Terrace',
    description: 'High-floor luxury penthouse overlooking DLF Golf Course. Double height ceiling living room, jacuzzi on terrace, and smart home lighting.',
    price: 65000000,
    propertyType: 'apartment',
    listingType: 'sale',
    bedrooms: 3,
    bathrooms: 4,
    areaSqft: 3800,
    address: {
      city: 'Gurugram',
      locality: 'Golf Course Road',
      pincode: '122002',
      state: 'Haryana',
    },
    images: [
      { url: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80', publicId: 'gurgaon_pent_1' },
    ],
    amenities: ['Golf Course View', 'Private Jacuzzi', 'Smart Lighting', 'Concierge Desk'],
    ownerName: 'Devendra Malik',
    ownerPhone: '+91 98110 99887',
    ownerEmail: 'dmalik@malikholdings.com',
    status: 'available',
    featured: true,
    views: 298,
  },
];

// Helper to serialize MongoDB documents cleanly
function serializeDoc(doc) {
  if (!doc) return null;
  const raw = doc.toObject ? doc.toObject() : doc;
  return JSON.parse(JSON.stringify(raw));
}

export async function getFeaturedProperties(limit = 6) {
  try {
    await connectDB();
    const properties = await Property.find({ status: 'available' })
      .sort({ createdAt: -1 })
      .limit(limit)
      .lean();

    if (properties && properties.length > 0) {
      return properties.map(serializeDoc);
    }
  } catch (error) {
    console.error('Error fetching featured properties:', error);
  }
  return FALLBACK_PROPERTIES.slice(0, limit);
}

export async function getTrendingProperties(excludeId = null, limit = 8) {
  try {
    await connectDB();
    const query = { status: 'available' };
    if (excludeId) {
      query._id = { $ne: excludeId };
    }
    const properties = await Property.find(query)
      .sort({ views: -1, createdAt: -1 })
      .limit(limit)
      .lean();

    if (properties && properties.length > 0) {
      return properties.map(serializeDoc);
    }
  } catch (error) {
    console.error('Error fetching trending properties:', error);
  }
  return FALLBACK_PROPERTIES.filter((p) => p._id !== excludeId).slice(0, limit);
}

export async function getProperties(filters = {}) {
  try {
    await connectDB();
    const {
      city,
      listingType,
      propertyType,
      minPrice,
      maxPrice,
      bedrooms,
      sort = 'newest',
      page = 1,
      limit = 9,
    } = filters;

    const query = { status: 'available' };

    if (city && city !== 'all') {
      query['address.city'] = { $regex: new RegExp(city, 'i') };
    }

    if (listingType && listingType !== 'all') {
      query.listingType = listingType;
    }

    if (propertyType && propertyType !== 'all') {
      query.propertyType = propertyType;
    }

    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    if (bedrooms && bedrooms !== 'all') {
      const b = Number(bedrooms);
      if (b >= 4) {
        query.bedrooms = { $gte: 4 };
      } else {
        query.bedrooms = b;
      }
    }

    let sortOption = { createdAt: -1 };
    if (sort === 'price_asc') sortOption = { price: 1 };
    if (sort === 'price_desc') sortOption = { price: -1 };
    if (sort === 'popular') sortOption = { views: -1 };

    const skip = (page - 1) * limit;

    const [properties, total] = await Promise.all([
      Property.find(query).sort(sortOption).skip(skip).limit(limit).lean(),
      Property.countDocuments(query),
    ]);

    if (properties && properties.length > 0) {
      return {
        properties: properties.map(serializeDoc),
        total,
        page: Number(page),
        pages: Math.ceil(total / limit),
      };
    }
  } catch (error) {
    console.error('Error fetching properties:', error);
  }

  return {
    properties: FALLBACK_PROPERTIES.slice(0, 6),
    total: FALLBACK_PROPERTIES.length,
    page: 1,
    pages: 1,
  };
}

export async function getPropertyById(id) {
  try {
    await connectDB();
    const property = await Property.findById(id).lean();
    if (property) {
      Property.findByIdAndUpdate(id, { $inc: { views: 1 } }).exec();
      return serializeDoc(property);
    }
  } catch (error) {
    console.error('Error fetching property by ID:', error);
  }
  return FALLBACK_PROPERTIES.find((p) => p._id === id) || FALLBACK_PROPERTIES[0];
}

export async function getSimilarProperties(currentProperty, limit = 3) {
  try {
    await connectDB();
    const query = {
      _id: { $ne: currentProperty._id },
      status: 'available',
      $or: [
        { propertyType: currentProperty.propertyType },
        { 'address.city': currentProperty.address?.city },
      ],
    };

    const properties = await Property.find(query).limit(limit).lean();
    if (properties && properties.length > 0) {
      return properties.map(serializeDoc);
    }
  } catch (error) {
    console.error('Error fetching similar properties:', error);
  }
  return FALLBACK_PROPERTIES.filter((p) => p._id !== currentProperty._id).slice(0, limit);
}

export async function getUserFavorites(userId) {
  try {
    await connectDB();
    const user = await User.findById(userId).populate('favorites').lean();
    if (user && user.favorites) {
      return user.favorites.filter((f) => f && f.status === 'available').map(serializeDoc);
    }
  } catch (error) {
    console.error('Error fetching user favorites:', error);
  }
  return [];
}

export async function getInquiries(filters = {}) {
  try {
    await connectDB();
    const query = {};
    if (filters.status && filters.status !== 'all') {
      query.status = filters.status;
    }

    const inquiries = await Inquiry.find(query)
      .populate('property', 'title price listingType')
      .sort({ createdAt: -1 })
      .lean();

    return inquiries.map(serializeDoc);
  } catch (error) {
    console.error('Error fetching inquiries:', error);
  }
  return [];
}
