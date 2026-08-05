import { NextResponse } from 'next/server';
import { pool } from '@/lib/db';
import { uploadFile } from '@/lib/upload';

// Helper to process FormData for all methods
async function processFormData(request: Request, type: string) {
  const formData = await request.formData();
  const judul = formData.get('judul') as string;
  const tanggal = formData.get('tanggal') as string;
  const kategori = formData.get('kategori') as string;
  const status = 'Aktif';
  const slug = judul ? judul.toLowerCase().replace(/[^a-z0-9]+/g, '-') + '-' + Date.now() : '';
  const deskripsi = formData.get('deskripsi') as string || '';

  // Get Category ID
  const catTableName = `kategory_${type}`;
  const [catRows]: any = await pool.query(`SELECT ID_kategori FROM ${catTableName} WHERE name_kategori = ?`, [kategori]);
  let id_kategory = catRows.length > 0 ? catRows[0].ID_kategori : null;

  return { formData, judul, tanggal, kategori, status, slug, deskripsi, id_kategory };
}

// GET all items for a type
export async function GET(request: Request, context: { params: Promise<{ type: string }> }) {
  const params = await context.params;
  const type = params.type;
  
  if (!['foto', 'video', 'infografis'].includes(type)) {
    return NextResponse.json({ error: 'Invalid type' }, { status: 400 });
  }

  try {
    let query = '';
    if (type === 'foto') {
      query = `SELECT f.*, k.name_kategori as kategori_nama 
               FROM foto f 
               LEFT JOIN kategory_foto k ON f.id_kategory = k.ID_kategori 
               ORDER BY f.tanggal DESC`;
    } else if (type === 'video') {
      query = `SELECT v.*, k.name_kategori as kategori_nama 
               FROM video v 
               LEFT JOIN kategory_video k ON v.id_kategory = k.ID_kategori 
               ORDER BY v.tanggal DESC`;
    } else if (type === 'infografis') {
      query = `SELECT i.*, k.name_kategori as kategori_nama 
               FROM infografis i 
               LEFT JOIN kategory_infografis k ON i.id_kategory = k.ID_kategori 
               ORDER BY i.tanggal DESC`;
    }

    const [rows] = await pool.query(query);
    return NextResponse.json({ data: rows });
  } catch (error: any) {
    console.error(`Error GET galeri ${type}:`, error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// POST new item
export async function POST(request: Request, context: { params: Promise<{ type: string }> }) {
  const params = await context.params;
  const type = params.type;
  
  if (!['foto', 'video', 'infografis'].includes(type)) {
    return NextResponse.json({ error: 'Invalid type' }, { status: 400 });
  }

  try {
    const { formData, judul, tanggal, status, slug, deskripsi, id_kategory } = await processFormData(request, type);

    if (!id_kategory) {
      return NextResponse.json({ error: `Kategori tidak ditemukan di database` }, { status: 400 });
    }

    if (type === 'foto') {
      const file = formData.get('image') as File | null;
      const imageUrl = file ? await uploadFile(file) : null;
      
      // Handle sub photos
      const subPhotoFiles = formData.getAll('sub_photos') as File[];
      const subPhotoUrls = [];
      for (const sp of subPhotoFiles) {
        if (sp && sp.size > 0) {
          const url = await uploadFile(sp);
          if (url) subPhotoUrls.push(url);
        }
      }

      const valueJson = JSON.stringify({ deskripsi, sub_photos: subPhotoUrls });

      await pool.query(
        `INSERT INTO foto (Judul, Slug, URL_image, status, tanggal, id_kategory, value) VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [judul, slug, imageUrl, status, tanggal, id_kategory, valueJson]
      );
    } 
    else if (type === 'video') {
      const thumbFile = formData.get('thumbnail') as File | null;
      const thumbUrl = thumbFile ? await uploadFile(thumbFile) : null;
      
      const durasi = formData.get('durasi') as string;
      const srcType = formData.get('videoSourceType') as string;
      let videoUrl = formData.get('videoUrl') as string;
      
      if (srcType === 'upload') {
        const videoFile = formData.get('videoFile') as File | null;
        if (videoFile && videoFile.size > 0) videoUrl = await uploadFile(videoFile) || '';
      }

      const valueJson = JSON.stringify({ deskripsi });

      await pool.query(
        `INSERT INTO video (Judul, Slug, URL_thumbnail, URL_video, durasi_video, tanggal, id_kategory, value) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [judul, slug, thumbUrl, videoUrl, durasi, tanggal, id_kategory, valueJson]
      );
    }
    else if (type === 'infografis') {
      const thumbFile = formData.get('thumbnail') as File | null;
      const thumbUrl = thumbFile ? await uploadFile(thumbFile) : null;
      
      const pdfFile = formData.get('pdf') as File | null;
      const pdfUrl = pdfFile ? await uploadFile(pdfFile) : null;
      
      await pool.query(
        `INSERT INTO infografis (Judul, Slug, URL_thumbnail, URL_dokumen, tanggal, id_kategory, value) VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [judul, slug, thumbUrl, pdfUrl, tanggal, id_kategory, JSON.stringify({ deskripsi })]
      );
    }

    return NextResponse.json({ message: 'Success' });
  } catch (error: any) {
    console.error(`Error POST galeri ${type}:`, error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// PUT item
export async function PUT(request: Request, context: { params: Promise<{ type: string }> }) {
  const params = await context.params;
  const type = params.type;
  const url = new URL(request.url);
  const id = url.searchParams.get('id');

  if (!id) return NextResponse.json({ error: 'ID is required' }, { status: 400 });

  try {
    const { formData, judul, tanggal, deskripsi, id_kategory } = await processFormData(request, type);
    
    // For simplicity, in PUT we just update text fields and value JSON if provided.
    // Full file replacement in PUT would require checking if files exist and keeping old ones.
    // Here we will just update the text and deskripsi.

    if (type === 'foto') {
      // Fetch existing
      const [existing]: any = await pool.query('SELECT value FROM foto WHERE ID_foto = ?', [id]);
      let valueData = { deskripsi: '', sub_photos: [] };
      if (existing.length > 0 && existing[0].value) {
        try { valueData = JSON.parse(existing[0].value); } catch(e) {}
      }
      valueData.deskripsi = deskripsi;

      await pool.query(
        'UPDATE foto SET Judul = ?, tanggal = ?, id_kategory = ?, value = ? WHERE ID_foto = ?',
        [judul, tanggal, id_kategory, JSON.stringify(valueData), id]
      );
    } 
    else if (type === 'video') {
       const [existing]: any = await pool.query('SELECT value FROM video WHERE ID_video = ?', [id]);
       let valueData = { deskripsi: '' };
       if (existing.length > 0 && existing[0].value) {
         try { valueData = JSON.parse(existing[0].value); } catch(e) {}
       }
       valueData.deskripsi = deskripsi;

       const durasi = formData.get('durasi') as string;
       await pool.query(
        'UPDATE video SET Judul = ?, tanggal = ?, id_kategory = ?, durasi_video = ?, value = ? WHERE ID_video = ?',
        [judul, tanggal, id_kategory, durasi, JSON.stringify(valueData), id]
      );
    }
    else if (type === 'infografis') {
       await pool.query(
        'UPDATE infografis SET Judul = ?, tanggal = ?, id_kategory = ?, value = ? WHERE ID_infografis = ?',
        [judul, tanggal, id_kategory, JSON.stringify({ deskripsi }), id]
      );
    }
    
    return NextResponse.json({ message: 'Updated' });
  } catch(e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

// DELETE item
export async function DELETE(request: Request, context: { params: Promise<{ type: string }> }) {
  const params = await context.params;
  const type = params.type;
  const url = new URL(request.url);
  const id = url.searchParams.get('id');

  if (!id) return NextResponse.json({ error: 'ID is required' }, { status: 400 });

  try {
    if (type === 'foto') await pool.query('DELETE FROM foto WHERE ID_foto = ?', [id]);
    else if (type === 'video') await pool.query('DELETE FROM video WHERE ID_video = ?', [id]);
    else if (type === 'infografis') await pool.query('DELETE FROM infografis WHERE ID_infografis = ?', [id]);
    
    return NextResponse.json({ message: 'Deleted' });
  } catch(e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
