import { NextResponse } from 'next/server';
import { getApps } from 'firebase-admin/app';

export async function GET() {
  let pk = process.env.FIREBASE_PRIVATE_KEY || '';
  
  // Deteksi format key untuk debugging
  let initError = null;
  try {
    const serviceAccount = {
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: pk,
    };
    
    // We import initializeApp dynamically to avoid conflicting with the main one
    const admin = require('firebase-admin/app');
    if (admin.getApps().length === 0) {
      admin.initializeApp({
        credential: admin.cert(serviceAccount)
      });
    }
  } catch (error: any) {
    initError = error.message;
  }

  const debugInfo = {
    FIREBASE_PROJECT_ID_EXISTS: !!process.env.FIREBASE_PROJECT_ID,
    FIREBASE_CLIENT_EMAIL_EXISTS: !!process.env.FIREBASE_CLIENT_EMAIL,
    FIREBASE_PRIVATE_KEY_EXISTS: !!process.env.FIREBASE_PRIVATE_KEY,
    PRIVATE_KEY_LENGTH: pk.length,
    PRIVATE_KEY_STARTS_WITH_QUOTE: pk.startsWith('"'),
    PRIVATE_KEY_HAS_LITERAL_NEWLINE: pk.includes('\\n'),
    PRIVATE_KEY_HAS_ACTUAL_NEWLINE: pk.includes('\n'),
    IS_FIREBASE_INITIALIZED: getApps().length > 0,
    INIT_ERROR: initError,
    NODE_ENV: process.env.NODE_ENV
  };

  return NextResponse.json(debugInfo);
}
