import { NextResponse } from 'next/server';
import { getApps, initializeApp, cert } from 'firebase-admin/app';

export const dynamic = 'force-dynamic';

export async function GET() {
  const pk = process.env.FIREBASE_PRIVATE_KEY || '';
  
  // Deteksi format key untuk debugging
  let initError: string | null = null;
  try {
    if (getApps().length === 0 && process.env.FIREBASE_PROJECT_ID && process.env.FIREBASE_CLIENT_EMAIL && pk) {
      let normalizedKey = pk.trim();
      if (normalizedKey.startsWith('"') && normalizedKey.endsWith('"')) {
        normalizedKey = normalizedKey.slice(1, -1);
      }
      normalizedKey = normalizedKey.replace(/\\n/g, '\n');

      const serviceAccount = {
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: normalizedKey,
      };
      
      initializeApp({
        credential: cert(serviceAccount)
      });
    }
  } catch (error: unknown) {
    initError = error instanceof Error ? error.message : String(error);
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
