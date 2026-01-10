import { NavLink, Link } from 'react-router-dom'

function Navbar() {
  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-slate-950/80 border-b border-white/10 shadow-lg shadow-black/10">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="group flex items-center gap-3 hover:opacity-80 transition">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-teal-500 rounded-xl blur-md opacity-50 group-hover:opacity-75 transition"></div>
              <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-teal-500 flex items-center justify-center text-white font-bold text-lg shadow-xl">
                Q
              </div>
            </div>
            <div>
              <div className="text-lg font-bold text-white">AI Wiki Quiz</div>
              <div className="text-xs text-slate-400">Powered by AI</div>
            </div>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-2">
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                `px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-white/10 text-white shadow-lg'
                    : 'text-slate-300 hover:text-white hover:bg-white/5'
                }`
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/generate"
              className={({ isActive }) =>
                `px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-white/10 text-white shadow-lg'
                    : 'text-slate-300 hover:text-white hover:bg-white/5'
                }`
              }
            >
              Generate
            </NavLink>
            <NavLink
              to="/history"
              className={({ isActive }) =>
                `px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-white/10 text-white shadow-lg'
                    : 'text-slate-300 hover:text-white hover:bg-white/5'
                }`
              }
            >
              History
            </NavLink>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                `px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-white/10 text-white shadow-lg'
                    : 'text-slate-300 hover:text-white hover:bg-white/5'
                }`
              }
            >
              About
            </NavLink>
          </nav>

          {/* CTA Button */}
          <Link
            to="/generate"
            className="hidden md:block px-5 py-2.5 rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white text-sm font-semibold shadow-lg shadow-blue-500/30 transition-all hover:scale-105"
          >
            Create Quiz
          </Link>
        </div>
      </div>
    </header>
  )
}

export default Navbar
