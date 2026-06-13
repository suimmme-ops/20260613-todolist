import { useState } from 'react'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../firebase/config'
import { useNavigate, Link } from 'react-router-dom'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  async function handleLogin(e) {
    e.preventDefault()
    setError('')
    try {
      await signInWithEmailAndPassword(auth, email, password)
      navigate('/todos')
    } catch {
      setError('이메일 또는 비밀번호가 올바르지 않습니다.')
    }
  }

  return (
    <div>
      <h2>로그인</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="이메일"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit">로그인</button>
      </form>
      <p>
        학생이신가요? <Link to="/signup">회원가입</Link>
      </p>
    </div>
  )
}
