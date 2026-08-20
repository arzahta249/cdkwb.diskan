/**
 * WhatsApp Gateway Utility Module
 * Supports integration with generic WhatsApp Gateways (e.g., Fonnte, Wablas, Whacenter, Twilio).
 * 
 * Environment variables:
 * - WA_GATEWAY_TOKEN: API token for the gateway service
 * - WA_GATEWAY_URL: Endpoint URL (defaults to Fonnte https://api.fonnte.com/send)
 * - ADMIN_WA_NUMBER: Default WhatsApp destination number for admin notifications
 */

interface SendWAMessageParams {
  to: string;
  message: string;
}

export async function sendWhatsAppMessage({ to, message }: SendWAMessageParams): Promise<boolean> {
  const token = process.env.WA_GATEWAY_TOKEN;
  const gatewayUrl = process.env.WA_GATEWAY_URL || 'https://api.fonnte.com/send';

  if (!to) {
    console.warn('[WhatsApp Service] No recipient phone number provided.');
    return false;
  }

  // Format phone number to international standard without + or leading zero (e.g. 0812 -> 62812)
  let cleanNumber = to.replace(/[^0-9]/g, '');
  if (cleanNumber.startsWith('0')) {
    cleanNumber = '62' + cleanNumber.slice(1);
  }

  if (!token) {
    console.info(`[WhatsApp Service - Simulation Mode] Token missing. Would send to ${cleanNumber}:\n${message}`);
    return false;
  }

  try {
    const response = await fetch(gatewayUrl, {
      method: 'POST',
      headers: {
        'Authorization': token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        target: cleanNumber,
        message: message,
      }),
    });

    const data = await response.json();
    console.log('[WhatsApp Service] Message dispatched:', data);
    return response.ok;
  } catch (err) {
    console.error('[WhatsApp Service] Failed to dispatch WA message:', err);
    return false;
  }
}

/**
 * Send confirmation notification to citizen upon complaint submission
 */
export async function sendCitizenConfirmation({
  nomor_tiket,
  nama_pelapor,
  telepon_pelapor,
}: {
  nomor_tiket: string;
  nama_pelapor: string;
  telepon_pelapor: string;
}) {
  if (!telepon_pelapor) return;

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://cdkwb.diskan.jatengprov.go.id';
  const trackingLink = `${siteUrl}/pengaduan?ticket=${encodeURIComponent(nomor_tiket)}`;

  const message = 
`📌 *KONFIRMASI PENGADUAN DISKAN CDK WILAYAH BARAT*

Yth. ${nama_pelapor || 'Pelapor'},

Terima kasih. Pengaduan Anda telah berhasil diterima oleh sistem kami.

🎫 *Nomor Tiket:* ${nomor_tiket}
 status: *PENDING (Menunggu Verifikasi)*

Anda dapat memantau perkembangan penanganan pengaduan secara real-time melalui tautan berikut:
${trackingLink}

_Pesan ini dikirimkan secara otomatis oleh sistem Pengaduan CDK Wilayah Barat Dinas Kelautan & Perikanan Jawa Tengah._`;

  return sendWhatsAppMessage({ to: telepon_pelapor, message });
}

/**
 * Send new complaint alert to Admin / Duty Officers
 */
export async function sendAdminNewAlert({
  nomor_tiket,
  nama_pelapor,
  kategori,
  lokasi,
  deskripsi,
  telepon_pelapor,
}: {
  nomor_tiket: string;
  nama_pelapor: string;
  kategori: string;
  lokasi: string;
  deskripsi: string;
  telepon_pelapor: string;
}) {
  const adminNumbers = process.env.ADMIN_WA_NUMBER || process.env.HOTLINE_WA_NUMBER;

  if (!adminNumbers) {
    console.info('[WhatsApp Service] ADMIN_WA_NUMBER not set in environment.');
    return;
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://cdkwb.diskan.jatengprov.go.id';
  const dashboardLink = `${siteUrl}/dashboard/aduan`;

  const shortDeskripsi = deskripsi.length > 150 ? deskripsi.slice(0, 147) + '...' : deskripsi;

  const message = 
`🚨 *PENGADUAN BARU MASUK!*

Telah diterima pengaduan masyarakat baru pada portal CDK Wilayah Barat.

🎫 *Nomor Tiket:* ${nomor_tiket}
👤 *Pelapor:* ${nama_pelapor || 'Anonim'} (${telepon_pelapor || 'Tanpa No. Telp'})
📁 *Kategori:* ${kategori}
📍 *Lokasi:* ${lokasi}
📝 *Deskripsi:*
"${shortDeskripsi}"

Silakan buka dashboard admin untuk memproses pengaduan:
${dashboardLink}`;

  // If multiple admin numbers are defined (comma separated)
  const numberList = adminNumbers.split(',').map(n => n.trim()).filter(Boolean);

  for (const num of numberList) {
    await sendWhatsAppMessage({ to: num, message });
  }
}

/**
 * Send status update notification to citizen
 */
export async function sendCitizenStatusUpdate({
  nomor_tiket,
  nama_pelapor,
  telepon_pelapor,
  status,
  tindakan,
}: {
  nomor_tiket: string;
  nama_pelapor: string;
  telepon_pelapor: string;
  status: string;
  tindakan?: string;
}) {
  if (!telepon_pelapor) return;

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://cdkwb.diskan.jatengprov.go.id';
  const trackingLink = `${siteUrl}/pengaduan?ticket=${encodeURIComponent(nomor_tiket)}`;

  let statusLabel = status;
  if (status === 'PROSES') statusLabel = 'SEDANG DIPROSES / DITANGANI ⚙️';
  else if (status === 'SELESAI') statusLabel = 'SELESAI / DITINDAKLANJUTI ✅';
  else if (status === 'DITOLAK') statusLabel = 'DITOLAK / TIDAK DAPAT DIPROSES ❌';

  let message = 
`🔔 *UPDATE STATUS PENGADUAN*

Yth. ${nama_pelapor || 'Pelapor'},

Pengaduan Anda dengan nomor tiket *${nomor_tiket}* telah diperbarui.

📊 *Status Terbaru:* ${statusLabel}`;

  if (tindakan) {
    message += `\n📝 *Tindakan Petugas:* ${tindakan}`;
  }

  message += `\n\nDetail lengkap dapat dilihat di:
${trackingLink}

_Terima kasih atas peran aktif Anda dalam menjaga kelestarian & tata kelola wilayah pesisir Jawa Tengah._`;

  return sendWhatsAppMessage({ to: telepon_pelapor, message });
}
