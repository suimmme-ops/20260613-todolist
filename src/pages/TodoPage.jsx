import { signOut } from 'firebase/auth'
import { auth } from '../firebase/config'
import { useAuth } from '../contexts/AuthContext'
import { useTodos } from '../hooks/useTodos'
import TodoForm from '../components/TodoForm'
import TodoItem from '../components/TodoItem'

export default function TodoPage() {
  const { currentUser, userRole } = useAuth()
  const { todos, loading, addTodo, updateTodo, deleteTodo } = useTodos()

  return (
    <div>
      <header>
        <h2>할 일 목록</h2>
        <span>
          {currentUser.email} ({userRole === 'teacher' ? '교사' : '학생'})
        </span>
        <button onClick={() => signOut(auth)}>로그아웃</button>
      </header>

      <TodoForm onAdd={addTodo} />

      {loading ? (
        <p>불러오는 중...</p>
      ) : todos.length === 0 ? (
        <p>할 일이 없습니다.</p>
      ) : (
        <ul>
          {todos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onUpdate={updateTodo}
              onDelete={deleteTodo}
            />
          ))}
        </ul>
      )}
    </div>
  )
}
