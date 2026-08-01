'use server';

import { revalidatePath } from 'next/cache';
import connectDB from '@/lib/db';
import Property from '@/models/Property';
import Inquiry from '@/models/Inquiry';
import User from '@/models/User';
import { auth } from '@/lib/auth';

// 1. Submit Inquiry Action (Contact Modal)
export async function submitInquiryAction(prevState, formData) {
  try {
    await connectDB();

    const propertyId = formData.get('propertyId');
    const name = formData.get('name');
    const email = formData.get('email');
    const phone = formData.get('phone');
    const message = formData.get('message');

    if (!propertyId || !name || !email || !phone || !message) {
      return { success: false, error: 'All fields are required' };
    }

    const inquiry = await Inquiry.create({
      property: propertyId,
      name,
      email,
      phone,
      message,
      status: 'pending',
    });

    return {
      success: true,
      message: 'Inquiry submitted successfully! The owner will get back to you shortly.',
      inquiryId: inquiry._id.toString(),
    };
  } catch (error) {
    console.error('Submit inquiry error:', error);
    return { success: false, error: error.message || 'Failed to submit inquiry' };
  }
}

// 2. Toggle Favorite Action
export async function toggleFavoriteAction(propertyId) {
  try {
    const session = await auth();
    if (!session || !session.user) {
      return { success: false, error: 'Unauthorized', requiresLogin: true };
    }

    await connectDB();
    const user = await User.findById(session.user.id);
    if (!user) {
      return { success: false, error: 'User not found' };
    }

    const index = user.favorites.indexOf(propertyId);
    let isFavorited = false;

    if (index > -1) {
      user.favorites.splice(index, 1);
      isFavorited = false;
    } else {
      user.favorites.push(propertyId);
      isFavorited = true;
    }

    await user.save();
    revalidatePath('/favorites');
    revalidatePath('/listings');
    revalidatePath(`/property/${propertyId}`);

    return { success: true, isFavorited, count: user.favorites.length };
  } catch (error) {
    console.error('Toggle favorite error:', error);
    return { success: false, error: error.message || 'Failed to update favorite' };
  }
}

// 3. Increment Property Views
export async function incrementPropertyViews(propertyId) {
  try {
    await connectDB();
    if (!propertyId || propertyId.length !== 24) return;
    await Property.findByIdAndUpdate(propertyId, { $inc: { views: 1 } });
  } catch (error) {
    console.error('Increment views error:', error);
  }
}

// 4. Admin Property Creation Action
export async function createPropertyAction(propertyData) {
  try {
    const session = await auth();
    if (!session || session.user?.role !== 'admin') {
      return { success: false, error: 'Access denied. Admin authorization required.' };
    }

    await connectDB();

    const newProperty = await Property.create({
      ...propertyData,
      postedBy: session.user.id,
    });

    revalidatePath('/listings');
    revalidatePath('/');
    revalidatePath('/admin/properties');

    return {
      success: true,
      message: 'Property created successfully',
      propertyId: newProperty._id.toString(),
    };
  } catch (error) {
    console.error('Create property error:', error);
    return { success: false, error: error.message || 'Failed to create property' };
  }
}

// 5. Admin Property Update Action
export async function updatePropertyAction(propertyId, propertyData) {
  try {
    const session = await auth();
    if (!session || session.user?.role !== 'admin') {
      return { success: false, error: 'Access denied. Admin authorization required.' };
    }

    await connectDB();

    const updated = await Property.findByIdAndUpdate(propertyId, propertyData, { new: true });
    if (!updated) {
      return { success: false, error: 'Property not found' };
    }

    revalidatePath('/listings');
    revalidatePath('/');
    revalidatePath(`/property/${propertyId}`);
    revalidatePath('/admin/properties');

    return { success: true, message: 'Property updated successfully' };
  } catch (error) {
    console.error('Update property error:', error);
    return { success: false, error: error.message || 'Failed to update property' };
  }
}

// 6. Admin Delete Property Action
export async function deletePropertyAction(propertyId) {
  try {
    const session = await auth();
    if (!session || session.user?.role !== 'admin') {
      return { success: false, error: 'Access denied. Admin authorization required.' };
    }

    await connectDB();

    const deleted = await Property.findByIdAndDelete(propertyId);
    if (!deleted) {
      return { success: false, error: 'Property not found' };
    }

    // Also delete associated inquiries
    await Inquiry.deleteMany({ property: propertyId });

    revalidatePath('/listings');
    revalidatePath('/');
    revalidatePath('/admin/properties');

    return { success: true, message: 'Property deleted successfully' };
  } catch (error) {
    console.error('Delete property error:', error);
    return { success: false, error: error.message || 'Failed to delete property' };
  }
}

// 7. Admin Inquiry Status Update Action
export async function updateInquiryStatusAction(inquiryId, status) {
  try {
    const session = await auth();
    if (!session || session.user?.role !== 'admin') {
      return { success: false, error: 'Access denied. Admin authorization required.' };
    }

    await connectDB();

    const inquiry = await Inquiry.findByIdAndUpdate(inquiryId, { status }, { new: true });
    if (!inquiry) {
      return { success: false, error: 'Inquiry not found' };
    }

    revalidatePath('/admin/inquiries');
    revalidatePath('/admin');

    return { success: true, message: `Inquiry status updated to ${status}` };
  } catch (error) {
    console.error('Update inquiry status error:', error);
    return { success: false, error: error.message || 'Failed to update inquiry status' };
  }
}
