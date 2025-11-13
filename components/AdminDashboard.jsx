import { useState, useEffect } from 'react'
import { storage, db } from '../lib/firebase'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { collection, addDoc, query, getDocs, orderBy } from 'firebase/firestore'

export default function AdminDashboard() {
  const [name, setName] = useState('')
  const [price, setPrice] = useState('0.00')
  const [file, setFile] = useState(null)
  const [loading, setLoading] = useState(false)
  const [products, setProducts] = useState([])

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    const q = query(collection(db, 'products'), orderBy('createdAt', 'desc'))
    const snap = await getDocs(q)
    const items = snap.docs.map(d => ({ id: d.id, ...d.data() }))
    setProducts(items)
  }

  const handleUpload = async (e) => {
    e.preventDefault()
    if (!file || !name) return alert('الرجاء تعبئة الاسم واختيار ملف.')
    setLoading(true)
    try {
      const filename = `${Date.now()}_${file.name}`
      const storageRef = ref(storage, `products/${filename}`)
      await uploadBytes(storageRef, file)
      const url = await getDownloadURL(storageRef)

      await addDoc(collection(db, 'products'), {
        name,
        price: parseFloat(price),
        fileUrl: url,
        fileName: filename,
        createdAt: Date.now(),
      })

      setName('')
      setPrice('0.00')
      setFile(null)
      fetchProducts()
      alert('تم رفع المنتج بنجاح.')
    } catch (err) {
      console.error(err)
      alert('حدث خطأ أثناء الرفع.')
    }
    setLoading(false)
  }

  return (
    <div>
      <section className="mb-6">
        <h2 className="text-lg font-semibold mb-3">Upload Sticker Pack</h2>
        <form onSubmit={handleUpload} className="space-y-3 bg-white p-4 rounded shadow">
          <input value={name} onChange={e => setName(e.target.value)} className="w-full border px-3 py-2 rounded" placeholder="Product name" />
          <input value={price} onChange={e => setPrice(e.target.value)} className="w-full border px-3 py-2 rounded" placeholder="Price (e.g. 5.00)" />
          <input type="file" onChange={e => setFile(e.target.files[0])} className="w-full" />
          <div className="flex gap-2">
            <button className="px-4 py-2 bg-purple-600 text-white rounded" disabled={loading}>{loading ? 'Uploading...' : 'Upload'}</button>
          </div>
        </form>
      </section>

      <section>
        <h2 className="text-lg font-semibold mb-3">Products</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {products.map(p => (
            <div key={p.id} className="bg-white p-3 rounded shadow">
              <div className="font-medium">{p.name}</div>
              <div className="text-sm text-gray-500">{p.fileName}</div>
              <div className="mt-2"><a className="text-purple-600 underline" href={p.fileUrl} target="_blank" rel="noreferrer">Download file</a></div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}