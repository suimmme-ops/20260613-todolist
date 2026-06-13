import { useEffect, useState } from 'react'
import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  query,
  where,
  orderBy,
  onSnapshot,
  serverTimestamp,
} from 'firebase/firestore'
import { db } from '../firebase/config'
import { useAuth } from '../contexts/AuthContext'

export function useTodos() {
  const { currentUser } = useAuth()
  const [todos, setTodos] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!currentUser) return

    const q = query(
      collection(db, 'todos'),
      where('uid', '==', currentUser.uid),
      orderBy('createdAt', 'desc')
    )

    const unsubscribe = onSnapshot(q, (snapshot) => {
      setTodos(snapshot.docs.map((d) => ({ id: d.id, ...d.data() })))
      setLoading(false)
    })

    return unsubscribe
  }, [currentUser])

  async function addTodo(text) {
    await addDoc(collection(db, 'todos'), {
      text,
      done: false,
      uid: currentUser.uid,
      createdAt: serverTimestamp(),
    })
  }

  async function updateTodo(id, updates) {
    await updateDoc(doc(db, 'todos', id), updates)
  }

  async function deleteTodo(id) {
    await deleteDoc(doc(db, 'todos', id))
  }

  return { todos, loading, addTodo, updateTodo, deleteTodo }
}
