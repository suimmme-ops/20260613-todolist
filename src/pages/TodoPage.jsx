import { signOut } from 'firebase/auth'
import { auth } from '../firebase/config'
import { useAuth } from '../contexts/AuthContext'
import { useTodos } from '../hooks/useTodos'
import TodoForm from '../components/TodoForm'
import TodoItem from '../components/TodoItem'

export default function TodoPage() {
  const { currentUser, userRole } = useAuth()
  const { todos, loading, addTodo, updateTodo, deleteTodo } = useTodos()

  const pending = todos.filter((t) => !t.done)
  const done = todos.filter((t) => t.done)

  return (
    <div className="todo-page">
      <header className="todo-header">
        <div className="todo-header-top">
          <h1>할 일</h1>
          <button className="btn-signout" onClick={() => signOut(auth)}>
            로그아웃
          </button>
        </div>
        <div className="user-badge">
          <span>{currentUser.email}</span>
          <span className="role-chip">
            {userRole === 'teacher' ? '교사' : '학생'}
          </span>
        </div>
      </header>

      <div className="todo-body">
        <TodoForm onAdd={addTodo} />

        {loading ? (
          <div className="loading">
            <div className="spinner" />
          </div>
        ) : (
          <>
            {pending.length > 0 && (
              <section style={{ marginBottom: 24 }}>
                <p className="section-label">진행 중 · {pending.length}</p>
                <ul className="todo-list">
                  {pending.map((todo) => (
                    <TodoItem
                      key={todo.id}
                      todo={todo}
                      onUpdate={updateTodo}
                      onDelete={deleteTodo}
                    />
                  ))}
                </ul>
              </section>
            )}

            {done.length > 0 && (
              <section style={{ marginBottom: 24 }}>
                <p className="section-label">완료 · {done.length}</p>
                <ul className="todo-list">
                  {done.map((todo) => (
                    <TodoItem
                      key={todo.id}
                      todo={todo}
                      onUpdate={updateTodo}
                      onDelete={deleteTodo}
                    />
                  ))}
                </ul>
              </section>
            )}

            {todos.length === 0 && (
              <div className="empty-state">
                <div className="empty-state-icon">📋</div>
                <p>할 일을 추가해보세요</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
