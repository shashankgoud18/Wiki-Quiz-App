import { useEffect, useState } from 'react'
import { useParams, Link, useNavigate, useLocation } from 'react-router-dom'
import { getQuiz } from '../lib/api'
import LoadingSpinner from '../components/LoadingSpinner'

function Results() {
  const { id } = useParams()
  const navigate = useNavigate()
  const location = useLocation()
  const [quiz, setQuiz] = useState(null)
  const [results, setResults] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadResults = async () => {
      try {
        const data = await getQuiz(id)
        setQuiz(data)

        // Get results from navigation state (answers + optional score)
        const navResults = location.state?.results
        if (navResults) {
          setResults(navResults)
        } else {
          navigate(`/quiz/${id}/take`)
        }
      } catch (error) {
        console.error('Failed to load quiz:', error)
      } finally {
        setLoading(false)
      }
    }
    loadResults()
  }, [id, navigate])

  if (loading) return <LoadingSpinner />
  if (!quiz || !results) return null

  const totalQuestions = (quiz.quiz?.length) || 0
  // Compute correct count locally using submitted indices and quiz.correct_index
  const correctCount = Math.max(0, Math.min(totalQuestions, (results.answers || []).reduce((acc, ansIdx, i) => {
    const q = quiz.quiz?.[i]
    return acc + (q && typeof ansIdx === 'number' && ansIdx === q.correct_index ? 1 : 0)
  }, 0)))
  const percentage = totalQuestions ? Math.round((correctCount / totalQuestions) * 100) : 0
  
  const getScoreColor = () => {
    if (percentage >= 80) return 'text-emerald-400'
    if (percentage >= 60) return 'text-blue-400'
    if (percentage >= 40) return 'text-yellow-400'
    return 'text-red-400'
  }

  const getScoreGradient = () => {
    if (percentage >= 80) return 'from-emerald-500/20 to-emerald-500/5'
    if (percentage >= 60) return 'from-blue-500/20 to-blue-500/5'
    if (percentage >= 40) return 'from-yellow-500/20 to-yellow-500/5'
    return 'from-red-500/20 to-red-500/5'
  }

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      {/* Score Card */}
      <div className={`relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br ${getScoreGradient()} p-8 text-center backdrop-blur`}>
        <div className="relative z-10">
          <h1 className="text-3xl font-bold text-white mb-2">Quiz Completed!</h1>
          <p className="text-slate-300 mb-6">Here's how you performed</p>
          
          <div className={`text-7xl font-bold ${getScoreColor()} mb-4`}>
            {percentage}%
          </div>
          
          <div className="flex justify-center gap-6 text-lg">
            <div className="text-slate-300">
              <span className="font-semibold text-emerald-400">{correctCount}</span> correct
            </div>
            <div className="text-slate-400">•</div>
            <div className="text-slate-300">
              <span className="font-semibold text-red-400">{totalQuestions - correctCount}</span> wrong
            </div>
            <div className="text-slate-400">•</div>
            <div className="text-slate-300">
              <span className="font-semibold text-white">{totalQuestions}</span> total
            </div>
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
      </div>

      {/* Question Results */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-white">Answer Review</h2>
        
        {quiz.quiz?.map((question, idx) => {
          const userAnswerIdx = (results.answers || [])[idx]
          const isCorrect = typeof userAnswerIdx === 'number' && userAnswerIdx === question.correct_index
          
          return (
            <div
              key={idx}
              className={`rounded-xl border p-6 transition-all ${
                isCorrect
                  ? 'border-emerald-500/30 bg-emerald-500/5'
                  : 'border-red-500/30 bg-red-500/5'
              }`}
            >
              {/* Question Header */}
              <div className="flex items-start gap-3 mb-4">
                <div
                  className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center font-bold ${
                    isCorrect
                      ? 'bg-emerald-500/20 text-emerald-400'
                      : 'bg-red-500/20 text-red-400'
                  }`}
                >
                  {isCorrect ? '✓' : '✗'}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-semibold text-slate-400">
                      Question {idx + 1}
                    </span>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${
                      question.difficulty === 'easy' 
                        ? 'bg-green-500/20 text-green-300'
                        : question.difficulty === 'medium'
                        ? 'bg-yellow-500/20 text-yellow-300'
                        : 'bg-red-500/20 text-red-300'
                    }`}>
                      {question.difficulty}
                    </span>
                  </div>
                  <p className="text-lg font-semibold text-white">
                    {question.question}
                  </p>
                </div>
              </div>

              {/* Answers */}
              <div className="space-y-2 mb-4">
                {question.options.map((option, optIdx) => {
                  const isCorrectAnswer = optIdx === question.correct_index
                  const isUserAnswer = optIdx === userAnswerIdx
                  
                  return (
                    <div
                      key={optIdx}
                      className={`p-3 rounded-lg border transition-all ${
                        isCorrectAnswer
                          ? 'border-emerald-500/50 bg-emerald-500/10'
                          : isUserAnswer
                          ? 'border-red-500/50 bg-red-500/10'
                          : 'border-white/5 bg-white/5'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        {isCorrectAnswer && (
                          <span className="text-emerald-400 font-bold">✓</span>
                        )}
                        {isUserAnswer && !isCorrectAnswer && (
                          <span className="text-red-400 font-bold">✗</span>
                        )}
                        <span className={`flex-1 ${
                          isCorrectAnswer 
                            ? 'text-emerald-300 font-semibold'
                            : isUserAnswer
                            ? 'text-red-300'
                            : 'text-slate-400'
                        }`}>
                          {option}
                        </span>
                        {isCorrectAnswer && (
                          <span className="text-xs text-emerald-400 font-semibold">Correct Answer</span>
                        )}
                        {isUserAnswer && !isCorrectAnswer && (
                          <span className="text-xs text-red-400 font-semibold">Your Answer</span>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>

              {/* Explanation */}
              {question.explanation && (
                <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                  <p className="text-xs font-semibold text-blue-400 mb-1">Explanation</p>
                  <p className="text-sm text-slate-300">{question.explanation}</p>
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Actions */}
      <div className="flex gap-3 justify-center pb-8">
        <Link
          to="/history"
          className="px-6 py-3 rounded-lg border border-white/15 text-white hover:bg-white/10 transition font-medium"
        >
          View History
        </Link>
        <Link
          to="/generate"
          className="px-6 py-3 rounded-lg bg-blue-500 hover:bg-blue-600 text-white transition font-medium shadow-lg shadow-blue-500/30"
        >
          Generate New Quiz
        </Link>
      </div>
    </div>
  )
}

export default Results
