import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Luyện Phỏng Vấn IT — 4450+ Câu hỏi',
    short_name: 'LuyệnPhỏngVấn',
    description: 'Học và ôn tập 4450+ câu hỏi phỏng vấn IT mọi lúc mọi nơi kể cả khi không có mạng.',
    start_url: '/',
    id: '/',
    display: 'standalone',
    background_color: '#090a10',
    theme_color: '#6366f1',
    orientation: 'portrait-primary',
    icons: [
      {
        src: '/icon-192.svg',
        sizes: '192x192',
        type: 'image/svg+xml',
        purpose: 'any'
      },
      {
        src: '/icon-512.svg',
        sizes: '512x512',
        type: 'image/svg+xml',
        purpose: 'maskable'
      }
    ],
    categories: ['education', 'developer', 'productivity']
  };
}
