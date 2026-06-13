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
    <div>
      <h2>학생 회원가입</h2>
      <form onSubmit={handleSignup}>
        <input
          type="email"
          placeholder="이메일"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="비밀번호 (6자 이상)"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit">회원가입</button>
      </form>
      <p>
        이미 계정이 있으신가요? <Link to="/login">로그인</Link>
      </p>
    </div>
  )
}
