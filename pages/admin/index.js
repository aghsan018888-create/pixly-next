import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { auth, db } from '../../lib/firebase'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import AdminDashboard from '../../components/AdminDashboard'
import { doc, getDoc } from 'firebase/firestore'

export default function AdminPage() {
  const router = useRouter()
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [isAdmin, setIsAdmin] = useState(false)

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (u) => {
      setLoading(true)
      if (!u) {
        setUser(null)
        setLoading(false)
        router.push('/admin/login')
        return
      }
      setUser(u)
      // check admins collection by uid
      try {
        const adminDoc = await getDoc(doc(db, 'admins', u.uid))
        if (adminDoc.exists()) setIsAdmin(true)
        else {
          // fallback: check by email in admins collection (document id = email)
          const adminDocByEmail = await getDoc(doc(db, 'admins', u.email))
          if (adminDocByEmail.exists()) setIsAdmin(true)
        }
      } catch (err) {
        console.error(err)
      }
      setLoading(false)
    })

    return () => unsub()
  }, [router])

  const handleLogout = async () => {
    await signOut(auth)
    router.push('/admin/login')
  }

  if (loading) return <div className="p-6">Loading...</div>
  if (!isAdmin) return <div className="p-6">You are not authorized.</div>

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <div className="flex gap-3 items-center">
          <div className="text-sm text-gray-600">{user?.email}</div>
          <button onClick={handleLogout} className="px-3 py-2 bg-gray-100 rounded">Logout</button>
        </div>
      </div>
      <AdminDashboard />
    </div>
  )
}