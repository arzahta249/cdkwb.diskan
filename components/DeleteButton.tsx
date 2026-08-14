"use client";

import { Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { showConfirm, showError, showSuccess } from '@/lib/swal';

interface DeleteButtonProps {
  endpoint: string;
  id: string | number;
  type?: string;
}

export default function DeleteButton({ endpoint, id, type = 'data' }: DeleteButtonProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    const isConfirmed = await showConfirm(
      'Hapus Data?',
      `Apakah Anda yakin ingin menghapus ${type} ini? Tindakan ini tidak dapat dibatalkan.`,
      'Ya, Hapus Data',
      true
    );
    
    if (!isConfirmed) return;
    
    setIsDeleting(true);
    try {
      const res = await fetch(`${endpoint}?id=${id}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        await showSuccess('Berhasil', `Data ${type} berhasil dihapus.`);
        router.refresh();
      } else {
        showError('Gagal', `Gagal menghapus ${type}`);
      }
    } catch (error) {
      console.error(error);
      showError('Error', 'Terjadi kesalahan pada server');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <button 
      onClick={handleDelete}
      disabled={isDeleting}
      className="text-rose-400 hover:text-rose-300 transition-colors text-sm font-medium disabled:opacity-50 flex items-center justify-center p-2 rounded-lg hover:bg-rose-500/10"
      title="Hapus"
    >
      <Trash2 className="w-4 h-4" />
    </button>
  );
}
