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
      query.bedrooms = Number(bedrooms);
    }

    // Sort order
    let sortOptions = { createdAt: -1 };
    if (sort === 'price_asc') sortOptions = { price: 1 };
    if (sort === 'price_desc') sortOptions = { price: -1 };
    if (sort === 'popular') sortOptions = { views: -1 };

    const pageNum = Math.max(1, Number(page));
    const limitNum = Math.max(1, Number(limit));
    const skip = (pageNum - 1) * limitNum;

    const [properties, total] = await Promise.all([
      Property.find(query).sort(sortOptions).skip(skip).limit(limitNum).lean(),
      Property.countDocuments(query),
    ]);

    return {
      properties: properties.map(serializeDoc),
      total,
      page: pageNum,
      pages: Math.ceil(total / limitNum),
    };
  } catch (error) {
    console.error('Error fetching filtered properties:', error);
    return { properties: [], total: 0, page: 1, pages: 1 };
  }
}

export async function getPropertyById(id) {
  try {
    await connectDB();
    if (!id || id.length !== 24) return null;
    const property = await Property.findById(id).lean();
    return serializeDoc(property);
  } catch (error) {
    console.error('Error fetching property by ID:', error);
    return null;
  }
}

export async function getSimilarProperties(propertyId, city, propertyType, limit = 3) {
  try {
    await connectDB();
    const query = {
      _id: { $ne: propertyId },
      status: 'available',
      $or: [{ 'address.city': city }, { propertyType }],
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
    if (!userId) return [];
    const user = await User.findById(userId).populate('favorites').lean();
    if (!user || !user.favorites) return [];
    return user.favorites.map(serializeDoc);
  } catch (error) {
    console.error('Error fetching user favorites:', error);
    return [];
  }
}

export async function getAdminStats() {
  try {
    await connectDB();
    const [totalProperties, activeProperties, totalInquiries, totalViews] = await Promise.all([
      Property.countDocuments(),
      Property.countDocuments({ status: 'available' }),
      Inquiry.countDocuments(),
      Property.aggregate([{ $group: { _id: null, total: { $sum: '$views' } } }]),
    ]);

    const recentInquiries = await Inquiry.find()
      .populate('property', 'title price images address')
      .sort({ createdAt: -1 })
      .limit(5)
      .lean();

    return {
      totalProperties,
      activeProperties,
      totalInquiries,
      totalViews: totalViews[0]?.total || 0,
      recentInquiries: recentInquiries.map(serializeDoc),
    };
  } catch (error) {
    console.error('Error fetching admin stats:', error);
    return {
      totalProperties: 0,
      activeProperties: 0,
      totalInquiries: 0,
      totalViews: 0,
      recentInquiries: [],
    };
  }
}

export async function getAdminProperties(page = 1, search = '') {
  try {
    await connectDB();
    const query = {};
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { 'address.city': { $regex: search, $options: 'i' } },
        { 'address.locality': { $regex: search, $options: 'i' } },
      ];
    }
    const limit = 10;
    const skip = (page - 1) * limit;

    const [properties, total] = await Promise.all([
      Property.find(query).sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
      Property.countDocuments(query),
    ]);

    return {
      properties: properties.map(serializeDoc),
      total,
      page,
      pages: Math.ceil(total / limit),
    };
  } catch (error) {
    console.error('Error fetching admin properties:', error);
    return { properties: [], total: 0, page: 1, pages: 1 };
  }
}

export async function getAdminInquiries(status = '') {
  try {
    await connectDB();
    const query = {};
    if (status && status !== 'all') {
      query.status = status;
    }

    const inquiries = await Inquiry.find(query)
      .populate('property', 'title address price listingType images')
      .sort({ createdAt: -1 })
      .lean();

    return inquiries.map(serializeDoc);
  } catch (error) {
    console.error('Error fetching admin inquiries:', error);
    return [];
  }
}
