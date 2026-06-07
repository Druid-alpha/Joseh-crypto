export async function askAiAssistant(question: string) {
  const response = await fetch('/api/ai', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ question }),
  })

  if (!response.ok) {
    const contentType = response.headers.get('content-type') || ''

    if (contentType.includes('application/json')) {
      const data = await response.json().catch(() => null)
      const error = data?.error?.message || data?.error
      throw new Error(error || `AI request failed with status ${response.status}`)
    }

    const text = await response.text().catch(() => '')
    const shortText = text.replace(/\s+/g, ' ').trim().slice(0, 140)
    throw new Error(shortText || `AI request failed with status ${response.status}`)
  }

  const data = (await response.json()) as { answer?: string }

  if (!data.answer) {
    throw new Error('AI service returned no answer')
  }

  return data.answer
}
