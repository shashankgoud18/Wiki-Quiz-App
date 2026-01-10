const API_BASE = "https://wiki-quiz-app-backend.onrender.com/api/v1"

async function handle(response) {
  if (!response.ok) {
    const text = await response.text()
    throw new Error(text || response.statusText)
  }
  return response.json()
}

export async function generateQuiz(url) {
  const res = await fetch(`${API_BASE}/quiz/generate`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ url })
  })
  return handle(res)
}

export async function getQuiz(id) {
  const res = await fetch(`${API_BASE}/quiz/${id}`)
  return handle(res)
}

export async function getHistory() {
  const res = await fetch(`${API_BASE}/history/quizzes`)
  return handle(res)
}

export async function submitQuiz(id, answers) {
  const res = await fetch(`${API_BASE}/quiz/${id}/submit`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ answers })
  })
  return handle(res)
}

export async function deleteQuiz(id) {
  const res = await fetch(`${API_BASE}/quiz/${id}`, {
    method: "DELETE"
  })
  return handle(res)
}
