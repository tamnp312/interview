'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { WifiOff, RefreshCw, CheckCircle2, Bookmark, CheckSquare, Layers, Home } from 'lucide-react';

export default function OfflinePage() {
  const [isOnline, setIsOnline] = useState(false);

  useEffect(() => {
    setIsOnline(navigator.onLine);

    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const handleRetry = () => {
    window.location.reload();
  };

  return (
    <div className="container" style={{ padding: '60px 20px 100px', maxWidth: '800px', textAlign: 'center' }}>
      {/* Icon & Badge */}
      <div
        style={{
          width: '84px',
          height: '84px',
          borderRadius: '50%',
          background: 'var(--amber-bg)',
          color: 'var(--amber-solid)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 24px',
          border: '1px solid rgba(245, 158, 11, 0.25)',
          boxShadow: '0 0 30px rgba(245, 158, 11, 0.2)'
        }}
      >
        <WifiOff size={40} />
      </div>

      <span
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '6px',
          padding: '4px 12px',
          borderRadius: 'var(--radius-full)',
          background: isOnline ? 'var(--emerald-bg)' : 'var(--amber-bg)',
          color: isOnline ? 'var(--emerald-solid)' : 'var(--amber-solid)',
          border: '1px solid var(--border)',
          fontSize: '0.82rem',
          fontWeight: 600,
          marginBottom: '16px'
        }}
      >
        {isOnline ? '🟢 Đã có kết nối mạng trở lại!' : '🟡 Chế độ Ngoại Tuyến (Offline Mode)'}
      </span>

      <h1
        style={{
          fontFamily: 'var(--font-heading)',
          fontSize: '2rem',
          fontWeight: 800,
          color: 'var(--ink)',
          marginBottom: '12px'
        }}
      >
        Bạn Đang Không Có Kết Nối Mạng
      </h1>

      <p
        style={{
          color: 'var(--ink-secondary)',
          fontSize: '1rem',
          maxWidth: '540px',
          margin: '0 auto 32px',
          lineHeight: 1.6
        }}
      >
        Trang này chưa được lưu sẵn vào bộ nhớ đệm. Nhưng đừng lo! Bạn vẫn có thể luyện tập các tính năng 
        <strong style={{ color: 'var(--ink)', margin: '0 4px' }}>hoạt động 100% không cần mạng</strong> dưới đây:
      </p>

      {/* Offline Available Features Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '16px',
          marginBottom: '36px',
          textAlign: 'left'
        }}
      >
        {/* Quiz Offline */}
        <Link
          href="/quiz"
          style={{
            padding: '20px',
            borderRadius: 'var(--radius-lg)',
            background: 'var(--surface)',
            border: '1px solid var(--border)',
            textDecoration: 'none',
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
            transition: 'transform 0.15s ease, border-color 0.15s ease'
          }}
          className="offline-feature-card"
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '10px',
                background: 'var(--indigo-subtle)',
                color: 'var(--accent)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <CheckSquare size={20} />
            </div>
            <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--emerald-solid)', background: 'var(--emerald-bg)', padding: '2px 8px', borderRadius: '4px' }}>
              ✓ Sẵn sàng
            </span>
          </div>
          <div>
            <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--ink)', marginBottom: '4px' }}>
              Trắc Nghiệm Quiz
            </h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--ink-secondary)', lineHeight: 1.4 }}>
              Hơn 100+ câu hỏi trắc nghiệm IT được lưu trực tiếp trên thiết bị của bạn.
            </p>
          </div>
        </Link>

        {/* Bookmarks */}
        <Link
          href="/bookmarks"
          style={{
            padding: '20px',
            borderRadius: 'var(--radius-lg)',
            background: 'var(--surface)',
            border: '1px solid var(--border)',
            textDecoration: 'none',
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
            transition: 'transform 0.15s ease, border-color 0.15s ease'
          }}
          className="offline-feature-card"
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '10px',
                background: 'var(--amber-bg)',
                color: 'var(--amber-solid)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <Bookmark size={20} />
            </div>
            <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--emerald-solid)', background: 'var(--emerald-bg)', padding: '2px 8px', borderRadius: '4px' }}>
              ✓ Sẵn sàng
            </span>
          </div>
          <div>
            <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--ink)', marginBottom: '4px' }}>
              Câu Hỏi Đã Lưu
            </h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--ink-secondary)', lineHeight: 1.4 }}>
              Xem lại danh sách câu hỏi phỏng vấn bạn đã bookmark vào bộ nhớ máy.
            </p>
          </div>
        </Link>

        {/* Home */}
        <Link
          href="/"
          style={{
            padding: '20px',
            borderRadius: 'var(--radius-lg)',
            background: 'var(--surface)',
            border: '1px solid var(--border)',
            textDecoration: 'none',
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
            transition: 'transform 0.15s ease, border-color 0.15s ease'
          }}
          className="offline-feature-card"
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '10px',
                background: 'var(--surface-raised)',
                color: 'var(--ink)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <Home size={20} />
            </div>
            <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--emerald-solid)', background: 'var(--emerald-bg)', padding: '2px 8px', borderRadius: '4px' }}>
              ✓ Đã cache
            </span>
          </div>
          <div>
            <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--ink)', marginBottom: '4px' }}>
              Trang Chủ
            </h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--ink-secondary)', lineHeight: 1.4 }}>
              Quay về trang chủ đã được lưu trữ sẵn trong bộ nhớ đệm trình duyệt.
            </p>
          </div>
        </Link>
      </div>

      {/* Retry Button */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '12px' }}>
        <button
          onClick={handleRetry}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '12px 24px',
            borderRadius: 'var(--radius)',
            background: 'var(--accent-solid)',
            color: '#fff',
            border: 'none',
            fontSize: '0.95rem',
            fontWeight: 600,
            cursor: 'pointer'
          }}
        >
          <RefreshCw size={16} /> Thử tải lại kết nối
        </button>
      </div>
    </div>
  );
}
