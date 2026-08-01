import connectDB from '@/lib/db';
import Property from '@/models/Property';
import Inquiry from '@/models/Inquiry';
import User from '@/models/User';

// Helper to serialize MongoDB documents cleanly
function serializeDoc(doc) {
  if (!doc) return null;
  const raw = doc.toObject ? doc.toObject() : doc;
  return JSON.parse(JSON.stringify(raw));
}

export async function getFeaturedProperties(limit = 6) {
  try {
    await connectDB();
    const properties = await Property.find({ status: 'available', featured: true })
      .sort({ createdAt: -1 })
      .limit(limit)
      .lean();
    return properties.map(serializeDoc);
  } catch (error) {
    console.error('Error fetching featured properties:', error);
    return [];
  }
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
    return properties.map(serializeDoc);
  } catch (error) {
    console.error('Error fetching trending properties:', error);
    return [];
  }
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

    return {
      properties: properties.map(serializeDoc),
      total,
      page: Number(page),
      pages: Math.ceil(total / limit),
    };
  } catch (error) {
    console.error('Error fetching properties:', error);
    return { properties: [], total: 0, page: 1, pages: 1 };
  }
}

export async function getPropertyById(id) {
  try {
    await connectDB();
    const property = await Property.findById(id).lean();
    if (!property) return null;

    // Increment views count asynchronously
    Property.findByIdAndUpdate(id, { $inc: { views: 1 } }).exec();

    return serializeDoc(property);
  } catch (error) {
    console.error('Error fetching property by ID:', error);
    return null;
  }
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
    return properties.map(serializeDoc);
  } catch (error) {
    console.error('Error fetching similar properties:', error);
    return [];
  }
}

export async function getUserFavorites(userId) {
  try {
    await connectDB();
    const user = await User.findById(userId).populate('favorites').lean();
    if (!user || !user.favorites) return [];

    return user.favorites.filter((f) => f && f.status === 'available').map(serializeDoc);
  } catch (error) {
    console.error('Error fetching user favorites:', error);
    return [];
  }
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
    return [];
  }
}
