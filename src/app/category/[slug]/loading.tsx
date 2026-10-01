import React from 'react';

export default function CategoryLoading() {
  return (
    <div className="cat-page-container">
      {/* Header Skeleton */}
      <div className="cat-page-header">
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '12px' }}>
          <div
            style={{
              height: '14px',
              width: '90px',
              borderRadius: '4px',
              background: 'var(--surface-raised)',
              animation: 'pulse 1.5s infinite ease-in-out'
            }}
          />
          <span style={{ color: 'var(--ink-muted)', opacity: 0.4 }}>/</span>
          <div
            style={{
              height: '14px',
              width: '70px',
              borderRadius: '4px',
              background: 'var(--surface-raised)',
              animation: 'pulse 1.5s infinite ease-in-out'
            }}
          />
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div
              style={{
                height: '32px',
                width: '240px',
                borderRadius: '8px',
                background: 'var(--surface-raised)',
                animation: 'pulse 1.5s infinite ease-in-out',
                marginBottom: '8px'
              }}
            />
            <div
              style={{
                height: '16px',
                width: '380px',
                maxWidth: '100%',
                borderRadius: '4px',
                background: 'var(--surface-raised)',
                animation: 'pulse 1.5s infinite ease-in-out'
              }}
            />
          </div>
        </div>
      </div>

      {/* Main Layout Skeleton */}
      <div className="cat-layout">
        {/* Sidebar Nav Skeleton */}
        <aside
          style={{
            width: '250px',
            flexShrink: 0,
            display: 'flex',
            flexDirection: 'column',
            gap: '12px'
          }}
          className="sidebar-skeleton"
        >
          <div
            style={{
              height: '36px',
              width: '100%',
              borderRadius: 'var(--radius)',
              background: 'var(--surface-raised)',
              animation: 'pulse 1.5s infinite ease-in-out'
            }}
          />
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              style={{
                height: '32px',
                width: '100%',
                borderRadius: 'var(--radius-sm)',
                background: 'var(--surface)',
                border: '1px solid var(--border)',
                animation: 'pulse 1.5s infinite ease-in-out'
              }}
            />
          ))}
        </aside>

        {/* Question List Skeleton */}
        <div className="cat-main-content">
          <div
            style={{
              height: '52px',
              borderRadius: 'var(--radius)',
              background: 'var(--surface)',
              border: '1px solid var(--border)',
              marginBottom: '16px',
              animation: 'pulse 1.5s infinite ease-in-out'
            }}
          />

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {[...Array(7)].map((_, i) => (
              <div
                key={i}
                style={{
                  height: '76px',
                  borderRadius: 'var(--radius)',
                  background: 'var(--surface)',
                  border: '1px solid var(--border)',
                  padding: '16px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px'
                }}
              >
                <div style={{ display: 'flex', gap: '8px' }}>
                  <div
                    style={{
                      height: '14px',
                      width: '36px',
                      borderRadius: '4px',
                      background: 'var(--surface-raised)',
                      animation: 'pulse 1.5s infinite ease-in-out'
                    }}
                  />
                  <div
                    style={{
                      height: '14px',
                      width: '64px',
                      borderRadius: '4px',
                      background: 'var(--surface-raised)',
                      animation: 'pulse 1.5s infinite ease-in-out'
                    }}
                  />
                </div>
                <div
                  style={{
                    height: '18px',
                    width: `${70 + (i % 4) * 7}%`,
                    borderRadius: '4px',
                    background: 'var(--surface-raised)',
                    animation: 'pulse 1.5s infinite ease-in-out'
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
