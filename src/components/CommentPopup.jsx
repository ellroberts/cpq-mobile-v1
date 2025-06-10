import React, { useState, useEffect, useRef } from 'react';

export default function CommentPopup({ comment, onSave, onDelete, onClose }) {
  const [text, setText] = useState(comment?.text || '');
  const ref = useRef();
  const isNew = !comment.text;

  useEffect(() => {
    ref.current?.focus();
  }, []);

  useEffect(() => {
    setText(comment?.text || '');
  }, [comment]);

  const handleSave = () => {
    if (text.trim() && text !== (comment.text || '')) {
      onSave(text);
    }
    onClose();
  };

  const handleDelete = () => {
    if (confirm('Are you sure you want to delete this comment?')) {
      onDelete();
      onClose();
    }
  };

  return (
    <div
      style={{
        position: 'absolute',
        top: comment.y + 10,
        left: comment.x + 10,
        background: 'white',
        border: '1px solid #ccc',
        borderRadius: '6px',
        padding: '8px',
        zIndex: 100,
        width: 220,
      }}
    >
      <textarea
        ref={ref}
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={3}
        style={{
          width: '100%',
          resize: 'none',
          fontSize: '14px',
          borderRadius: '4px',
          padding: '6px',
          border: '1px solid #aaa',
        }}
        placeholder={isNew ? "Add a comment..." : "Edit comment..."}
      />
      <div
        style={{
          marginTop: '6px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        {!isNew && (
          <button
            onClick={handleDelete}
            style={{ fontSize: '13px', color: 'red' }}
          >
            Delete
          </button>
        )}
        <div style={{ display: 'flex', gap: '8px', marginLeft: isNew ? 'auto' : 0 }}>
          <button
            onClick={handleSave}
            disabled={text.trim() === (comment.text || '').trim()}
            style={{
              fontSize: '13px',
              fontWeight: 'bold',
              color: text.trim() === (comment.text || '').trim() ? '#999' : 'green',
              cursor: text.trim() === (comment.text || '').trim() ? 'not-allowed' : 'pointer',
              opacity: text.trim() === (comment.text || '').trim() ? 0.5 : 1,
            }}
          >
            {isNew ? 'Add' : 'Edit'}
          </button>
          <button
            onClick={onClose}
            style={{ fontSize: '13px' }}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
