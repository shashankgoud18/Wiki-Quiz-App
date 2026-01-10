import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import LoadingSpinner from '../components/LoadingSpinner'
import { generateQuiz } from '../lib/api'

function Generate() {
  const [url, setUrl] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const exampleUrls = [
    'https://en.wikipedia.org/wiki/Artificial_intelligence',
    'https://en.wikipedia.org/wiki/Quantum_computing',
    'https://en.wikipedia.org/wiki/World_War_II',
  ]

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    if (!url) return
    setLoading(true)
    try {
      const data = await generateQuiz(url)
      navigate(`/quiz/${data.id}`)
    } catch (err) {
      setError(err.message || 'Failed to generate quiz')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto space-y-12">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold bg-blue-500/10 text-blue-300 border border-blue-500/30">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          AI-Powered Generation
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold text-white">Generate Your Quiz</h1>
        <p className="text-lg text-slate-300 max-w-2xl mx-auto">
          Paste any Wikipedia URL and let our AI create an engaging quiz with detailed explanations
        </p>
      </div>

      {/* Main Form Card */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-teal-500/10 rounded-2xl blur-xl"></div>
        <div className="relative p-8 rounded-2xl border border-white/10 bg-slate-950/80 backdrop-blur-xl shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* URL Input */}
            <div className="space-y-3">
              <label className="block text-sm font-semibold text-white">
                Wikipedia Article URL
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                  </svg>
                </div>
                <input
                  type="url"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="https://en.wikipedia.org/wiki/..."
                  className="w-full pl-12 pr-4 py-4 rounded-xl border border-white/10 bg-slate-900/50 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                  required
                  disabled={loading}
                />
              </div>
              <p className="text-sm text-slate-400">
                The AI will analyze the article and generate 5-10 questions with varying difficulty levels
              </p>
            </div>

            {/* Quick Examples */}
            <div className="space-y-3">
              <label className="block text-sm font-semibold text-white">
                Try these examples
              </label>
              <div className="flex flex-wrap gap-2">
                {exampleUrls.map((exampleUrl, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setUrl(exampleUrl)}
                    disabled={loading}
                    className="px-4 py-2 rounded-lg text-sm bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 hover:border-white/20 transition disabled:opacity-50"
                  >
                    {exampleUrl.split('/wiki/')[1]?.replace(/_/g, ' ')}
                  </button>
                ))}
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading || !url}
              className="w-full group relative px-6 py-4 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold shadow-xl shadow-blue-500/30 transition-all hover:scale-[1.02] hover:shadow-2xl hover:shadow-blue-500/40 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Generating your quiz...
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  Generate Quiz
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
              )}
            </button>

            {/* Info Box */}
            <div className="flex items-start gap-3 p-4 rounded-lg bg-blue-500/5 border border-blue-500/20">
              <svg className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div className="text-sm text-slate-300">
                <p className="font-semibold text-blue-300 mb-1">Processing time</p>
                <p>Quiz generation typically takes 10-20 seconds. We're extracting content, analyzing context, and creating thoughtful questions with the AI.</p>
              </div>
            </div>
          </form>

          {/* Error Message */}
          {error && (
            <div className="mt-6 flex items-start gap-3 p-4 rounded-lg bg-red-500/10 border border-red-500/30 animate-in fade-in slide-in-from-top-2">
              <svg className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div>
                <p className="font-semibold text-red-300 text-sm">Error generating quiz</p>
                <p className="text-red-200 text-sm mt-1">{error}</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* How it Works */}
      <div className="grid sm:grid-cols-3 gap-6">
        <div className="text-center space-y-3">
          <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center mx-auto">
            <span className="text-2xl">🔍</span>
          </div>
          <h3 className="font-bold text-white">1. Analyze</h3>
          <p className="text-sm text-slate-400">AI reads and understands the Wikipedia article</p>
        </div>
        <div className="text-center space-y-3">
          <div className="w-12 h-12 rounded-xl bg-teal-500/10 border border-teal-500/30 flex items-center justify-center mx-auto">
            <span className="text-2xl">✨</span>
          </div>
          <h3 className="font-bold text-white">2. Generate</h3>
          <p className="text-sm text-slate-400">Creates questions with difficulty levels and explanations</p>
        </div>
        <div className="text-center space-y-3">
          <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center mx-auto">
            <span className="text-2xl">🎯</span>
          </div>
          <h3 className="font-bold text-white">3. Review</h3>
          <p className="text-sm text-slate-400">Take the quiz and get instant feedback</p>
        </div>
      </div>
    </div>
  )
}

export default Generate
