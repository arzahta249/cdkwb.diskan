import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
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
