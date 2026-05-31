export default async function handler(request, response) {
  if (request.method !== 'POST') {
    return response.status(405).json({ error: 'Method not allowed' })
  }

  const apiKey = process.env.OPENAI_API_KEY

  if (!apiKey) {
    return response.status(500).json({ error: 'AI API key is not configured' })
  }

  const { question } = request.body || {}

  if (!question || typeof question !== 'string') {
    return response.status(400).json({ error: 'Question is required' })
  }

  const aiResponse = await fetch('https://api.openai.com/v1/responses', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: process.env.OPENAI_MODEL || 'gpt-4.1-mini',
      input: [
        {
          role: 'system',
          content:
            'You are Joseh AI, a concise Web3 listing assistant for JosehWeb3 Solutions. Answer questions about exchange listings, tokenomics, audits, PR, community management, and launch readiness. Keep replies practical and under 120 words.',
        },
        {
          role: 'user',
          content: question,
        },
      ],
    }),
  })

  if (!aiResponse.ok) {
    const error = await aiResponse.text()
    return response.status(502).json({ error })
  }

  const data = await aiResponse.json()
  const answer =
    data.output_text ||
    data.output?.[0]?.content?.[0]?.text ||
    'Joseh AI could not generate an answer right now.'

  return response.status(200).json({ answer })
}
