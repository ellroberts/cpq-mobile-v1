import { useEffect, useState } from 'react';
import { supabase } from './supabase';

export function useComments() {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchComments();
  }, []);

  async function fetchComments() {
    const { data, error } = await supabase.from('commenting').select('*');
    if (error) {
      console.error('Error fetching comments:', error);
    } else {
      setComments(data || []);
    }
    setLoading(false);
  }

  async function addComment(comment) {
    const fullComment = {
      id: comment.id,
      x: comment.x,
      y: comment.y,
      text: comment.text,
      created_at: comment.created_at || new Date().toISOString(),
      author: comment.author,
    };
    const { data, error } = await supabase.from('commenting').insert([fullComment]).select();
    if (error) {
      console.error('Error adding comment:', error);
    } else if (data && data.length > 0) {
      setComments((prev) => [...prev, { ...fullComment, id: data[0].id }]);
    } else {
      console.warn('Insert succeeded, but no comment data returned.');
    }
  }

  async function deleteComment(id) {
    const { error } = await supabase.from('commenting').delete().eq('id', id);
    if (error) {
      console.error('Error deleting comment:', error);
    } else {
      setComments((prev) => prev.filter((c) => c.id !== id));
    }
  }

  async function updateComment(id, fields) {
    const { error } = await supabase.from('commenting').update(fields).eq('id', id);
    if (error) {
      console.error('Error updating comment:', error);
    } else {
      setComments((prev) =>
        prev.map((c) => (c.id === id ? { ...c, ...fields } : c))
      );
    }
  }

  return {
    comments,
    loading,
    addComment,
    deleteComment,
    updateComment,
  };
}
