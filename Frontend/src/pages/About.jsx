import React from 'react'

function About() {
    return (
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
          <h1 className="text-3xl font-bold text-gray-900 mb-3">About AI Wiki Quiz Generator</h1>
          <p className="text-gray-700">
            AI Wiki Quiz Generator turns any Wikipedia article into a clean, interactive quiz in minutes. Paste a link, and our AI extracts key ideas, generates multiple-choice questions, and gives you instant scoring with explanations.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">What it does</h2>
            <ul className="text-gray-700 space-y-2 list-disc pl-5">
              <li>Scrapes content from your provided Wikipedia URL</li>
              <li>Extracts key facts and concepts</li>
              <li>Generates multiple-choice questions</li>
              <li>Lets you take and review quizzes with explanations</li>
            </ul>
          </div>
          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Tech stack</h2>
            <ul className="text-gray-700 space-y-2 list-disc pl-5">
              <li>Frontend: React, Vite, Tailwind CSS</li>
              <li>Backend: FastAPI, SQLAlchemy</li>
              <li>AI: Gemini 2.5 Flash for quiz generation</li>
              <li>Database: SQLite (dev), Postgres-ready</li>
            </ul>
          </div>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-gray-900 mb-3">Why we built this</h2>
          <p className="text-gray-700">
            Active recall beats passive reading. Quizzes quickly reveal what you actually remember and what needs another pass. This tool turns dense articles into bite‑sized practice — great for students, curious readers, and interview prep.
          </p>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-gray-900 mb-3">FAQ</h2>
          <div className="space-y-4">
            <div>
              <p className="text-sm font-semibold text-gray-900">Is the content always accurate?</p>
              <p className="text-gray-700">We use AI to generate questions and explanations from Wikipedia. It’s usually solid, but for important facts, it’s smart to double‑check.</p>
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-900">Do you store my data?</p>
              <p className="text-gray-700">Quiz attempts are stored locally in your browser. If accounts are enabled later, history can sync securely.</p>
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-900">Can I use sources other than Wikipedia?</p>
              <p className="text-gray-700">For now we optimize for Wikipedia. Support for broader sources is on the roadmap.</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

export default About