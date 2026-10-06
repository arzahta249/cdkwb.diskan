export function convertTimestamps(obj: any): any {
  if (obj === null || obj === undefined) return obj;
  
  // If it's a Firestore Timestamp (or anything with a toDate method)
  if (typeof obj.toDate === 'function') {
    try {
      return obj.toDate().toISOString();
    } catch (e) {
      return obj;
    }
  }
  
  // If it's an object from Firestore that lost its prototype but has _seconds
  if (typeof obj === 'object' && '_seconds' in obj && '_nanoseconds' in obj) {
    return new Date(obj._seconds * 1000).toISOString();
  }

  if (Array.isArray(obj)) {
    return obj.map(convertTimestamps);
  }

  if (typeof obj === 'object') {
    const newObj: any = {};
    for (const key in obj) {
      newObj[key] = convertTimestamps(obj[key]);
    }
    return newObj;
  }

  return obj;
}
