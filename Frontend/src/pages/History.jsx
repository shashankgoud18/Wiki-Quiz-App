import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import LoadingSpinner from '../components/LoadingSpinner'
import { getHistory, deleteQuiz } from '../lib/api'

function History() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [deleting, setDeleting] = useState(null)

  useEffect(() => {
    let active = true
    const load = async () => {
      try {
        const data = await getHistory()
        if (active) setItems(data)
      } catch (err) {
        setError(err.message || 'Failed to load history')
      } finally {
        if (active) setLoading(false)
      }
    }
    load()
    return () => {
      active = false
    }
  }, [])

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this quiz?')) return
    
    setDeleting(id)
    try {
      await deleteQuiz(id)
      setItems(items.filter(q => q.id !== id))
    } catch (err) {
      alert(err.message || 'Failed to delete quiz')
    } finally {
      setDeleting(null)
    }
  }

  if (loading) return <LoadingSpinner />
  if (error) return <div className="p-4 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm">{error}</div>

  return (
    <section className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-gray-900">History</h1>
        <p className="text-gray-600">All previously generated quizzes.</p>
      </div>
      {items.length === 0 ? (
        <div className="p-4 rounded-lg border border-gray-200 bg-gray-50 text-gray-600">No quizzes yet. Generate one to see it here.</div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {items.map((q) => (
            <div key={q.id} className="p-4 rounded-xl border border-gray-200 bg-white space-y-3 hover:shadow-sm hover:-translate-y-0.5 transition">
              <div className="text-lg font-semibold text-gray-900">{q.title}</div>
              <p className="text-sm text-gray-600 line-clamp-2">{q.summary}</p>
              <div className="flex items-center justify-between text-xs">
                <span className="text-gray-500">{new Date(q.created_at).toLocaleDateString()}</span>
                <div className="flex items-center gap-2">
                  <Link 
                    to={`/quiz/${q.id}`} 
                    className="px-3 py-1.5 rounded-md bg-gray-900 hover:bg-gray-800 text-white font-medium transition"
                  >
                    View
                  </Link>
                  <button
                    onClick={() => handleDelete(q.id)}
                    disabled={deleting === q.id}
                    className="px-3 py-1.5 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-50 font-medium transition disabled:opacity-50"
                  >
                    {deleting === q.id ? 'Deleting...' : 'Delete'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  )
}

export default History
