// src/components/CommentOverlay.jsx
import React, { useState, useEffect } from 'react';
import { useComments } from '../useComments';
import { useAnonUser } from '../useAnonUser';
import CommentPopup from './CommentPopup';
import { v4 as uuidv4 } from 'uuid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment } from '@fortawesome/free-regular-svg-icons';

export default function CommentOverlay() {
  const { comments, addComment, deleteComment, updateComment } = useComments();
  const { id: userId } = useAnonUser();

  const [inputPos, setInputPos] = useState(null);
  const [newComment, setNewComment] = useState('');
  const [activeCommentId, setActiveCommentId] = useState(null);
  const [draggingId, setDraggingId] = useState(null);
  const [dragStart, setDragStart] = useState(null);

  const handleOverlayClick = (e) => {
    if (activeCommentId) {
      setActiveCommentId(null);
      return;
    }

    if (e.target.id !== 'comment-overlay') return;
    const rect = e.target.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setInputPos({ x, y });
  };

  const handleSubmit = async () => {
    if (!newComment.trim()) return;
    await addComment({
      id: uuidv4(),
      x: inputPos.x,
      y: inputPos.y,
      text: newComment,
      created_at: new Date().toISOString(),
      authorId: userId,
    });
    setNewComment('');
    setInputPos(null);
  };

  const handleMouseDown = (e, id) => {
    setDragStart({ id, x: e.clientX, y: e.clientY, time: Date.now() });
    setDraggingId(id);
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!draggingId || !dragStart) return;
      const dist = Math.abs(e.clientX - dragStart.x) + Math.abs(e.clientY - dragStart.y);
      if (dist < 4) return;

      const overlayRect = document.getElementById('comment-overlay')?.getBoundingClientRect();
      if (!overlayRect) return;

      const x = e.clientX - overlayRect.left;
      const y = e.clientY - overlayRect.top;

      updateComment(draggingId, { x, y });
    };

    const handleMouseUp = (e) => {
      if (!dragStart) return;
      const dist = Math.abs(e.clientX - dragStart.x) + Math.abs(e.clientY - dragStart.y);
      const time = Date.now() - dragStart.time;

      if (dist < 4 && time < 200) {
        setActiveCommentId(dragStart.id);
      }

      setDraggingId(null);
      setDragStart(null);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [dragStart, draggingId]);

  return (
    <div
      id="comment-overlay"
      onClick={handleOverlayClick}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100vh',
        background: 'transparent',
        zIndex: 9999,
      }}
    >
      {comments.map((c) => (
        <div
          key={c.id}
          onMouseDown={(e) => handleMouseDown(e, c.id)}
          style={{
            position: 'absolute',
            top: c.y,
            left: c.x,
            cursor: 'grab',
            userSelect: 'none',
          }}
        >
          <FontAwesomeIcon
            icon={faComment}
            style={{
              fontSize: '18px',
              color: 'white',
              background: '#A14D94',
              borderRadius: '50%',
              padding: '8px',
              boxShadow: '0 1px 2px rgba(0,0,0,0.1)',
            }}
          />
        </div>
      ))}

      {activeCommentId && (
        <CommentPopup
          comment={comments.find((c) => c.id === activeCommentId)}
          onSave={(text) => {
            const current = comments.find((c) => c.id === activeCommentId);
            updateComment(activeCommentId, { text, authorId: current?.authorId });
          }}
          onDelete={() => deleteComment(activeCommentId)}
          onClose={() => setActiveCommentId(null)}
        />
      )}

      {inputPos && (
        <div
          style={{
            position: 'absolute',
            top: inputPos.y,
            left: inputPos.x,
            background: 'white',
            border: '1px solid #ccc',
            borderRadius: '6px',
            padding: '8px',
            zIndex: 10000,
          }}
        >
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Enter your comment"
            rows={3}
            style={{ width: 200 }}
          />
          <div style={{ marginTop: '6px' }}>
            <button onClick={handleSubmit}>Add</button>
            <button onClick={() => setInputPos(null)} style={{ marginLeft: '8px' }}>
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
