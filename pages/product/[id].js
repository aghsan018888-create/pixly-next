import { useRouter } from 'next/router'

export default function ProductPage() {
  const { query } = useRouter()
  const id = query.id

  const handleCheckout = async () => {
    const res = await fetch('/api/checkout_sessions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        priceId: 'price_test_123',
        successUrl: window.location.origin + '/success',
        cancelUrl: window.location.href,
      }),
    })
    const data = await res.json()
    if (data.url) window.location = data.url
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold">Sticker Pack #{id}</h1>
      <p className="mt-4 text-gray-600">
        Premium sticker pack compatible with Canva, Figma, and more.
      </p>
      <div className="mt-6 flex gap-4">
        <button
          onClick={handleCheckout}
          className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
        >
          Buy Now
        </button>
      </div>
    </div>
  )
}