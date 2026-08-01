import { NextResponse } from 'next/server';
import { toggleFavoriteAction } from '@/lib/actions';

export async function POST(req) {
  try {
    const { propertyId } = await req.json();

    if (!propertyId) {
      return NextResponse.json({ error: 'Property ID is required' }, { status: 400 });
    }

    const result = await toggleFavoriteAction(propertyId);

    if (!result.success) {
      return NextResponse.json({ error: result.error, requiresLogin: result.requiresLogin }, { status: result.requiresLogin ? 401 : 400 });
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error('API POST /api/favorites error:', error);
    return NextResponse.json({ error: 'Failed to toggle favorite' }, { status: 500 });
  }
}
