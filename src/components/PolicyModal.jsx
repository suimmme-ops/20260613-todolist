import { useEffect } from 'react'

const CONTENT = {
  terms: {
    title: '이용약관',
    updated: '2026년 6월 27일',
    sections: [
      {
        heading: '제1조 (목적)',
        body: '서울은진초등학교(이하 "기관")가 운영하는 AI 윤리 기반 학습 관리 서비스의 이용 조건과 절차, 이용자의 권리·의무 및 책임 사항을 규정합니다.',
      },
      {
        heading: '제2조 (서비스 내용)',
        bullets: [
          '이메일 기반 회원 인증 (교사 / 학생)',
          '할 일(Todo) 등록·조회·수정·삭제',
          'AI 윤리 핵심 가이드 6가지 제공',
        ],
      },
      {
        heading: '제3조 (AI 윤리 가이드 동의 의무)',
        body: '이용자는 본 활동(할 일 관리)에 접근하기 전, AI 윤리 핵심 가이드 6가지를 확인하고 실천을 서약해야 합니다. 동의는 세션마다 갱신되며, 이용자는 매 접속 시 가이드를 확인할 의무가 있습니다.',
      },
      {
        heading: '제4조 (이용자 의무)',
        bullets: [
          '타인의 계정 정보 도용 또는 공유 금지',
          '이름·주소·전화번호 등 개인정보 및 민감 정보 입력 금지',
          '생성형 AI 결과물을 자신의 것처럼 속이는 행위 금지',
          '서비스 정상 운영을 방해하는 행위(해킹, 과부하 유발 등) 금지',
        ],
      },
      {
        heading: '제5조 (책임의 한계)',
        body: '기관은 천재지변, 시스템 장애 등 불가항력적 사유로 인한 서비스 중단에 책임지지 않습니다. 생성형 AI 출력 결과물의 활용에 대한 책임은 이를 이용한 이용자에게 있습니다.',
      },
      {
        heading: '제6조 (준거법)',
        body: '이 약관의 해석 및 적용에 관하여는 대한민국 법률을 준거법으로 합니다.',
      },
    ],
  },
  privacy: {
    title: '개인정보처리방침',
    updated: '2026년 6월 27일',
    sections: [
      {
        heading: '수집하는 개인정보 항목',
        bullets: [
          '필수: 이메일 주소, 비밀번호(암호화 저장), 이용자 역할(교사/학생)',
          '서비스 이용 시: 할 일 제목, 완료 여부, 등록·수정 일시',
          '※ 이름·주소·전화번호 등 개인 식별 정보는 수집하지 않습니다.',
        ],
      },
      {
        heading: '개인정보 처리 목적',
        bullets: [
          '회원 가입 및 본인 확인',
          '할 일 관리 서비스 제공',
          'AI 윤리 가이드 동의 이력 관리',
        ],
      },
      {
        heading: '개인정보 보유 기간',
        body: '회원 정보 및 할 일 데이터는 회원 탈퇴 시까지 보유합니다. 탈퇴 시 모든 데이터는 즉시 파기됩니다.',
      },
      {
        heading: '개인정보 처리 위탁',
        body: 'Google LLC(Firebase)에 회원 인증 및 데이터 저장 업무를 위탁합니다. Firebase 외 제3자에게는 개인정보를 제공하지 않습니다.',
      },
      {
        heading: '정보주체의 권리',
        body: '이용자는 언제든지 개인정보 열람·정정·삭제·처리 정지를 요청할 수 있습니다. 문의는 아래 보호책임자에게 이메일로 요청 시 지체 없이 처리합니다.',
      },
      {
        heading: '개인정보 보호책임자',
        bullets: [
          '성명: 박수임',
          '직책: 교사',
          '이메일: dpsel7@sen.go.kr',
          '소속: 서울은진초등학교',
        ],
      },
    ],
  },
}

export default function PolicyModal({ type, onClose }) {
  useEffect(() => {
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = prev }
  }, [])

  useEffect(() => {
    function onKey(e) { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [onClose])

  const doc = CONTENT[type]

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">{doc.title}</h2>
          <button className="modal-close-btn" onClick={onClose} aria-label="닫기">✕</button>
        </div>

        <div className="modal-body">
          {doc.sections.map((sec, i) => (
            <div key={i} className="modal-section">
              <h3 className="modal-section-heading">{sec.heading}</h3>
              {sec.body && <p className="modal-section-text">{sec.body}</p>}
              {sec.bullets && (
                <ul className="modal-section-list">
                  {sec.bullets.map((b, j) => <li key={j}>{b}</li>)}
                </ul>
              )}
            </div>
          ))}
        </div>

        <div className="modal-footer">
          <span className="modal-effective">시행일: {doc.updated}</span>
          <button className="modal-confirm-btn" onClick={onClose}>확인</button>
        </div>
      </div>
    </div>
  )
}
