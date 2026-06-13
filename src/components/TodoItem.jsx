import { useState } from 'react'

export default function TodoItem({ todo, onUpdate, onDelete }) {
  const [editing, setEditing] = useState(false)
  const [text, setText] = useState(todo.text)

  function handleEdit() {
    if (editing && text.trim()) {
      onUpdate(todo.id, { text: text.trim() })
    }
    setEditing(!editing)
  }

  return (
    <li>
      <input
        type="checkbox"
        checked={todo.done}
        onChange={(e) => onUpdate(todo.id, { done: e.target.checked })}
      />
      {editing ? (
        <input value={text} onChange={(e) => setText(e.target.value)} />
      ) : (
        <span style={{ textDecoration: todo.done ? 'line-through' : 'none' }}>
          {todo.text}
        </span>
      )}
      <button onClick={handleEdit}>{editing ? '저장' : '수정'}</button>
      <button onClick={() => onDelete(todo.id)}>삭제</button>
    </li>
  )
}
