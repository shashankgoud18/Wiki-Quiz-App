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
      <div className="relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-sm">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Quiz completed</h1>
        <p className="text-gray-600 mb-6">Here's how you performed</p>
        <div className={`text-7xl font-bold ${getScoreColor()} mb-4`}>{percentage}%</div>
        <div className="flex justify-center gap-6 text-lg">
          <div className="text-gray-700">
            <span className="font-semibold text-emerald-600">{correctCount}</span> correct
          </div>
          <div className="text-gray-300">•</div>
          <div className="text-gray-700">
            <span className="font-semibold text-red-600">{totalQuestions - correctCount}</span> wrong
          </div>
          <div className="text-gray-300">•</div>
          <div className="text-gray-700">
            <span className="font-semibold text-gray-900">{totalQuestions}</span> total
          </div>
        </div>
      </div>

      {/* Question Results */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-gray-900">Answer review</h2>
        
        {quiz.quiz?.map((question, idx) => {
          const userAnswerIdx = (results.answers || [])[idx]
          const isCorrect = typeof userAnswerIdx === 'number' && userAnswerIdx === question.correct_index
          
          return (
            <div
              key={idx}
              className={`rounded-xl border p-6 transition-all ${
                isCorrect
                  ? 'border-emerald-200 bg-emerald-50'
                  : 'border-red-200 bg-red-50'
              }`}
            >
              {/* Question Header */}
              <div className="flex items-start gap-3 mb-4">
                <div
                  className={`shrink-0 w-8 h-8 rounded-lg flex items-center justify-center font-bold ${
                    isCorrect ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'
                  }`}
                >
                  {isCorrect ? '✓' : '✗'}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-semibold text-gray-500">
                      Question {idx + 1}
                    </span>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${
                      question.difficulty === 'easy' 
                        ? 'bg-green-100 text-green-700'
                        : question.difficulty === 'medium'
                        ? 'bg-yellow-100 text-yellow-700'
                        : 'bg-red-100 text-red-700'
                    }`}>
                      {question.difficulty}
                    </span>
                  </div>
                  <p className="text-lg font-semibold text-gray-900">
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
                          ? 'border-emerald-200 bg-emerald-50'
                          : isUserAnswer
                          ? 'border-red-200 bg-red-50'
                          : 'border-gray-200 bg-white'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        {isCorrectAnswer && (<span className="text-emerald-700 font-bold">✓</span>)}
                        {isUserAnswer && !isCorrectAnswer && (<span className="text-red-700 font-bold">✗</span>)}
                        <span className={`flex-1 ${
                          isCorrectAnswer ? 'text-emerald-800 font-semibold' : isUserAnswer ? 'text-red-800' : 'text-gray-700'
                        }`}>
                          {option}
                        </span>
                        {isCorrectAnswer && (<span className="text-xs text-emerald-700 font-semibold">Correct answer</span>)}
                        {isUserAnswer && !isCorrectAnswer && (<span className="text-xs text-red-700 font-semibold">Your answer</span>)}
                      </div>
                    </div>
                  )
                })}
              </div>

              {/* Explanation */}
              {question.explanation && (
                <div className="p-4 rounded-lg bg-gray-50 border border-gray-200">
                  <p className="text-xs font-semibold text-gray-900 mb-1">Explanation</p>
                  <p className="text-sm text-gray-700">{question.explanation}</p>
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
          className="px-6 py-3 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition font-medium"
        >
          View History
        </Link>
        <Link
          to="/generate"
          className="px-6 py-3 rounded-lg bg-gray-900 hover:bg-gray-800 text-white transition font-medium shadow-sm"
        >
          Generate New Quiz
        </Link>
      </div>
    </div>
  )
}

export default Results
