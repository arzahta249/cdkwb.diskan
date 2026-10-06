// File ini sebelumnya digunakan untuk koneksi MySQL (HeidiSQL).
// Sesuai permintaan, koneksi SQL telah dihapus untuk persiapan migrasi ke Firebase.

export const pool = {
  query: async (...args: any[]) => {
    console.warn("Peringatan: Perintah SQL (pool.query) dipanggil, namun koneksi MySQL telah dilepas.", args);
    // Mengembalikan array kosong sementara agar aplikasi tidak langsung crash (500 error)
    // Semua file yang memanggil 'pool.query' harus segera diubah menggunakan Firebase (lib/firebase.ts).
    return [[]]; 
  }
};
