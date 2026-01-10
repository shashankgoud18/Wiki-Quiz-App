import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'

function Layout() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(59,130,246,0.12),transparent_35%),radial-gradient(circle_at_80%_0%,rgba(94,234,212,0.1),transparent_30%),radial-gradient(circle_at_50%_70%,rgba(244,114,182,0.1),transparent_30%)]" aria-hidden />
      <div className="relative">
        <Navbar />
        <main className="max-w-6xl mx-auto px-4 py-10 sm:py-12">
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  )
}

export default Layout
