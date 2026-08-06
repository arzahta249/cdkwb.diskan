import { redirect } from 'next/navigation';

export default function ArtikelCreateRedirectPage() {
  redirect('/dashboard/articles/create');
}
