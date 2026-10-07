/**
 * Parses API responses defensively. Next.js may return an HTML error document
 * when a route fails before its handler runs, which must not be passed to
 * JSON.parse() as it hides the useful HTTP status from the user.
 */
export async function readApiResponse(response: Response) {
  const body = await response.text();
  const contentType = response.headers.get('content-type') || '';

  if (!contentType.includes('application/json')) {
    const message = response.status === 401
      ? 'Sesi login telah berakhir. Silakan masuk kembali.'
      : `Server mengembalikan respons tidak valid (HTTP ${response.status}). Silakan coba lagi.`;
    throw new Error(message);
  }

  try {
    return JSON.parse(body);
  } catch {
    throw new Error(`Respons JSON dari server tidak valid (HTTP ${response.status}).`);
  }
}
