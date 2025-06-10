import React, { useState, useRef } from 'react';
import { useComments } from '../useComments';
import { useAnonUser } from '../useAnonUser';
import { useCommentMode } from '../useCommentMode';
import { v4 as uuidv4 } from 'uuid';
import CommentPopup from './CommentPopup';

export default function CommentOverlay() {
  const { comments, addComment, deleteComment, updateComment } = useComments();
  const { id: author } = useAnonUser();
  const { commentMode } = useCommentMode();

  const [inputPos, setInputPos] = useState(null);
  const [activeComment, setActiveComment] = useState(null);
  const [dragState, setDragState] = useState(null);
  const overlayRef = useRef(null);

  const handleOverlayClick = (e) => {
    if (!commentMode) return;
    if (e.target.id !== 'comment-overlay') return;

    const rect = overlayRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setInputPos({ x, y });
    setActiveComment(null);
  };

  const handleAddComment = async (text) => {
    if (!text.trim()) return;
    await addComment({
      id: uuidv4(),
      x: inputPos.x,
      y: inputPos.y,
      text,
      created_at: new Date().toISOString(),
      author,
    });
    setInputPos(null);
  };

  const handleStartDrag = (e, comment) => {
    if (!commentMode) return;

    e.preventDefault();
    const offsetX = e.clientX - comment.x;
    const offsetY = e.clientY - comment.y;

    setDragState({
      id: comment.id,
      offsetX,
      offsetY,
    });

    const onMouseMove = (moveEvent) => {
      const rect = overlayRef.current.getBoundingClientRect();
      const x = moveEvent.clientX - rect.left - offsetX;
      const y = moveEvent.clientY - rect.top - offsetY;
      setComments((prev) =>
        prev.map((c) =>
          c.id === comment.id ? { ...c, x, y } : c
        )
      );
    };

    const onMouseUp = async (upEvent) => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);

      const rect = overlayRef.current.getBoundingClientRect();
      const finalX = upEvent.clientX - rect.left - offsetX;
      const finalY = upEvent.clientY - rect.top - offsetY;

      await updateComment(comment.id, { x: finalX, y: finalY });
      setDragState(null);
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
  };

  return (
    <div
      id="comment-overlay"
      ref={overlayRef}
      onClick={handleOverlayClick}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        pointerEvents: 'auto',
        zIndex: 99,
      }}
    >
      {comments.map((comment) => (
        <div
          key={comment.id}
          onClick={(e) => {
            e.stopPropagation();
            if (commentMode) setActiveComment(comment);
          }}
          onMouseDown={(e) => handleStartDrag(e, comment)}
          style={{
            position: 'absolute',
            left: comment.x,
            top: comment.y,
            width: 16,
            height: 16,
            borderRadius: '50%',
            background: commentMode ? '#e63946' : '#ccc',
            cursor: commentMode ? 'grab' : 'default',
            zIndex: 100,
            transition: dragState ? 'none' : 'left 0.1s, top 0.1s',
          }}
        />
      ))}

      {inputPos && commentMode && (
        <CommentPopup
          comment={{ x: inputPos.x, y: inputPos.y }}
          onSave={handleAddComment}
          onClose={() => setInputPos(null)}
        />
      )}

      {activeComment && commentMode && (
        <CommentPopup
          comment={activeComment}
          onSave={(text) => updateComment(activeComment.id, { text })}
          onDelete={() => deleteComment(activeComment.id)}
          onClose={() => setActiveComment(null)}
        />
      )}
    </div>
  );
}
