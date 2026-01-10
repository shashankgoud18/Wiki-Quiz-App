import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import LoadingSpinner from '../components/LoadingSpinner'
import { getQuiz, submitQuiz } from '../lib/api'

function TakeQuiz() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [quiz, setQuiz] = useState(null)
  const [answers, setAnswers] = useState([]) // store option indices
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [currentQuestion, setCurrentQuestion] = useState(0)

  useEffect(() => {
    let active = true
    const load = async () => {
      try {
        const data = await getQuiz(id)
        if (active) {
          setQuiz(data)
          setAnswers(new Array(data.quiz?.length || 0).fill(null))
        }
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

  const updateAnswer = (qIdx, optionIdx) => {
    setAnswers((prev) => prev.map((v, i) => (i === qIdx ? optionIdx : v)))
  }

  const handleSubmit = async () => {
    if (!quiz) return
    setSubmitting(true)
    setError('')
    try {
      // Convert answers to the format expected by API (option indices)
      const payload = answers.map((a) => (a == null ? 0 : a))
      const res = await submitQuiz(quiz.id, payload)
      // Navigate to results page with results data
      navigate(`/quiz/${id}/results`, { state: { results: { ...res, answers: payload } } })
    } catch (err) {
      setError(err.message || 'Failed to submit answers')
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) return <LoadingSpinner />
  if (error && !quiz) return (
    <div className="p-4 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm">
      {error}
    </div>
  )
  if (!quiz) return null

  const totalQuestions = quiz.quiz?.length || 0
  const answeredCount = answers.filter(a => a !== null).length
  const progress = (answeredCount / totalQuestions) * 100

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <span>Quiz #{quiz.id}</span>
          <span>•</span>
          <span>{totalQuestions} questions</span>
        </div>
        <h1 className="text-4xl font-bold text-gray-900">{quiz.title}</h1>
        {quiz.summary && (
          <p className="text-lg text-gray-700">{quiz.summary}</p>
        )}
      </div>

      {/* Progress Bar */}
      <div className="relative">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-semibold text-gray-900">
            Progress: {answeredCount} / {totalQuestions}
          </span>
          <span className="text-sm text-gray-500">
            {Math.round(progress)}% complete
          </span>
        </div>
        <div className="h-2 bg-gray-100 rounded-full overflow-hidden border border-gray-200">
          <div className="h-full bg-gray-900 transition-all duration-500 ease-out" style={{ width: `${progress}%` }}></div>
        </div>
      </div>

      {/* Questions */}
      <div className="space-y-6">
        {quiz.quiz?.map((q, idx) => {
          const isAnswered = answers[idx] !== null
          const getDifficultyColor = (diff) => {
            switch(diff?.toLowerCase()) {
              case 'easy': return 'bg-green-500/20 text-green-300 border-green-500/30'
              case 'medium': return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30'
              case 'hard': return 'bg-red-500/20 text-red-300 border-red-500/30'
              default: return 'bg-slate-500/20 text-slate-300 border-slate-500/30'
            }
          }

          return (
            <div 
              key={q.id || idx} 
              className={`relative p-6 rounded-2xl border bg-white transition shadow-sm ${
                isAnswered ? 'border-gray-900/20' : 'border-gray-200'
              }`}
            >
              {/* Question Header */}
              <div className="flex items-start gap-4 mb-5">
                <div className={`shrink-0 w-10 h-10 rounded-xl flex items-center justify-center font-bold text-lg border ${
                  isAnswered ? 'bg-gray-100 text-gray-900 border-gray-300' : 'bg-gray-50 text-gray-500 border-gray-200'
                }`}>
                  {idx + 1}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`text-xs font-semibold px-2 py-1 rounded-full border ${getDifficultyColor(q.difficulty)}`}>
                      {q.difficulty || 'Medium'}
                    </span>
                    {isAnswered && (
                      <span className="text-xs font-semibold px-2 py-1 rounded-full bg-gray-100 text-gray-700 border border-gray-200">✓ Answered</span>
                    )}
                  </div>
                  <p className="text-lg font-semibold text-gray-900 leading-relaxed">
                    {q.question}
                  </p>
                </div>
              </div>

              {/* Options */}
              <div className="grid gap-3 ml-14">
                {q.options?.map((opt, optIdx) => {
                  const isSelected = answers[idx] === optIdx
                  const optionLabel = String.fromCharCode(65 + optIdx) // A, B, C, D
                  
                  return (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => updateAnswer(idx, optIdx)}
                      className={`group relative text-left px-5 py-4 rounded-xl border transition ${
                        isSelected ? 'border-gray-900 bg-gray-50' : 'border-gray-200 bg-white hover:bg-gray-50'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`shrink-0 w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm transition ${
                          isSelected ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-600 group-hover:bg-gray-200'
                        }`}>
                          {optionLabel}
                        </div>
                        <span className={`flex-1 transition-colors ${
                          isSelected ? 'text-gray-900 font-medium' : 'text-gray-700'
                        }`}>
                          {opt}
                        </span>
                        {isSelected && (
                          <svg className="w-5 h-5 text-gray-900" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        )}
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>

      {/* Submit Section */}
      <div className="sticky bottom-8 p-6 rounded-2xl border border-gray-200 bg-white/95 backdrop-blur shadow-lg">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="font-semibold text-gray-900">Ready to submit?</p>
            <p className="text-sm text-gray-600">
              {answeredCount === totalQuestions 
                ? 'All questions answered!'
                : `${totalQuestions - answeredCount} questions remaining`
              }
            </p>
          </div>
          <button
            onClick={handleSubmit}
            disabled={submitting}
            className="px-8 py-4 rounded-xl bg-gray-900 hover:bg-gray-800 text-white font-semibold shadow-sm transition disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {submitting ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Submitting...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                Submit Answers
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </span>
            )}
          </button>
        </div>

        {error && (
          <div className="mt-4 flex items-start gap-2 p-3 rounded-lg bg-red-50 border border-red-200">
            <svg className="w-5 h-5 text-red-600 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-sm text-red-700">{error}</span>
          </div>
        )}
      </div>
    </div>
  )
}

export default TakeQuiz
