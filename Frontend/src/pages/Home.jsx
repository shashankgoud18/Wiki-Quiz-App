import { Link } from 'react-router-dom'

function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="pt-16 pb-24 lg:pt-24 lg:pb-32">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center space-y-6 max-w-3xl mx-auto mb-16">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 leading-tight">
              Turn any Wikipedia article into a quiz
            </h1>
            
            <p className="text-xl text-gray-600 leading-relaxed">
              Paste a link, get instant quizzes. Learn faster with AI-generated questions 
              and detailed explanations.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3 justify-center items-center pt-2">
              <Link
                to="/generate"
                className="px-7 py-3.5 rounded-lg bg-gray-900 text-white hover:bg-gray-800 font-medium transition-colors"
              >
                Create your first quiz →
              </Link>
              <Link
                to="/history"
                className="px-7 py-3.5 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 font-medium transition-colors"
              >
                View history
              </Link>
            </div>
          </div>

          {/* Visual Demo */}
          <div className="max-w-4xl mx-auto">
            <div className="rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden">
              <div className="bg-gray-50 px-4 py-3 border-b border-gray-200 flex items-center gap-2">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <span className="ml-2 text-sm text-gray-500">Quiz Preview</span>
              </div>
              
              <div className="p-6 space-y-4">
                <div className="flex items-center justify-between p-4 rounded-lg bg-gray-50">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                      </svg>
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">Quantum Computing</div>
                      <div className="text-sm text-gray-500">8 questions</div>
                    </div>
                  </div>
                  <span className="px-3 py-1 rounded-md bg-yellow-100 text-yellow-800 text-xs font-medium">
                    Medium
                  </span>
                </div>
                
                <div className="p-5 rounded-lg border border-gray-200 bg-gray-50">
                  <div className="flex items-start gap-3">
                    <div className="w-7 h-7 rounded-md bg-gray-200 flex items-center justify-center text-sm font-semibold text-gray-700 shrink-0">
                      1
                    </div>
                    <div className="flex-1 space-y-3">
                      <p className="text-gray-900 font-medium">What is a qubit in quantum computing?</p>
                      <div className="space-y-2">
                        <div className="p-3 rounded-lg bg-blue-50 border border-blue-200">
                          <span className="text-sm text-gray-900">The quantum equivalent of a classical bit</span>
                        </div>
                        {['A quantum computer brand', 'A measurement unit'].map((opt, i) => (
                          <div key={i} className="p-3 rounded-lg bg-white border border-gray-200">
                            <span className="text-sm text-gray-600">{opt}</span>
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
      </section>

      {/* How It Works Section */}
      <section className="py-20 lg:py-24 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center space-y-3 mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900">How it works</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Create a quiz in under 30 seconds
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: '1',
                title: 'Paste a Wikipedia URL',
                description: 'Copy any Wikipedia article link and paste it into the generator.',
              },
              {
                step: '2',
                title: 'AI generates questions',
                description: 'AI reads the article and creates multiple-choice questions instantly.',
              },
              {
                step: '3',
                title: 'Take quiz & learn',
                description: 'Answer questions and get instant feedback with explanations.',
              }
            ].map((item, i) => (
              <div 
                key={i} 
                className="group relative p-6 rounded-xl border border-gray-200 bg-white shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300"
              >
                <div className="absolute -top-3 -left-3 w-12 h-12 rounded-lg bg-gray-900 flex items-center justify-center text-white font-bold shadow-md group-hover:scale-110 transition-transform duration-300">
                  {item.step}
                </div>
                <div className="pt-4 space-y-3">
                  <h3 className="text-xl font-semibold text-gray-900">{item.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{item.description}</p>
                </div>
                <div className="absolute bottom-6 right-6 text-gray-200 group-hover:text-gray-300 transition-colors">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 lg:py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center space-y-3 mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900">Why use this?</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Learn smarter, not harder
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: 'Active learning',
                description: 'Testing yourself beats passive reading. Turn articles into active practice.',
              },
              {
                title: 'Instant feedback',
                description: 'Get explanations for every answer immediately. Learn from mistakes.',
              },
              {
                title: 'Interview prep',
                description: 'Perfect for interviews, exams, or learning new topics quickly.',
              },
              {
                title: 'Multiple difficulty levels',
                description: 'Questions range from easy to hard. Challenge yourself appropriately.',
              },
              {
                title: 'Save time',
                description: 'Generate quizzes instantly. No manual question creation needed.',
              },
              {
                title: 'Track progress',
                description: 'See all your past quizzes and scores. Review anytime.',
              }
            ].map((benefit, i) => (
              <div 
                key={i} 
                className="group p-6 rounded-xl border border-gray-200 bg-white hover:shadow-md hover:-translate-y-1 transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-gray-900 shrink-0 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <div className="w-5 h-5 rounded-full border-2 border-white"></div>
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-lg font-semibold text-gray-900">{benefit.title}</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">{benefit.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 lg:py-24 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <div className="space-y-4">
                <h2 className="text-4xl font-bold text-gray-900 leading-tight">
                  Everything you need
                </h2>
                <p className="text-lg text-gray-600">
                  Features designed to help you learn better and faster
                </p>
              </div>

              <div className="space-y-5">
                {[
                  {
                    title: 'AI-powered questions',
                    description: 'Questions are automatically generated based on the article content'
                  },
                  {
                    title: 'Cached for speed',
                    description: 'Quizzes are saved so you can retake them anytime'
                  },
                  {
                    title: 'Detailed explanations',
                    description: 'Learn why each answer is correct or incorrect'
                  },
                  {
                    title: 'Related topics',
                    description: 'Discover similar articles to continue learning'
                  }
                ].map((feature, i) => (
                  <div key={i} className="flex gap-3">
                    <svg className="w-6 h-6 text-gray-900 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <div>
                      <h3 className="font-semibold text-gray-900">{feature.title}</h3>
                      <p className="text-gray-600 text-sm mt-0.5">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-gray-200">
                  <span className="text-sm text-gray-600">Question 3 of 8</span>
                  <span className="text-sm text-green-600 font-medium">2/2 correct</span>
                </div>
                
                <div className="space-y-4">
                  <span className="inline-block px-2.5 py-1 rounded-md text-xs font-medium bg-yellow-100 text-yellow-800">
                    Medium
                  </span>
                  
                  <p className="text-gray-900 font-medium">
                    Who developed the theory of general relativity?
                  </p>
                  
                  <div className="space-y-2">
                    <div className="p-3 rounded-lg bg-green-50 border border-green-200">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-900">Albert Einstein</span>
                        <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    </div>
                    {['Isaac Newton', 'Stephen Hawking'].map((opt, i) => (
                      <div key={i} className="p-3 rounded-lg bg-gray-50 border border-gray-200 opacity-60">
                        <span className="text-sm text-gray-600">{opt}</span>
                      </div>
                    ))}
                  </div>

                  <div className="p-3 rounded-lg bg-blue-50 border border-blue-200">
                    <p className="text-sm text-gray-700">
                      Correct! Einstein published his theory in 1915, revolutionizing physics.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-24">
        <div className="max-w-3xl mx-auto px-6 text-center space-y-6">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900">
            Ready to get started?
          </h2>
          <p className="text-xl text-gray-600">
            Create your first quiz in seconds. No sign-up needed.
          </p>
          <Link
            to="/generate"
            className="inline-block px-7 py-3.5 rounded-lg bg-gray-900 text-white hover:bg-gray-800 font-medium transition-colors"
          >
            Create a quiz →
          </Link>
        </div>
      </section>
    </div>
  )
}

export default Home
