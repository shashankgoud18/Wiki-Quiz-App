function About() {
  return (
    <section className="space-y-6 max-w-3xl">
      <h1 className="text-3xl font-bold text-white">About</h1>
      <p className="text-slate-300 leading-relaxed">
        AI Wiki Quiz Generator turns any Wikipedia article into a concise quiz. It scrapes the page, extracts
        summary and entities, and uses Gemini to create grounded questions with answers, difficulty, and explanations.
      </p>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="p-4 rounded-xl border border-white/10 bg-white/5">
          <div className="text-sm font-semibold text-slate-200 mb-2">Stack</div>
          <ul className="text-sm text-slate-300 space-y-1 list-disc list-inside">
            <li>FastAPI backend + PostgreSQL</li>
            <li>Gemini (google-genai) for LLM</li>
            <li>Vite + React + Tailwind UI</li>
          </ul>
        </div>
        <div className="p-4 rounded-xl border border-white/10 bg-white/5">
          <div className="text-sm font-semibold text-slate-200 mb-2">Features</div>
          <ul className="text-sm text-slate-300 space-y-1 list-disc list-inside">
            <li>5-10 grounded questions</li>
            <li>Take quiz mode with scoring</li>
            <li>History of all quizzes</li>
          </ul>
        </div>
      </div>
      <p className="text-slate-400 text-sm">Built to be minimal, modern, and interview-friendly.</p>
    </section>
  )
}

export default About
