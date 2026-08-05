import path from 'path';
import fs from 'fs/promises';

/**
 * Saves an uploaded File object to /public/upload/galeri and returns its public URL.
 * Supports images, videos, and PDFs.
 */
export async function uploadFile(file: File): Promise<string | null> {
  if (!file || file.size === 0) return null;

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
  const ext = path.extname(file.name) || '';
  const baseName = path.basename(file.name, ext)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');
  const filename = `${baseName}-${uniqueSuffix}${ext}`;

  const uploadDir = path.join(process.cwd(), 'public', 'upload', 'galeri');
  await fs.mkdir(uploadDir, { recursive: true });

  const filepath = path.join(uploadDir, filename);
  await fs.writeFile(filepath, buffer);

  return `/upload/galeri/${filename}`;
}
