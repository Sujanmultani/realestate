import { NextResponse } from 'next/server';
import { getPropertyById } from '@/lib/data';
import { updatePropertyAction, deletePropertyAction, incrementPropertyViews } from '@/lib/actions';
import { auth } from '@/lib/auth';

export async function GET(req, { params }) {
  try {
    const { id } = await params;
    const property = await getPropertyById(id);

    if (!property) {
      return NextResponse.json({ error: 'Property not found' }, { status: 404 });
    }

    // Increment views asynchronously
    await incrementPropertyViews(id);

    return NextResponse.json(property);
  } catch (error) {
    console.error('API GET /api/properties/[id] error:', error);
    return NextResponse.json({ error: 'Failed to fetch property' }, { status: 500 });
  }
}

export async function PUT(req, { params }) {
  try {
    const session = await auth();
    if (!session || session.user?.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    const body = await req.json();
    const result = await updatePropertyAction(id, body);

    if (!result.success) {
      return NextResponse.json({ error: result.error }, { status: 400 });
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error('API PUT /api/properties/[id] error:', error);
    return NextResponse.json({ error: 'Failed to update property' }, { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  try {
    const session = await auth();
    if (!session || session.user?.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    const result = await deletePropertyAction(id);

    if (!result.success) {
      return NextResponse.json({ error: result.error }, { status: 400 });
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error('API DELETE /api/properties/[id] error:', error);
    return NextResponse.json({ error: 'Failed to delete property' }, { status: 500 });
  }
}
