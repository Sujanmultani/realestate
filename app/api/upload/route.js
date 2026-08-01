import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { generateCloudinarySignature } from '@/lib/cloudinary';

export async function GET() {
  try {
    const session = await auth();
    if (!session || session.user?.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const timestamp = Math.round(new Date().getTime() / 1000);
    const signatureData = generateCloudinarySignature(timestamp, 'realestate');

    return NextResponse.json(signatureData);
  } catch (error) {
    console.error('Upload signature error:', error);
    return NextResponse.json({ error: 'Failed to generate upload signature' }, { status: 500 });
  }
}
