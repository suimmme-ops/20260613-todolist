import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import PrivateRoute from './components/PrivateRoute'
import EthicsRoute from './components/EthicsRoute'
import Footer from './components/Footer'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import EthicsGatePage from './pages/EthicsGatePage'
import TodoPage from './pages/TodoPage'

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route
            path="/ethics"
            element={
              <PrivateRoute>
                <EthicsGatePage />
              </PrivateRoute>
            }
          />
          <Route
            path="/todos"
            element={
              <EthicsRoute>
                <TodoPage />
              </EthicsRoute>
            }
          />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </AuthProvider>
  )
}
