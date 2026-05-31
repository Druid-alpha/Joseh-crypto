export async function askAiAssistant(question: string) {
  const response = await fetch('/api/ai', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ question }),
  })

  if (!response.ok) {
    throw new Error('AI service unavailable')
  }

  const data = (await response.json()) as { answer?: string }

  if (!data.answer) {
    throw new Error('AI service returned no answer')
  }

  return data.answer
}
