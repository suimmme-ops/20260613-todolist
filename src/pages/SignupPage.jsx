import { useState } from 'react'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { doc, setDoc } from 'firebase/firestore'
import { auth, db } from '../firebase/config'
import { useNavigate, Link } from 'react-router-dom'

const ROLES = [
  {
    key: 'student',
    label: '학생',
    icon: '🎓',
    gradient: 'linear-gradient(135deg, #34d399, #059669)',
    shadow: 'rgba(52,199,89,0.3)',
    btnGradient: 'linear-gradient(135deg, #6ee7b7, #34d399)',
  },
  {
    key: 'teacher',
    label: '교사',
    icon: '📚',
    gradient: 'linear-gradient(135deg, #a78bfa, #818cf8)',
    shadow: 'rgba(139,92,246,0.3)',
    btnGradient: 'linear-gradient(135deg, #a78bfa, #818cf8)',
  },
]

function getErrorMessage(code) {
  switch (code) {
    case 'auth/email-already-in-use': return '이미 사용 중인 이메일입니다.'
    case 'auth/weak-password': return '비밀번호는 6자 이상이어야 합니다.'
    case 'auth/invalid-email': return '올바른 이메일 형식이 아닙니다.'
    case 'auth/operation-not-allowed': return 'Firebase 콘솔에서 이메일/비밀번호 로그인을 활성화해 주세요.'
    case 'auth/network-request-failed': return '네트워크 연결을 확인해 주세요.'
    default: return `회원가입에 실패했습니다. (${code})`
  }
}

export default function SignupPage() {
  const [role, setRole] = useState('student')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const current = ROLES.find((r) => r.key === role)

  async function handleSignup(e) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const { user } = await createUserWithEmailAndPassword(auth, email, password)
      await setDoc(doc(db, 'users', user.uid), { email: user.email, role })
      navigate('/ethics')
    } catch (err) {
      console.error(err)
      setError(getErrorMessage(err.code))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-page">
      <div
        className="auth-logo"
        style={{ background: current.gradient, boxShadow: `0 8px 28px ${current.shadow}` }}
      >
        {current.icon}
      </div>
      <h1 className="auth-title">{current.label} 회원가입</h1>
      <p className="auth-subtitle">새 계정을 만드세요</p>

      <div className="segment-control">
        {ROLES.map((r) => (
          <button
            key={r.key}
            type="button"
            className={`segment-btn${role === r.key ? ' active' : ''}`}
            style={role === r.key ? { background: current.gradient, color: '#fff' } : {}}
            onClick={() => { setRole(r.key); setError('') }}
          >
            {r.icon} {r.label}
          </button>
        ))}
      </div>

      <form
        onSubmit={handleSignup}
        style={{ width: '100%', maxWidth: 360, display: 'flex', flexDirection: 'column', alignItems: 'center' }}
      >
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
          disabled={loading}
          style={{
            background: current.btnGradient,
            boxShadow: `0 6px 24px ${current.shadow}`,
          }}
        >
          {loading ? '처리 중...' : `${current.label} 회원가입`}
        </button>
      </form>

      <p className="auth-footer">
        이미 계정이 있으신가요? <Link to="/login">로그인</Link>
      </p>
    </div>
  )
}
