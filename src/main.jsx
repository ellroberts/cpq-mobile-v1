import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { PlanProvider } from './context/PlanContext'
import { CommentModeProvider } from './useCommentMode' // ✅ Add this

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <PlanProvider>
      <CommentModeProvider> {/* ✅ Wrap App to provide comment toggle */}
        <App />
      </CommentModeProvider>
    </PlanProvider>
  </React.StrictMode>,
)
