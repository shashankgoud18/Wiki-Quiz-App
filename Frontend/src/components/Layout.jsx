import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'

function Layout() {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <div className="relative">
        <Navbar />
        <main className="max-w-6xl mx-auto px-6 py-10 sm:py-12">
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  )
}

export default Layout
