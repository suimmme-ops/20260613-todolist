import { useState } from 'react'
import PolicyModal from './PolicyModal'

export default function Footer() {
  const [open, setOpen] = useState(null)

  return (
    <>
      <footer className="app-footer">
        <div className="footer-links">
          <button className="footer-link" onClick={() => setOpen('terms')}>이용약관</button>
          <span className="footer-sep">|</span>
          <button className="footer-link footer-link--bold" onClick={() => setOpen('privacy')}>
            개인정보처리방침
          </button>
        </div>
        <p className="footer-copy">
          정보관리책임자: 박수임&nbsp;&nbsp;|&nbsp;&nbsp;© 2026 서울은진초등학교
        </p>
      </footer>

      {open && <PolicyModal type={open} onClose={() => setOpen(null)} />}
    </>
  )
}
