import React from 'react';

export default function RootLoading() {
  return (
    <div className="container" style={{ padding: '32px 20px', maxWidth: '1200px' }}>
      {/* Skeleton Header */}
      <div style={{ marginBottom: '28px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <div
          style={{
            height: '16px',
            width: '180px',
            borderRadius: '6px',
            background: 'var(--surface-raised)',
            animation: 'pulse 1.5s infinite ease-in-out'
          }}
        />
        <div
          style={{
            height: '36px',
            width: '320px',
            borderRadius: '8px',
            background: 'var(--surface-raised)',
            animation: 'pulse 1.5s infinite ease-in-out'
          }}
        />
        <div
          style={{
            height: '18px',
            width: '460px',
            maxWidth: '100%',
            borderRadius: '6px',
            background: 'var(--surface-raised)',
            animation: 'pulse 1.5s infinite ease-in-out'
          }}
        />
      </div>

      {/* Skeleton Rows */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            style={{
              padding: '18px 20px',
              borderRadius: 'var(--radius)',
              background: 'var(--surface)',
              border: '1px solid var(--border)',
              display: 'flex',
              flexDirection: 'column',
              gap: '10px'
            }}
          >
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
              <div
                style={{
                  height: '14px',
                  width: '40px',
                  borderRadius: '4px',
                  background: 'var(--surface-raised)',
                  animation: 'pulse 1.5s infinite ease-in-out'
                }}
              />
              <div
                style={{
                  height: '14px',
                  width: '60px',
                  borderRadius: '4px',
                  background: 'var(--surface-raised)',
                  animation: 'pulse 1.5s infinite ease-in-out'
                }}
              />
            </div>
            <div
              style={{
                height: '20px',
                width: `${75 + (i % 3) * 8}%`,
                borderRadius: '6px',
                background: 'var(--surface-raised)',
                animation: 'pulse 1.5s infinite ease-in-out'
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
