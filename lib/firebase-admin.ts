import { cert, getApp, getApps, initializeApp } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { getStorage } from 'firebase-admin/storage';

function normalizePrivateKey(value: string) {
  let privateKey = value.trim();

  if (privateKey.startsWith('"') && privateKey.endsWith('"')) {
    privateKey = privateKey.slice(1, -1);
  }

  // Support an entire service-account JSON accidentally pasted into the ENV value.
  if (privateKey.startsWith('{')) {
    try {
      const account = JSON.parse(privateKey) as { private_key?: unknown; privateKey?: unknown };
      privateKey = typeof account.private_key === 'string'
        ? account.private_key
        : typeof account.privateKey === 'string'
          ? account.privateKey
          : privateKey;
    } catch {
      // The validation below returns a precise configuration error.
    }
  }

  return privateKey.replace(/\\n/g, '\n');
}

function getFirebaseAdminApp() {
  if (getApps().length) return getApp();

  const projectId = process.env.FIREBASE_PROJECT_ID?.trim();
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL?.trim();
  const privateKey = normalizePrivateKey(process.env.FIREBASE_PRIVATE_KEY ?? '');
  const missing = [
    !projectId && 'FIREBASE_PROJECT_ID',
    !clientEmail && 'FIREBASE_CLIENT_EMAIL',
    !privateKey && 'FIREBASE_PRIVATE_KEY',
  ].filter(Boolean);

  if (missing.length) {
    throw new Error(`Konfigurasi Firebase belum lengkap: ${missing.join(', ')}.`);
  }

  const storageBucket = process.env.FIREBASE_STORAGE_BUCKET?.trim()
    || process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET?.trim()
    || `${projectId}.firebasestorage.app`;

  return initializeApp({
    credential: cert({ projectId, clientEmail, privateKey }),
    storageBucket,
  });
}

// Initialize once and retain the original failure. Previously this error was
// swallowed, causing every Firestore operation to look like an unrelated
// "kategori tidak ditemukan" or empty-data issue.
let initializationError: Error | null = null;
let app: ReturnType<typeof getFirebaseAdminApp> | null = null;

try {
  app = getFirebaseAdminApp();
  console.info('Firebase Admin initialized.');
} catch (error) {
  initializationError = error instanceof Error ? error : new Error(String(error));
  console.error('Firebase Admin initialization failed:', initializationError.message);
}

function unavailable(service: string): never {
  throw new Error(`Firebase ${service} tidak siap: ${initializationError?.message ?? 'inisialisasi gagal'}`);
}

export const adminDb = app ? getFirestore(app) : { collection: () => unavailable('Firestore') };
export const adminStorage = app ? getStorage(app) : { bucket: () => unavailable('Storage') };
