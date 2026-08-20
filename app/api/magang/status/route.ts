import { NextResponse } from 'next/server';
import { pool } from '@/lib/db';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const email = searchParams.get('email');

  if (!email) {
    return NextResponse.json({ error: 'Email required' }, { status: 400 });
  }

  try {
    const query = `
      SELECT status 
      FROM pendaftaran_magang 
      WHERE email = ? 
      ORDER BY created_at DESC 
      LIMIT 1
    `;
    
    const [rows]: any = await pool.query(query, [email]);
    
    if (rows.length > 0) {
      return NextResponse.json({ status: rows[0].status }, { status: 200 });
    } else {
      return NextResponse.json({ status: 'not_found' }, { status: 200 });
    }
  } catch (error) {
    console.error('Error checking magang status:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
