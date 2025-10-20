import React from 'react'

export default function Modal({ open, onClose, children }) {
  if (!open) return null
  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 999,
        backdropFilter: 'blur(6px)',
        backgroundColor: 'rgba(0, 0, 0, 0.25)',
        animation: 'fadeIn 0.3s ease',
      }}
    >
      <div
        style={{
          background: 'rgba(255, 255, 255, 0.92)',
          borderRadius: '18px',
          border: '1px solid rgba(255, 255, 255, 0.6)',
          boxShadow: '0 12px 40px rgba(0, 0, 0, 0.15)',
          padding: '35px 30px',
          position: 'relative',
          fontFamily: "'Poppins', sans-serif",
          animation: 'scaleUp 0.35s ease',
          maxWidth: '520px',
          width: '90%',
          boxSizing: 'border-box',
          backdropFilter: 'blur(10px)',
          transformOrigin: 'center',
        }}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '14px',
            right: '14px',
            background: 'transparent',
            border: 'none',
            fontSize: '22px',
            color: '#6b7280',
            cursor: 'pointer',
            transition: '0.2s',
          }}
          onMouseOver={(e) => (e.target.style.color = '#ef4444')}
          onMouseOut={(e) => (e.target.style.color = '#6b7280')}
        >
          ✕
        </button>

        <div style={{ overflow: 'hidden' }}>{children}</div>
      </div>

      {/* Animations */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes scaleUp {
          from {
            transform: scale(0.95);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  )
}
