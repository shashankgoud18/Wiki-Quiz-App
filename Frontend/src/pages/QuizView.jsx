import { useEffect, useState } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import LoadingSpinner from '../components/LoadingSpinner'
import { getQuiz } from '../lib/api'

function QuizView() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [quiz, setQuiz] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let active = true
    const load = async () => {
      try {
        const data = await getQuiz(id)
        if (active) setQuiz(data)
      } catch (err) {
        setError(err.message || 'Failed to load quiz')
      } finally {
        if (active) setLoading(false)
      }
    }
    load()
    return () => {
      active = false
    }
  }, [id])

  if (loading) return <LoadingSpinner />
  if (error) return <div className="p-4 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm">{error}</div>
  if (!quiz) return null

  return (
    <section className="space-y-8">
      <div className="flex flex-col gap-3">
        <p className="text-sm text-gray-500">Quiz #{quiz.id}</p>
        <h1 className="text-3xl font-bold text-gray-900">{quiz.title}</h1>
        <p className="text-gray-700 max-w-3xl leading-relaxed">{quiz.summary}</p>
        <div className="flex flex-wrap gap-3 text-sm">
          <button
            onClick={() => navigate(`/quiz/${quiz.id}/take`)}
            className="px-4 py-2 rounded-lg bg-gray-900 hover:bg-gray-800 text-white font-semibold"
          >
            Take quiz
          </button>
          <Link to="/history" className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50">History</Link>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="p-4 rounded-xl border border-gray-200 bg-white">
          <div className="text-sm font-semibold text-gray-900 mb-2">Key entities</div>
          <div className="space-y-2 text-sm text-gray-700">
            <div><span className="text-slate-400">People:</span> {quiz.key_entities?.people?.join(', ') || '—'}</div>
            <div><span className="text-slate-400">Locations:</span> {quiz.key_entities?.locations?.join(', ') || '—'}</div>
            <div><span className="text-slate-400">Organizations:</span> {quiz.key_entities?.organizations?.join(', ') || '—'}</div>
          </div>
        </div>
        <div className="p-4 rounded-xl border border-gray-200 bg-white">
          <div className="text-sm font-semibold text-gray-900 mb-2">Sections</div>
          <div className="flex flex-wrap gap-2 text-xs text-gray-700">
            {quiz.sections?.length ? quiz.sections.map((s) => (
              <span key={s} className="px-3 py-1 rounded-full bg-gray-100 border border-gray-200">{s}</span>
            )) : <span className="text-slate-400">—</span>}
          </div>
        </div>
        <div className="p-4 rounded-xl border border-gray-200 bg-white">
          <div className="text-sm font-semibold text-gray-900 mb-2">Related topics</div>
          <div className="flex flex-wrap gap-2 text-xs text-gray-700">
            {quiz.related_topics?.length ? quiz.related_topics.map((t) => (
              <span key={t} className="px-3 py-1 rounded-full bg-gray-100 border border-gray-200">{t}</span>
            )) : <span className="text-slate-400">—</span>}
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="text-xl font-semibold text-gray-900">Questions</div>
        <div className="grid gap-4">
          {quiz.quiz?.map((q, idx) => (
            <div key={q.id || idx} className="p-4 rounded-xl border border-gray-200 bg-white space-y-3 hover:shadow-sm transition">
              <div className="flex items-center justify-between gap-3">
                <div className="text-gray-900 font-semibold">{idx + 1}. {q.question}</div>
                <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-700 border border-gray-200">{q.difficulty || '—'}</span>
              </div>
              <div className="grid gap-2">
                {q.options?.map((opt, i) => (
                  <div
                    key={opt}
                    className={`px-3 py-2 rounded-lg border text-sm ${q.correct_index === i ? 'border-emerald-300 bg-emerald-50 text-emerald-800' : 'border-gray-200 bg-white text-gray-700'}`}
                  >
                    {opt}
                  </div>
                ))}
              </div>
              <div className="text-xs text-emerald-700">Answer: {q.answer}</div>
              {q.explanation && <div className="text-xs text-gray-600">Explanation: {q.explanation}</div>}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default QuizView
