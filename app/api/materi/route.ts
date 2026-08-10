import { NextResponse } from 'next/server';
import { pool } from '@/lib/db';
import fs from 'fs';
import path from 'path';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    
    let query = 'SELECT * FROM materi';
    let params: any[] = [];

    if (category && category !== 'Semua') {
      query += ' WHERE kategori = ?';
      params.push(category);
    }
    
    query += ' ORDER BY tanggal DESC';

    const [rows] = await pool.query(query, params);
    return NextResponse.json(rows);
  } catch (error) {
    console.error('Database Error:', error);
    return NextResponse.json({ error: 'Failed to fetch materi' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const judul = formData.get('judul') as string;
    const deskripsi = formData.get('deskripsi') as string;
    const kategori = formData.get('kategori') as string;
    const file = formData.get('file') as File;
    const is_verified = formData.get('is_verified') === 'true' ? 1 : 0;
    const status = formData.get('status') as string || 'published';

    if (!file) {
      return NextResponse.json({ error: 'File is required' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Create unique filename
    const fileExtension = path.extname(file.name);
    const originalName = path.basename(file.name, fileExtension).replace(/[^a-zA-Z0-9]/g, '_');
    const fileName = `${Date.now()}-${originalName}${fileExtension}`;
    
    // Ensure directory exists
    const uploadDir = path.join(process.cwd(), 'public/upload/materi');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    const filepath = path.join(uploadDir, fileName);
    await fs.promises.writeFile(filepath, buffer);

    const file_url = `/upload/materi/${fileName}`;
    const file_type = fileExtension.replace('.', '').toUpperCase();
    
    // Convert size to readable format (e.g., "2.1 MB")
    const sizeInMB = (file.size / (1024 * 1024)).toFixed(1);
    const file_size = sizeInMB > '0.0' ? `${sizeInMB} MB` : `${(file.size / 1024).toFixed(0)} KB`;

    const [result] = await pool.query(
      'INSERT INTO materi (judul, deskripsi, kategori, file_url, file_type, file_size, is_verified, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [judul, deskripsi, kategori, file_url, file_type, file_size, is_verified, status]
    );

    return NextResponse.json({ 
      message: 'Materi uploaded successfully',
      id: (result as any).insertId
    });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json({ error: 'Failed to upload materi' }, { status: 500 });
  }
}
