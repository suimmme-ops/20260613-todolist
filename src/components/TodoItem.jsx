import { useState } from 'react'

export default function TodoItem({ todo, onUpdate, onDelete }) {
  const [editing, setEditing] = useState(false)
  const [text, setText] = useState(todo.text)

  function handleSave() {
    if (text.trim()) onUpdate(todo.id, { text: text.trim() })
    setEditing(false)
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter') handleSave()
    if (e.key === 'Escape') { setText(todo.text); setEditing(false) }
  }

  return (
    <li className="todo-item">
      <input
        type="checkbox"
        className="todo-checkbox"
        checked={todo.done}
        onChange={(e) => onUpdate(todo.id, { done: e.target.checked })}
      />

      {editing ? (
        <input
          className="todo-edit-input"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onBlur={handleSave}
          onKeyDown={handleKeyDown}
          autoFocus
        />
      ) : (
        <span className={`todo-text${todo.done ? ' done' : ''}`}>
          {todo.text}
        </span>
      )}

      <div className="todo-actions">
        {!todo.done && (
          <button
            className="btn-icon edit"
            onClick={() => editing ? handleSave() : setEditing(true)}
            aria-label="수정"
          >
            {editing ? '저장' : '✏'}
          </button>
        )}
        <button
          className="btn-icon delete"
          onClick={() => onDelete(todo.id)}
          aria-label="삭제"
        >
          🗑
        </button>
      </div>
    </li>
  )
}
