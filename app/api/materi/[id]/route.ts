import { NextResponse } from 'next/server';
import { pool } from '@/lib/db';
import fs from 'fs';
import path from 'path';

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const formData = await request.formData();
    const judul = formData.get('judul') as string;
    const deskripsi = formData.get('deskripsi') as string;
    const kategori = formData.get('kategori') as string;
    const file = formData.get('file') as File | null;
    const is_verified = formData.get('is_verified') === 'true' ? 1 : 0;
    const status = formData.get('status') as string || 'published';

    const id = (await params).id;
    // First get existing record to know if we need to delete old file
    const [existingRows] = await pool.query('SELECT * FROM materi WHERE id = ?', [id]);
    const existingMateri = (existingRows as any[])[0];

    if (!existingMateri) {
      return NextResponse.json({ error: 'Materi not found' }, { status: 404 });
    }

    let file_url = existingMateri.file_url;
    let file_type = existingMateri.file_type;
    let file_size = existingMateri.file_size;

    if (file && file.size > 0) {
      // Delete old file if exists
      if (existingMateri.file_url) {
        const oldPath = path.join(process.cwd(), 'public', existingMateri.file_url);
        if (fs.existsSync(oldPath)) {
          fs.unlinkSync(oldPath);
        }
      }

      // Upload new file
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const fileExtension = path.extname(file.name);
      const originalName = path.basename(file.name, fileExtension).replace(/[^a-zA-Z0-9]/g, '_');
      const fileName = `${Date.now()}-${originalName}${fileExtension}`;
      
      const uploadDir = path.join(process.cwd(), 'public/upload/materi');
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }

      const filepath = path.join(uploadDir, fileName);
      await fs.promises.writeFile(filepath, buffer);

      file_url = `/upload/materi/${fileName}`;
      file_type = fileExtension.replace('.', '').toUpperCase();
      
      const sizeInMB = (file.size / (1024 * 1024)).toFixed(1);
      file_size = sizeInMB > '0.0' ? `${sizeInMB} MB` : `${(file.size / 1024).toFixed(0)} KB`;
    }

    await pool.query(
      'UPDATE materi SET judul = ?, deskripsi = ?, kategori = ?, file_url = ?, file_type = ?, file_size = ?, is_verified = ?, status = ? WHERE id = ?',
      [judul, deskripsi, kategori, file_url, file_type, file_size, is_verified, status, id]
    );

    return NextResponse.json({ message: 'Materi updated successfully' });
  } catch (error) {
    console.error('Update error:', error);
    return NextResponse.json({ error: 'Failed to update materi' }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const id = (await params).id;
    // Get file url before deleting record
    const [rows] = await pool.query('SELECT file_url FROM materi WHERE id = ?', [id]);
    const materi = (rows as any[])[0];

    if (!materi) {
      return NextResponse.json({ error: 'Materi not found' }, { status: 404 });
    }

    // Delete file
    if (materi.file_url) {
      const filePath = path.join(process.cwd(), 'public', materi.file_url);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }

    // Delete record
    await pool.query('DELETE FROM materi WHERE id = ?', [id]);

    return NextResponse.json({ message: 'Materi deleted successfully' });
  } catch (error) {
    console.error('Delete error:', error);
    return NextResponse.json({ error: 'Failed to delete materi' }, { status: 500 });
  }
}
