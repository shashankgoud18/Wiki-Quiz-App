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
                  <div className="w-3 h-3 rounded-full bg-gray-300"></div>
                  <div className="w-3 h-3 rounded-full bg-gray-300"></div>
                  <div className="w-3 h-3 rounded-full bg-gray-300"></div>
                </div>
                <span className="ml-2 text-sm text-gray-500">Quiz Preview</span>
              </div>
              
              <div className="p-6 space-y-4">
                <div className="flex items-center justify-between p-4 rounded-lg bg-gray-50">
                  <div className="flex items-center gap-3">
                    <div className="text-2xl">📚</div>
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
                    <div className="w-7 h-7 rounded-md bg-gray-200 flex items-center justify-center text-sm font-semibold text-gray-700 flex-shrink-0">
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
      <section className="py-20 lg:py-24 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center space-y-3 mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900">How it works</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Three simple steps to start learning
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-10">
            {[
              {
                step: '1',
                title: 'Paste a Wikipedia URL',
                description: 'Copy any Wikipedia article link and paste it into our generator. Works with any topic.',
              },
              {
                step: '2',
                title: 'AI generates questions',
                description: 'Our AI analyzes the article and creates relevant questions with different difficulty levels.',
              },
              {
                step: '3',
                title: 'Take quiz & learn',
                description: 'Answer questions and get instant feedback with detailed explanations for every answer.',
              }
            ].map((item, i) => (
              <div key={i} className="space-y-4">
                <div className="w-10 h-10 rounded-lg bg-gray-900 flex items-center justify-center text-white font-bold">
                  {item.step}
                </div>
                <h3 className="text-xl font-semibold text-gray-900">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 lg:py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center space-y-3 mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900">Why use Wiki Quiz?</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              A better way to learn from Wikipedia
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: 'Active learning',
                description: 'Testing yourself is proven to be more effective than just reading. Turn passive content into active practice.',
                icon: '🎯'
              },
              {
                title: 'Instant feedback',
                description: 'Get explanations for every answer immediately. Learn from your mistakes right away.',
                icon: '⚡'
              },
              {
                title: 'Interview prep',
                description: 'Great for preparing for interviews, exams, or learning new topics quickly.',
                icon: '💼'
              },
              {
                title: 'Different difficulty levels',
                description: 'Questions range from easy to hard, so you can challenge yourself appropriately.',
                icon: '📊'
              },
              {
                title: 'Save time',
                description: 'Generate quizzes instantly instead of spending hours creating questions manually.',
                icon: '⏱️'
              },
              {
                title: 'Track your progress',
                description: 'See all your past quizzes and scores. Review anytime you want.',
                icon: '📈'
              }
            ].map((benefit, i) => (
              <div key={i} className="space-y-3">
                <div className="text-3xl">{benefit.icon}</div>
                <h3 className="text-lg font-semibold text-gray-900">{benefit.title}</h3>
                <p className="text-gray-600 leading-relaxed">{benefit.description}</p>
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
