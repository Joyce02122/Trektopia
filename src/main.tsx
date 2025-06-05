import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

console.log('Starting application...')

const rootElement = document.getElementById('root')

if (!rootElement) {
  console.error('Root element not found!')
  throw new Error('Failed to find the root element')
}

console.log('Root element found:', rootElement)

const root = createRoot(rootElement)

try {
  console.log('Attempting to render App component...')
  root.render(
  <StrictMode>
    <App />
  </StrictMode>,
)
  console.log('App rendered successfully')
} catch (error) {
  console.error('Error rendering app:', error)
  // 在頁面上顯示錯誤信息
  root.render(
    <div style={{ padding: '20px', color: 'red' }}>
      <h1>Error Loading Application</h1>
      <pre>{error instanceof Error ? error.message : String(error)}</pre>
    </div>
  )
}
