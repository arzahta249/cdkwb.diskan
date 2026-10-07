const DEFAULT_IMAGEKIT_UPLOAD_API_URL = 'https://upload.imagekit.io/api/v1/files/upload';
const DEFAULT_IMAGEKIT_FILES_API_URL = 'https://api.imagekit.io/v1/files';

type ImageKitUploadResponse = {
  fileId?: unknown;
  filePath?: unknown;
  url?: unknown;
  message?: unknown;
};

function getImageKitConfig() {
  const privateKey = process.env.IMAGEKIT_PRIVATE_KEY?.trim();
  const urlEndpoint = process.env.IMAGEKIT_URL_ENDPOINT?.trim().replace(/\/$/, '');

  if (!privateKey) {
    throw new Error('IMAGEKIT_PRIVATE_KEY belum dikonfigurasi di environment server.');
  }
  if (!urlEndpoint) {
    throw new Error('IMAGEKIT_URL_ENDPOINT belum dikonfigurasi di environment server.');
  }

  return {
    privateKey,
    urlEndpoint,
    uploadApiUrl: process.env.IMAGEKIT_UPLOAD_API_URL?.trim() || DEFAULT_IMAGEKIT_UPLOAD_API_URL,
    filesApiUrl: process.env.IMAGEKIT_FILES_API_URL?.trim() || DEFAULT_IMAGEKIT_FILES_API_URL,
  };
}

function authorizationHeader() {
  return `Basic ${Buffer.from(`${getImageKitConfig().privateKey}:`).toString('base64')}`;
}

function sanitizeFilename(filename: string) {
  const sanitized = filename.replace(/[^a-zA-Z0-9._-]/g, '_');
  return sanitized || 'gambar';
}

export async function uploadImageKitFile(file: File, slug: string) {
  const config = getImageKitConfig();
  const extension = file.name.includes('.') ? file.name.slice(file.name.lastIndexOf('.')) : '';
  const filename = `${slug || 'berita'}-${Date.now()}-${crypto.randomUUID()}${extension}`;
  const formData = new FormData();

  formData.set('file', file, sanitizeFilename(file.name));
  formData.set('fileName', sanitizeFilename(filename));
  formData.set('folder', process.env.IMAGEKIT_FOLDER?.trim() || '/diskan');
  formData.set('useUniqueFileName', 'false');

  const response = await fetch(config.uploadApiUrl, {
    method: 'POST',
    headers: { Authorization: authorizationHeader() },
    body: formData,
  });
  const result = await response.json().catch(() => ({})) as ImageKitUploadResponse;

  const deliveredUrl = typeof result.filePath === 'string'
    ? `${config.urlEndpoint}/${result.filePath.replace(/^\/+/, '')}`
    : result.url;

  if (!response.ok || typeof deliveredUrl !== 'string' || typeof result.fileId !== 'string') {
    const reason = typeof result.message === 'string' ? result.message : `HTTP ${response.status}`;
    throw new Error(`Upload gambar ke ImageKit gagal: ${reason}`);
  }

  return { url: deliveredUrl, fileId: result.fileId };
}

export async function deleteImageKitFile(fileId: string) {
  const { filesApiUrl } = getImageKitConfig();
  const response = await fetch(`${filesApiUrl}/${encodeURIComponent(fileId)}`, {
    method: 'DELETE',
    headers: { Authorization: authorizationHeader() },
  });

  // A missing file is already in the desired state.
  if (!response.ok && response.status !== 404) {
    throw new Error(`Gagal menghapus gambar lama dari ImageKit (HTTP ${response.status}).`);
  }
}
