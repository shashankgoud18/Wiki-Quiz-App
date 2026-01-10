import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Generate from './pages/Generate'
import QuizView from './pages/QuizView'
import TakeQuiz from './pages/TakeQuiz'
import Results from './pages/Results'
import History from './pages/History'
import About from './pages/About'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/generate" element={<Generate />} />
          <Route path="/quiz/:id" element={<QuizView />} />
          <Route path="/quiz/:id/take" element={<TakeQuiz />} />
          <Route path="/quiz/:id/results" element={<Results />} />
          <Route path="/history" element={<History />} />
          <Route path="/about" element={<About />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
