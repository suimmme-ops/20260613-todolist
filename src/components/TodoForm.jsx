import { useState } from 'react'

export default function TodoForm({ onAdd }) {
  const [text, setText] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    if (!text.trim()) return
    onAdd(text.trim())
    setText('')
  }

  return (
    <form className="todo-form" onSubmit={handleSubmit}>
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="새로운 할 일 추가..."
      />
      <button type="submit" className="btn-add" aria-label="추가">
        +
      </button>
    </form>
  )
}
