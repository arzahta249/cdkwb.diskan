import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { getAuth } from 'firebase-admin/auth';
import { getStorage } from 'firebase-admin/storage';

if (!getApps().length) {
  try {
    let pk = process.env.FIREBASE_PRIVATE_KEY || '';
    
    // 1. If it's wrapped in quotes, remove them
    if (pk.startsWith('"') && pk.endsWith('"')) {
      pk = pk.slice(1, -1);
    }
    
    // 2. If user copy-pasted the entire JSON file instead of just the key
    if (pk.startsWith('{')) {
      try {
        const parsed = JSON.parse(pk);
        if (parsed.private_key) pk = parsed.private_key;
        else if (parsed.privateKey) pk = parsed.privateKey;
      } catch (e) {
        console.warn('Failed to parse FIREBASE_PRIVATE_KEY as JSON even though it starts with {');
      }
    }

    // 3. Replace literal escaped newlines with actual newlines
    pk = pk.replace(/\\n/g, '\n');

    const serviceAccount = {
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: pk,
    };
    
    initializeApp({
      credential: cert(serviceAccount),
      storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || `${process.env.FIREBASE_PROJECT_ID}.appspot.com`
    });
    console.log('Firebase Admin Initialized Successfully!');
  } catch (error) {
    console.error('Firebase admin initialization error:', error);
  }
}

export let adminDb: any;
export let adminAuth: any;
export let adminStorage: any;

try {
  adminDb = getFirestore();
  adminAuth = getAuth();
  adminStorage = getStorage();
} catch (error) {
  // Safe fallback to prevent Next.js framework crashes (e.g. when accessing .then on a Proxy)
  const throwError = () => { throw new Error('Firebase Admin is not initialized properly: ' + error); };
  adminDb = { collection: throwError };
  adminAuth = { verifyIdToken: throwError };
  adminStorage = { bucket: throwError };
}
