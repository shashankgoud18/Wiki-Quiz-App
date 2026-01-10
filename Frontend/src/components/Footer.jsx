import { Link } from 'react-router-dom'

function Footer() {
  return (
    <footer className="relative mt-20 border-t border-white/10 bg-slate-950/50 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-teal-500 flex items-center justify-center text-white font-bold text-lg shadow-xl">
                Q
              </div>
              <div>
                <div className="text-lg font-bold text-white">AI Wiki Quiz</div>
                <div className="text-xs text-slate-400">Smart Learning</div>
              </div>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              Transform Wikipedia articles into interactive quizzes with AI-powered question generation.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-bold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-sm text-slate-400 hover:text-white transition">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/generate" className="text-sm text-slate-400 hover:text-white transition">
                  Generate Quiz
                </Link>
              </li>
              <li>
                <Link to="/history" className="text-sm text-slate-400 hover:text-white transition">
                  History
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-sm text-slate-400 hover:text-white transition">
                  About
                </Link>
              </li>
            </ul>
          </div>

          {/* Features */}
          <div>
            <h3 className="text-sm font-bold text-white mb-4">Features</h3>
            <ul className="space-y-2">
              <li className="text-sm text-slate-400">🎯 AI-Generated Quizzes</li>
              <li className="text-sm text-slate-400">⚡ Instant Feedback</li>
              <li className="text-sm text-slate-400">📊 Progress Tracking</li>
              <li className="text-sm text-slate-400">🎨 Modern UI</li>
            </ul>
          </div>

          {/* Tech Stack */}
          <div>
            <h3 className="text-sm font-bold text-white mb-4">Built With</h3>
            <ul className="space-y-2">
              <li className="text-sm text-slate-400">React + Vite</li>
              <li className="text-sm text-slate-400">FastAPI</li>
              <li className="text-sm text-slate-400">Google Gemini AI</li>
              <li className="text-sm text-slate-400">PostgreSQL</li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-slate-400">
              © {new Date().getFullYear()} AI Wiki Quiz. Built with ❤️ for learners.
            </p>
            <div className="flex items-center gap-4">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-white transition"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
