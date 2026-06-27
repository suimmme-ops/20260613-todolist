import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const GUIDELINES = [
  {
    id: 1,
    category: '활용 목적',
    values: ['주도성', '합목적성'],
    title: "생성형 AI를 쓰기 전, '왜' 쓰는지 말할 수 있어야 해요.",
    body: "생성형 AI를 사용하기 전에 '지금 내가 왜 쓰려고 하지?'라고 스스로 물어보세요. 생성형 AI는 내 생각을 대신해주는 게 아니라, 내 생각을 도와주는 도구임을 기억하세요. 모든 공부에 생성형 AI가 필요한 것은 아니므로, 지금 하는 활동에 생성형 AI를 사용하는 것이 나의 학습에 정말 도움이 될지 먼저 고민해요.",
  },
  {
    id: 2,
    category: '주도적 학습',
    values: ['주도성'],
    title: '생성형 AI에게 물어보기 전, 내 생각을 먼저 말해요.',
    body: '막막할 때 바로 생성형 AI에게 묻고 싶은 마음이 들 수 있지만, 먼저 스스로 시도해 보아야 나의 성장에 도움이 돼요. 주제에 대해 내가 아는 것과 내 아이디어를 먼저 공책에 적거나 정리한 뒤에 생성형 AI를 활용하세요.',
  },
  {
    id: 3,
    category: '비판적 검증',
    values: ['주도성'],
    title: '생성형 AI가 틀릴 수 있다는 점을 알아요.',
    body: "생성형 AI는 틀린 정보를 마치 사실인 것처럼 제시하기도 하므로, 알려준 내용은 항상 '정말 맞을까?' 하고 한 번 더 확인하는 습관을 가져요. 중요한 내용일수록 책을 찾아보거나 선생님께 여쭤보는 등 다른 방법으로도 꼭 다시 확인하세요.",
  },
  {
    id: 4,
    category: '사고의 확장',
    values: ['주도성', '합목적성'],
    title: '생성형 AI와 함께 상상하며 내 생각을 더 크게 키워요.',
    body: '생성형 AI를 내 생각의 범위를 넓혀주는 도구로 사용해보세요. 생성형 AI의 결과물을 그대로 사용하지 않고, 나의 경험과 생각을 더하여 나만의 색깔을 담은 최종 결과물을 만들어요.',
  },
  {
    id: 5,
    category: '안전과 관계',
    values: ['안전성'],
    title: '나의 정보와 비밀을 말하지 않아요.',
    body: '내가 입력한 정보는 어디에서 어떻게 사용될지 모르기 때문에 이름, 주소, 학교, 전화번호 같은 개인정보는 생성형 AI에게 알려주면 안돼요. 생성형 AI는 계산된 답변을 내놓는 프로그램이라 감정이 없어요. 나의 고민을 털어놓으며 지나치게 의지하기보다, 친구나 부모님, 선생님과의 실제 대화를 통해 마음을 나누어요.',
  },
  {
    id: 6,
    category: '투명성·윤리',
    values: ['투명성'],
    title: '생성형 AI의 도움을 받았다면 숨기지 않고 정직하게 이야기해요.',
    body: '어느 부분이 생성형 AI의 것이고 어느 부분이 나의 것인지 명확하게 밝히는 것은 나 자신을 속이지 않는 정직한 태도예요. 생성형 AI를 쓴 사실을 정직하게 밝힐 때 나의 노력이 더 빛나고 가치 있게 인정받을 수 있어요.',
  },
]

const VALUE_STYLES = {
  주도성:   { bg: 'rgba(249,115,22,0.13)', color: '#c2410c', border: 'rgba(249,115,22,0.35)' },
  합목적성: { bg: 'rgba(34,197,94,0.13)',  color: '#15803d', border: 'rgba(34,197,94,0.35)'  },
  안전성:   { bg: 'rgba(59,130,246,0.13)', color: '#1d4ed8', border: 'rgba(59,130,246,0.35)' },
  투명성:   { bg: 'rgba(20,184,166,0.13)', color: '#0f766e', border: 'rgba(20,184,166,0.35)' },
}

export default function EthicsGatePage() {
  const navigate = useNavigate()
  const [canProceed, setCanProceed] = useState(false)
  const bottomRef = useRef(null)

  useEffect(() => {
    if (sessionStorage.getItem('ethicsAccepted') === 'true') {
      navigate('/todos', { replace: true })
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setCanProceed(true)
          observer.disconnect()
        }
      },
      { threshold: 0.7 }
    )

    const el = bottomRef.current
    if (el) observer.observe(el)
    return () => observer.disconnect()
  }, [navigate])

  function handleAccept() {
    sessionStorage.setItem('ethicsAccepted', 'true')
    navigate('/todos')
  }

  return (
    <div className="ethics-page">
      <div className="ethics-header">
        <div className="ethics-header-icon">🤖</div>
        <h1 className="ethics-title">AI 윤리 핵심 가이드</h1>
        <p className="ethics-subtitle">
          생성형 AI를 올바르게 사용하기 위한 6가지 핵심 가이드를 읽고 실천해요.
        </p>
      </div>

      <div className="ethics-body">
        <div className="ethics-table-header">
          <span className="ethics-th-value">핵심 가치</span>
          <span className="ethics-th-guide">핵심 가이드</span>
        </div>

        <div className="ethics-list">
          {GUIDELINES.map((g) => (
            <div key={g.id} className="ethics-card">
              <div className="ethics-card-values">
                {g.values.map((v) => (
                  <span
                    key={v}
                    className="ethics-value-badge"
                    style={{
                      background: VALUE_STYLES[v].bg,
                      color: VALUE_STYLES[v].color,
                      border: `1px solid ${VALUE_STYLES[v].border}`,
                    }}
                  >
                    {v}
                  </span>
                ))}
              </div>
              <div className="ethics-card-content">
                <div className="ethics-card-meta">
                  <span className="ethics-guide-num">가이드 {g.id}</span>
                  <span className="ethics-guide-category">{g.category}</span>
                </div>
                <p className="ethics-card-title">{g.title}</p>
                <p className="ethics-card-body">{g.body}</p>
              </div>
            </div>
          ))}
        </div>

        <div ref={bottomRef} className="ethics-bottom">
          {!canProceed && (
            <p className="ethics-scroll-hint">
              ↓ 가이드를 모두 읽은 후 버튼이 활성화됩니다
            </p>
          )}
          <button
            className={`ethics-accept-btn${canProceed ? ' active' : ''}`}
            onClick={handleAccept}
            disabled={!canProceed}
          >
            나는 윤리 핵심가이드를 빠짐없이 읽고 이를 실천하겠습니다.
          </button>
        </div>
      </div>
    </div>
  )
}
