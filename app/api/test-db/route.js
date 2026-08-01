import { NextResponse } from 'next/server';
import mongoose from 'mongoose';

export async function GET() {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    return NextResponse.json({
      status: 'ERROR',
      message: 'MONGODB_URI environment variable is missing from process.env. Did you restart npm run dev?',
    }, { status: 500 });
  }

  // Mask password for display
  const safeUri = uri.replace(/:([^@]+)@/, ':****@');

  try {
    if (mongoose.connection.readyState !== 1) {
      await mongoose.connect(uri);
    }

    return NextResponse.json({
      status: 'CONNECTED_SUCCESSFULLY',
      message: 'MongoDB Atlas connected successfully!',
      uri: safeUri,
      readyState: mongoose.connection.readyState,
    });
  } catch (error) {
    return NextResponse.json({
      status: 'CONNECTION_FAILED',
      error: error.message,
      name: error.name,
      uri: safeUri,
    }, { status: 500 });
  }
}
