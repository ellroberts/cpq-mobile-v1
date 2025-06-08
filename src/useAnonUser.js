// src/useAnonUser.js
import { useMemo } from 'react';

export function useAnonUser() {
  return useMemo(() => {
    let id = localStorage.getItem('anon_user_id');
    if (!id) {
      id = crypto.randomUUID();
      localStorage.setItem('anon_user_id', id);
    }
    const avatarUrl = `https://api.dicebear.com/6.x/bottts-neutral/svg?seed=${id.slice(0, 8)}`;
    return { id, avatarUrl };
  }, []);
}
