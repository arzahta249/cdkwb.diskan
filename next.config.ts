import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ['firebase-admin'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'storage.googleapis.com',
      },
      {
        protocol: 'https',
        hostname: 'firebasestorage.googleapis.com',
      },
      {
        protocol: 'https',
        hostname: '*.firebasestorage.app',
      },
      {
        protocol: 'https',
        hostname: 'ik.imagekit.io',
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/konservasi/karang-jeruk',
        destination: '/konservasi/kawasan/karang-jeruk',
        permanent: true,
      },
      {
        source: '/konservasi/ujungnegoro',
        destination: '/konservasi/kawasan/ujungnegoro',
        permanent: true,
      },
      {
        source: '/konservasi',
        destination: '/konservasi/kawasan/karang-jeruk',
        permanent: false,
      },
      {
        source: '/konservasi/kawasan',
        destination: '/konservasi/kawasan/karang-jeruk',
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
