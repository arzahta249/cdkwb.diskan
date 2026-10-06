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
    });
    console.log('Firebase Admin Initialized Successfully!');
  } catch (error) {
    console.error('Firebase admin initialization error:', error);
  }
}

// Export using getter proxies so we don't crash on module load if initialization failed
export const adminDb = new Proxy({} as any, {
  get: (target, prop) => getFirestore()[prop as keyof typeof getFirestore]
});
export const adminAuth = new Proxy({} as any, {
  get: (target, prop) => getAuth()[prop as keyof typeof getAuth]
});
export const adminStorage = new Proxy({} as any, {
  get: (target, prop) => getStorage()[prop as keyof typeof getStorage]
});
