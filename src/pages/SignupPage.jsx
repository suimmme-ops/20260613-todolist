import { useState } from 'react'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { doc, setDoc } from 'firebase/firestore'
import { auth, db } from '../firebase/config'
import { useNavigate, Link } from 'react-router-dom'

export default function SignupPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  async function handleSignup(e) {
    e.preventDefault()
    setError('')
    try {
      const { user } = await createUserWithEmailAndPassword(auth, email, password)
      await setDoc(doc(db, 'users', user.uid), {
        email: user.email,
        role: 'student',
      })
      navigate('/todos')
    } catch (err) {
      if (err.code === 'auth/email-already-in-use') {
        setError('이미 사용 중인 이메일입니다.')
      } else if (err.code === 'auth/weak-password') {
        setError('비밀번호는 6자 이상이어야 합니다.')
      } else {
        setError('회원가입에 실패했습니다.')
      }
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-logo" style={{ background: '#34C759', boxShadow: '0 4px 20px rgba(52,199,89,0.35)' }}>
        🎓
      </div>
      <h1 className="auth-title">학생 회원가입</h1>
      <p className="auth-subtitle">새 계정을 만드세요</p>

      <form onSubmit={handleSignup} style={{ width: '100%', maxWidth: 360, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div className="auth-card">
          <div className="auth-field">
            <span className="auth-field-icon">✉</span>
            <input
              type="email"
              placeholder="이메일"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
            />
          </div>
          <div className="auth-field">
            <span className="auth-field-icon">🔒</span>
            <input
              type="password"
              placeholder="비밀번호 (6자 이상)"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="new-password"
            />
          </div>
        </div>

        {error && <p className="auth-error">{error}</p>}

        <button
          type="submit"
          className="btn-primary"
          style={{ background: '#34C759', boxShadow: '0 4px 16px rgba(52,199,89,0.3)' }}
        >
          회원가입
        </button>
      </form>

      <p className="auth-footer">
        이미 계정이 있으신가요? <Link to="/login">로그인</Link>
      </p>
    </div>
  )
}
