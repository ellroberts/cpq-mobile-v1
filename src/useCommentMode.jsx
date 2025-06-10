import { createContext, useContext, useState } from 'react';

const CommentModeContext = createContext();

export function CommentModeProvider({ children }) {
  const [commentMode, setCommentMode] = useState(true);
  return (
    <CommentModeContext.Provider value={{ commentMode, setCommentMode }}>
      {children}
    </CommentModeContext.Provider>
  );
}

export function useCommentMode() {
  return useContext(CommentModeContext);
}
