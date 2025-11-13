import { useState } from 'react'
import { useRouter } from 'next/router'
import { auth } from '../../lib/firebase'
import { signInWithEmailAndPassword } from 'firebase/auth'

export default function AdminLogin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await signInWithEmailAndPassword(auth, email, password)
      router.push('/admin')
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <div className="max-w-md mx-auto p-6 mt-20 bg-white rounded-xl shadow">
      <h1 className="text-2xl font-bold mb-4">Admin Login</h1>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input className="w-full border px-3 py-2 rounded" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
        <input type="password" className="w-full border px-3 py-2 rounded" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
        {error && <div className="text-sm text-red-600">{error}</div>}
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-purple-600 text-white rounded">Login</button>
        </div>
      </form>
      <p className="text-xs text-gray-500 mt-4">Create an admin user from Firebase Console (Auth) or add an admin doc in Firestore collection <code>admins</code>.</p>
    </div>
  )
}