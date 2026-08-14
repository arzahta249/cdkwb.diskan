import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

// Konfigurasi dasar tema maritim untuk SweetAlert2
const swalConfig = {
  background: '#0F172A',
  color: '#e2e8f0', // slate-200
  customClass: {
    popup: 'border border-cyan-900/50 rounded-2xl shadow-[0_0_40px_rgba(6,182,212,0.15)]',
    title: 'text-xl font-bold text-white',
    htmlContainer: 'text-slate-400 text-sm',
    confirmButton: 'bg-cyan-600 hover:bg-cyan-500 text-white px-5 py-2.5 rounded-lg font-medium transition-colors shadow-lg shadow-cyan-900/20 mx-2',
    cancelButton: 'bg-slate-800 hover:bg-slate-700 text-slate-300 px-5 py-2.5 rounded-lg font-medium transition-colors border border-slate-700 mx-2',
  },
  buttonsStyling: false,
};

export const showSuccess = (title: string, text?: string) => {
  return MySwal.fire({
    ...swalConfig,
    icon: 'success',
    title,
    text,
    iconColor: '#10b981', // emerald-500
    customClass: {
      ...swalConfig.customClass,
      confirmButton: 'bg-emerald-600 hover:bg-emerald-500 text-white px-5 py-2.5 rounded-lg font-medium transition-colors shadow-lg shadow-emerald-900/20 mx-2',
    }
  });
};

export const showError = (title: string, text?: string) => {
  return MySwal.fire({
    ...swalConfig,
    icon: 'error',
    title,
    text,
    iconColor: '#f43f5e', // rose-500
    customClass: {
      ...swalConfig.customClass,
      confirmButton: 'bg-rose-600 hover:bg-rose-500 text-white px-5 py-2.5 rounded-lg font-medium transition-colors shadow-lg shadow-rose-900/20 mx-2',
    }
  });
};

export const showConfirm = async (title: string, text: string, confirmText = 'Ya, Lanjutkan', isDanger = false) => {
  const result = await MySwal.fire({
    ...swalConfig,
    icon: 'warning',
    title,
    text,
    showCancelButton: true,
    confirmButtonText: confirmText,
    cancelButtonText: 'Batal',
    iconColor: isDanger ? '#f43f5e' : '#06b6d4', // rose-500 or cyan-500
    customClass: {
      ...swalConfig.customClass,
      confirmButton: isDanger 
        ? 'bg-rose-600 hover:bg-rose-500 text-white px-5 py-2.5 rounded-lg font-medium transition-colors shadow-lg shadow-rose-900/20 mx-2'
        : swalConfig.customClass.confirmButton,
    }
  });

  return result.isConfirmed;
};
