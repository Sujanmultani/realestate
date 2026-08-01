import crypto from 'crypto';

export function generateCloudinarySignature(timestamp, folder = 'realestate') {
  const apiSecret = process.env.CLOUDINARY_API_SECRET || 'demo_secret';
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME || 'demo';
  const apiKey = process.env.CLOUDINARY_API_KEY || '1234567890';

  // Signature string format for Cloudinary: "folder=...&timestamp=...<secret>"
  const stringToSign = `folder=${folder}&timestamp=${timestamp}${apiSecret}`;
  const signature = crypto.createHash('sha1').update(stringToSign).digest('hex');

  return {
    timestamp,
    signature,
    apiKey,
    cloudName,
    folder,
  };
}
