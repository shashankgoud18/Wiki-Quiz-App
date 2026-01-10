import { NavLink, Link } from 'react-router-dom'

function Navbar() {
  return (
    <header className="sticky top-0 z-50 backdrop-blur-sm bg-white/80 border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="group flex items-center gap-3 hover:opacity-90 transition">
            <div className="w-10 h-10 rounded-xl bg-gray-900 text-white flex items-center justify-center font-bold text-lg ring-1 ring-gray-200">
              Q
            </div>
            <div>
              <div className="text-lg font-bold text-gray-900">AI Wiki Quiz</div>
              <div className="text-xs text-gray-500">Wikipedia → Quiz</div>
            </div>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-2">
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                `px-4 py-2 rounded-lg text-sm font-medium transition ${
                  isActive
                    ? 'bg-gray-100 text-gray-900'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/generate"
              className={({ isActive }) =>
                `px-4 py-2 rounded-lg text-sm font-medium transition ${
                  isActive
                    ? 'bg-gray-100 text-gray-900'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`
              }
            >
              Generate
            </NavLink>
            <NavLink
              to="/history"
              className={({ isActive }) =>
                `px-4 py-2 rounded-lg text-sm font-medium transition ${
                  isActive
                    ? 'bg-gray-100 text-gray-900'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`
              }
            >
              History
            </NavLink>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                `px-4 py-2 rounded-lg text-sm font-medium transition ${
                  isActive
                    ? 'bg-gray-100 text-gray-900'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`
              }
            >
              About
            </NavLink>
          </nav>

          {/* CTA Button */}
          <Link
            to="/generate"
            className="hidden md:block px-5 py-2.5 rounded-lg bg-gray-900 hover:bg-gray-800 text-white text-sm font-semibold shadow-sm transition"
          >
            Create Quiz
          </Link>
        </div>
      </div>
    </header>
  )
}

export default Navbar
