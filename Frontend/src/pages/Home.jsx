import { Link } from 'react-router-dom'

function Home() {
  return (
    <div className="space-y-20">
      {/* Hero Section */}
      <section className="relative">
        <div className="grid gap-12 lg:grid-cols-2 items-center">
          <div className="space-y-8 relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold bg-gradient-to-r from-blue-500/20 to-teal-500/20 text-blue-200 border border-blue-500/30 backdrop-blur">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
              </span>
              Powered by AI
            </div>
            
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-tight">
              Transform <span className="bg-gradient-to-r from-blue-400 to-teal-400 bg-clip-text text-transparent">Wikipedia</span> into Interactive Quizzes
            </h1>
            
            <p className="text-xl text-slate-300 max-w-2xl leading-relaxed">
              Paste any Wikipedia URL and let AI generate engaging quizzes with explanations, 
              difficulty levels, and instant feedback. Perfect for learning and interview prep.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <Link
                to="/generate"
                className="group px-8 py-4 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold shadow-xl shadow-blue-500/30 transition-all hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/40"
              >
                <span className="flex items-center gap-2">
                  Start Creating
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
              </Link>
              <Link
                to="/history"
                className="px-8 py-4 rounded-xl border-2 border-white/20 bg-white/5 hover:bg-white/10 text-white font-semibold backdrop-blur transition-all hover:border-white/30"
              >
                Browse History
              </Link>
            </div>
            
            <div className="flex flex-wrap items-center gap-6 text-sm">
              <div className="flex items-center gap-2 text-slate-300">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500/20 to-blue-600/20 border border-blue-500/30 flex items-center justify-center">
                  <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <span>AI Powered</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-teal-500/20 to-teal-600/20 border border-teal-500/30 flex items-center justify-center">
                  <svg className="w-5 h-5 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <span>Instant Results</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500/20 to-purple-600/20 border border-purple-500/30 flex items-center justify-center">
                  <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <span>Detailed Explanations</span>
              </div>
            </div>
          </div>

          {/* Preview Card */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-teal-500/20 rounded-3xl blur-3xl"></div>
            <div className="relative rounded-2xl border border-white/10 bg-slate-950/80 backdrop-blur-xl p-8 shadow-2xl">
              <div className="flex items-center justify-between mb-6">
                <span className="text-sm font-semibold text-slate-300">Live Preview</span>
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="p-5 rounded-xl bg-gradient-to-br from-blue-500/10 to-teal-500/10 border border-blue-500/30">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-12 h-12 rounded-lg bg-blue-500/20 flex items-center justify-center text-2xl">
                      🧠
                    </div>
                    <div>
                      <div className="text-base font-bold text-white">Artificial Intelligence</div>
                      <div className="text-xs text-slate-400">10 questions • Medium</div>
                    </div>
                  </div>
                </div>
                
                <div className="p-5 rounded-xl bg-white/5 border border-white/10 space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-7 h-7 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold text-sm flex-shrink-0">
                      1
                    </div>
                    <div className="flex-1">
                      <p className="text-white font-medium mb-3">What is machine learning?</p>
                      <div className="space-y-2">
                        {['A subset of AI', 'A programming language', 'A database system', 'An operating system'].map((opt, i) => (
                          <div key={i} className={`p-3 rounded-lg border transition-all ${i === 0 ? 'border-blue-500/50 bg-blue-500/10' : 'border-white/10 bg-white/5'}`}>
                            <span className={`text-sm ${i === 0 ? 'text-blue-300' : 'text-slate-300'}`}>{opt}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Background decoration */}
        <div className="absolute top-1/4 -left-64 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 -right-64 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl"></div>
      </section>

      {/* Features Section */}
      <section className="space-y-8">
        <div className="text-center space-y-4">
          <h2 className="text-3xl sm:text-4xl font-bold text-white">Everything you need to learn better</h2>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto">
            Powerful features designed to make learning engaging and effective
          </p>
        </div>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              icon: '🎯',
              title: 'Smart Generation',
              description: 'AI analyzes Wikipedia articles and creates relevant, challenging questions automatically',
              color: 'from-blue-500/20 to-blue-600/20 border-blue-500/30'
            },
            {
              icon: '📊',
              title: 'Instant Feedback',
              description: 'Get detailed explanations for every answer, right and wrong, to learn as you go',
              color: 'from-teal-500/20 to-teal-600/20 border-teal-500/30'
            },
            {
              icon: '📈',
              title: 'Track Progress',
              description: 'View your quiz history, scores, and performance trends over time',
              color: 'from-purple-500/20 to-purple-600/20 border-purple-500/30'
            },
            {
              icon: '⚡',
              title: 'Lightning Fast',
              description: 'Generate quizzes in seconds with our optimized AI pipeline',
              color: 'from-yellow-500/20 to-yellow-600/20 border-yellow-500/30'
            },
            {
              icon: '🎨',
              title: 'Beautiful UI',
              description: 'Clean, modern interface designed for distraction-free learning',
              color: 'from-pink-500/20 to-pink-600/20 border-pink-500/30'
            },
            {
              icon: '🔒',
              title: 'Your Data',
              description: 'All your quizzes and progress stored securely in our database',
              color: 'from-green-500/20 to-green-600/20 border-green-500/30'
            }
          ].map((feature, i) => (
            <div
              key={i}
              className="group p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 transition-all hover:scale-105 hover:shadow-xl"
            >
              <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center text-3xl mb-4`}>
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
              <p className="text-slate-300 text-sm leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-blue-500/10 via-transparent to-teal-500/10 p-12 text-center">
        <div className="relative z-10 space-y-6 max-w-2xl mx-auto">
          <h2 className="text-4xl sm:text-5xl font-bold text-white">Ready to start learning?</h2>
          <p className="text-xl text-slate-300">
            Create your first quiz in seconds. No sign-up required.
          </p>
          <Link
            to="/generate"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-white text-slate-900 hover:bg-slate-100 font-bold shadow-xl transition-all hover:scale-105"
          >
            Generate Your First Quiz
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-teal-500/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
      </section>
    </div>
  )
}

export default Home
