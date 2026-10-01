/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  outputFileTracingIncludes: {
    '/**': ['./data/**/*'],
  },
  async redirects() {
    return [
      {
        source: '/c/:slug/flashcards',
        destination: '/category/:slug/flashcards',
        permanent: true,
      },
      {
        source: '/c/:slug',
        destination: '/category/:slug',
        permanent: true,
      },
      {
        source: '/q/:slug',
        destination: '/question/:slug',
        permanent: true,
      },
      {
        source: '/flashcards',
        destination: '/category/all/flashcards',
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
