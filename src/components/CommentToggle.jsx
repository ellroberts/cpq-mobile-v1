import React from 'react';
import { useCommentMode } from './useCommentMode';

export default function CommentToggle() {
  const { commentMode, setCommentMode } = useCommentMode();

  return (
    <button
      onClick={() => setCommentMode(!commentMode)}
      style={{
        position: 'fixed',
        bottom: '16px',
        right: '16px',
        backgroundColor: commentMode ? '#e63946' : '#457b9d',
        color: 'white',
        border: 'none',
        borderRadius: '20px',
        padding: '10px 16px',
        fontSize: '14px',
        cursor: 'pointer',
        zIndex: 1000,
        boxShadow: '0 2px 6px rgba(0,0,0,0.2)'
      }}
    >
      {commentMode ? 'Comment Mode: ON' : 'Comment Mode: OFF'}
    </button>
  );
}
