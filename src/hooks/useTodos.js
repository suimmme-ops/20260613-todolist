import { useEffect, useState } from 'react'
import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  query,
  where,
  onSnapshot,
  serverTimestamp,
} from 'firebase/firestore'
import { db } from '../firebase/config'
import { useAuth } from '../contexts/AuthContext'

export function useTodos() {
  const { currentUser } = useAuth()
  const [todos, setTodos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!currentUser) return

    // orderBy 제거 → 복합 인덱스 없이 동작, 클라이언트에서 정렬
    const q = query(
      collection(db, 'todos'),
      where('uid', '==', currentUser.uid)
    )

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const list = snapshot.docs
          .map((d) => ({ id: d.id, ...d.data() }))
          .sort((a, b) => (b.createdAt?.seconds ?? 0) - (a.createdAt?.seconds ?? 0))
        setTodos(list)
        setLoading(false)
      },
      (err) => {
        console.error(err)
        setError('데이터를 불러오지 못했습니다. Firestore 규칙을 확인해 주세요.')
        setLoading(false)
      }
    )

    return unsubscribe
  }, [currentUser])

  async function addTodo(text) {
    setError('')
    try {
      await addDoc(collection(db, 'todos'), {
        text,
        done: false,
        uid: currentUser.uid,
        createdAt: serverTimestamp(),
      })
    } catch (err) {
      console.error(err)
      setError('할 일 추가에 실패했습니다. Firestore 규칙을 확인해 주세요.')
    }
  }

  async function updateTodo(id, updates) {
    try {
      await updateDoc(doc(db, 'todos', id), updates)
    } catch (err) {
      console.error(err)
      setError('수정에 실패했습니다.')
    }
  }

  async function deleteTodo(id) {
    try {
      await deleteDoc(doc(db, 'todos', id))
    } catch (err) {
      console.error(err)
      setError('삭제에 실패했습니다.')
    }
  }

  return { todos, loading, error, addTodo, updateTodo, deleteTodo }
}
