import { NextResponse } from 'next/server';
import { submitInquiryAction } from '@/lib/actions';

export async function POST(req) {
  try {
    const body = await req.json();
    const formData = new FormData();

    Object.keys(body).forEach((key) => {
      formData.append(key, body[key]);
    });

    const result = await submitInquiryAction(null, formData);

    if (!result.success) {
      return NextResponse.json({ error: result.error }, { status: 400 });
    }

    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    console.error('API POST /api/inquiries error:', error);
    return NextResponse.json({ error: 'Failed to process inquiry' }, { status: 500 });
  }
}
