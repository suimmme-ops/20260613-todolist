import { Navigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

export default function EthicsRoute({ children }) {
  const { currentUser } = useAuth()
  if (!currentUser) return <Navigate to="/login" replace />
  if (sessionStorage.getItem('ethicsAccepted') !== 'true') return <Navigate to="/ethics" replace />
  return children
}
