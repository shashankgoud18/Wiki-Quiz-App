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
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900">Generate your quiz</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Paste a Wikipedia URL and get a quiz with explanations in seconds.
        </p>
      </div>

      {/* Main Form Card */}
      <div className="relative">
        <div className="relative p-8 rounded-2xl border border-gray-200 bg-white shadow-sm">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* URL Input */}
            <div className="space-y-3">
              <label className="block text-sm font-semibold text-gray-900">Wikipedia Article URL</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                  </svg>
                </div>
                <input
                  type="url"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="https://en.wikipedia.org/wiki/..."
                  className="w-full pl-12 pr-4 py-4 rounded-xl border border-gray-300 bg-white text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-gray-900/20 transition"
                  required
                  disabled={loading}
                />
              </div>
              <p className="text-sm text-gray-500">The AI analyzes the article and generates 5–10 questions with explanations.</p>
            </div>

            {/* Quick Examples */}
            <div className="space-y-3">
              <label className="block text-sm font-semibold text-gray-900">Try these examples</label>
              <div className="flex flex-wrap gap-2">
                {exampleUrls.map((exampleUrl, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setUrl(exampleUrl)}
                    disabled={loading}
                    className="px-4 py-2 rounded-lg text-sm bg-gray-50 hover:bg-gray-100 text-gray-700 border border-gray-200 transition disabled:opacity-50"
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
              className="w-full group relative px-6 py-4 rounded-xl bg-gray-900 hover:bg-gray-800 text-white font-semibold shadow-sm transition-transform hover:scale-[1.01] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
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
            <div className="flex items-start gap-3 p-4 rounded-lg bg-gray-50 border border-gray-200">
              <svg className="w-5 h-5 text-gray-500 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div className="text-sm text-gray-600">
                <p className="font-semibold text-gray-900 mb-1">Processing time</p>
                <p>Generation usually takes 10–20 seconds while we fetch content and craft good questions.</p>
              </div>
            </div>
          </form>

          {/* Error Message */}
          {error && (
            <div className="mt-6 flex items-start gap-3 p-4 rounded-lg bg-red-50 border border-red-200">
              <svg className="w-5 h-5 text-red-500 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div>
                <p className="font-semibold text-red-700 text-sm">Error generating quiz</p>
                <p className="text-red-600 text-sm mt-1">{error}</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* How it Works */}
      <div className="grid sm:grid-cols-3 gap-6">
        {[
          { icon: '🔍', title: 'Analyze', desc: 'We read and understand the article' },
          { icon: '✨', title: 'Generate', desc: 'Create questions with explanations' },
          { icon: '🎯', title: 'Review', desc: 'Take the quiz and learn' },
        ].map((it) => (
          <div key={it.title} className="text-center space-y-3">
            <div className="w-12 h-12 rounded-xl bg-gray-100 border border-gray-200 flex items-center justify-center mx-auto">
              <span className="text-2xl">{it.icon}</span>
            </div>
            <h3 className="font-bold text-gray-900">{it.title}</h3>
            <p className="text-sm text-gray-600">{it.desc}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Generate
