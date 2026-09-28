import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import MainPage from './pages/mainPage'
import InviteRoute from './pages/inviteRoute'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/invite/:inviteId" element={<InviteRoute />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
