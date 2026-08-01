import { NextResponse } from 'next/server';
import { getProperties } from '@/lib/data';
import { createPropertyAction } from '@/lib/actions';
import { auth } from '@/lib/auth';

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const city = searchParams.get('city');
    const listingType = searchParams.get('listingType');
    const propertyType = searchParams.get('propertyType');
    const minPrice = searchParams.get('minPrice');
    const maxPrice = searchParams.get('maxPrice');
    const bedrooms = searchParams.get('bedrooms');
    const sort = searchParams.get('sort');
    const page = searchParams.get('page');

    const result = await getProperties({
      city,
      listingType,
      propertyType,
      minPrice,
      maxPrice,
      bedrooms,
      sort,
      page,
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error('API GET /api/properties error:', error);
    return NextResponse.json({ error: 'Failed to fetch properties' }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const session = await auth();
    if (!session || session.user?.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const result = await createPropertyAction(body);

    if (!result.success) {
      return NextResponse.json({ error: result.error }, { status: 400 });
    }

    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    console.error('API POST /api/properties error:', error);
    return NextResponse.json({ error: 'Failed to create property' }, { status: 500 });
  }
}
