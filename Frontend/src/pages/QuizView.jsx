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
  if (error) return <div className="p-4 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-100 text-sm">{error}</div>
  if (!quiz) return null

  return (
    <section className="space-y-8">
      <div className="flex flex-col gap-3">
        <p className="text-sm text-slate-400">Quiz #{quiz.id}</p>
        <h1 className="text-3xl font-bold text-white">{quiz.title}</h1>
        <p className="text-slate-300 max-w-3xl leading-relaxed">{quiz.summary}</p>
        <div className="flex flex-wrap gap-3 text-sm">
          <button
            onClick={() => navigate(`/quiz/${quiz.id}/take`)}
            className="px-4 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-white font-semibold"
          >
            Take quiz
          </button>
          <Link to="/history" className="px-4 py-2 rounded-lg border border-white/10 text-slate-200 hover:bg-white/10">History</Link>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="p-4 rounded-xl border border-white/10 bg-white/5">
          <div className="text-sm font-semibold text-slate-200 mb-2">Key entities</div>
          <div className="space-y-2 text-sm text-slate-300">
            <div><span className="text-slate-400">People:</span> {quiz.key_entities?.people?.join(', ') || '—'}</div>
            <div><span className="text-slate-400">Locations:</span> {quiz.key_entities?.locations?.join(', ') || '—'}</div>
            <div><span className="text-slate-400">Organizations:</span> {quiz.key_entities?.organizations?.join(', ') || '—'}</div>
          </div>
        </div>
        <div className="p-4 rounded-xl border border-white/10 bg-white/5">
          <div className="text-sm font-semibold text-slate-200 mb-2">Sections</div>
          <div className="flex flex-wrap gap-2 text-xs text-slate-300">
            {quiz.sections?.length ? quiz.sections.map((s) => (
              <span key={s} className="px-3 py-1 rounded-full bg-white/10 border border-white/10">{s}</span>
            )) : <span className="text-slate-400">—</span>}
          </div>
        </div>
        <div className="p-4 rounded-xl border border-white/10 bg-white/5">
          <div className="text-sm font-semibold text-slate-200 mb-2">Related topics</div>
          <div className="flex flex-wrap gap-2 text-xs text-slate-300">
            {quiz.related_topics?.length ? quiz.related_topics.map((t) => (
              <span key={t} className="px-3 py-1 rounded-full bg-blue-500/15 border border-blue-500/30 text-blue-100">{t}</span>
            )) : <span className="text-slate-400">—</span>}
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="text-xl font-semibold text-white">Questions</div>
        <div className="grid gap-4">
          {quiz.quiz?.map((q, idx) => (
            <div key={q.id || idx} className="p-4 rounded-xl border border-white/10 bg-white/5 space-y-3">
              <div className="flex items-center justify-between gap-3">
                <div className="text-slate-200 font-semibold">{idx + 1}. {q.question}</div>
                <span className="text-xs px-2 py-1 rounded-full bg-white/10 text-slate-300">{q.difficulty || '—'}</span>
              </div>
              <div className="grid gap-2">
                {q.options?.map((opt, i) => (
                  <div
                    key={opt}
                    className={`px-3 py-2 rounded-lg border text-sm ${q.correct_index === i ? 'border-emerald-400/50 bg-emerald-500/10 text-emerald-100' : 'border-white/10 bg-white/5 text-slate-200'}`}
                  >
                    {opt}
                  </div>
                ))}
              </div>
              <div className="text-xs text-emerald-200">Answer: {q.answer}</div>
              {q.explanation && <div className="text-xs text-slate-300">Explanation: {q.explanation}</div>}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default QuizView
