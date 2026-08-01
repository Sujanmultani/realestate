import mongoose from 'mongoose';
import dns from 'dns';

// Force Node.js on Windows to use Google DNS for SRV lookups (fixes querySrv ECONNREFUSED)
try {
  dns.setServers(['8.8.8.8', '1.1.1.1']);
} catch (e) {
  // Ignore in client bundles
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export async function connectDB() {
  const MONGODB_URI = process.env.MONGODB_URI;

  if (!MONGODB_URI) {
    throw new Error(
      'MONGODB_URI is not defined in .env.local — check the file exists at project root and the dev server was restarted.'
    );
  }

  if (mongoose.connection.readyState === 1) {
    return mongoose.connection;
  }

  const opts = {
    bufferCommands: false,
    serverSelectionTimeoutMS: 10000,
  };

  try {
    cached.conn = await mongoose.connect(MONGODB_URI, opts);
    return cached.conn;
  } catch (e) {
    cached.conn = null;
    cached.promise = null;
    throw e;
  }
}

export default connectDB;
