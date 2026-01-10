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
  if (error) return <div className="p-4 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-100 text-sm">{error}</div>

  return (
    <section className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-white">History</h1>
        <p className="text-slate-300">All previously generated quizzes.</p>
      </div>
      {items.length === 0 ? (
        <div className="p-4 rounded-lg border border-white/10 bg-white/5 text-slate-300">No quizzes yet. Generate one to see it here.</div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {items.map((q) => (
            <div key={q.id} className="p-4 rounded-xl border border-white/10 bg-white/5 space-y-3 hover:border-white/20 transition group">
              <div className="text-lg font-semibold text-white">{q.title}</div>
              <p className="text-sm text-slate-300 line-clamp-2">{q.summary}</p>
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400">{new Date(q.created_at).toLocaleDateString()}</span>
                <div className="flex items-center gap-2">
                  <Link 
                    to={`/quiz/${q.id}`} 
                    className="px-3 py-1.5 rounded-md bg-blue-500/10 hover:bg-blue-500/20 text-blue-300 hover:text-blue-200 font-semibold transition"
                  >
                    View
                  </Link>
                  <button
                    onClick={() => handleDelete(q.id)}
                    disabled={deleting === q.id}
                    className="px-3 py-1.5 rounded-md bg-red-500/10 hover:bg-red-500/20 text-red-300 hover:text-red-200 font-semibold transition disabled:opacity-50"
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
