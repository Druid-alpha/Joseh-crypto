export default async function handler(request, response) {
  response.setHeader('Cache-Control', 'no-store')

  if (request.method !== 'POST') {
    return response.status(405).json({ error: 'Method not allowed' })
  }

  const apiKey =
    process.env.OPENAI_API_KEY ||
    process.env.OPENAI_KEY ||
    process.env.VITE_OPENAI_API_KEY ||
    process.env.VITE_OPENAI_KEY
  const model = process.env.OPENAI_MODEL || process.env.VITE_OPENAI_MODEL || 'gpt-4.1-mini'

  if (!apiKey) {
    return response.status(500).json({ error: 'AI API key is not configured' })
  }

  let body = request.body || {}

  if (typeof body === 'string') {
    try {
      body = JSON.parse(body)
    } catch {
      return response.status(400).json({ error: 'Invalid JSON body' })
    }
  }

  const { question } = body

  if (!question || typeof question !== 'string') {
    return response.status(400).json({ error: 'Question is required' })
  }

  const systemPrompt =
    'You are Joseh AI, a concise Web3 listing assistant for JosehWeb3 Solutions. Answer questions about exchange listings, tokenomics, audits, PR, community management, and launch readiness. Keep replies practical and under 120 words.'

  try {
    let aiResponse = await fetch('https://api.openai.com/v1/responses', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model,
        max_output_tokens: 220,
        input: [
          {
            role: 'system',
            content: systemPrompt,
          },
          {
            role: 'user',
            content: question,
          },
        ],
      }),
    })

    let data = await aiResponse.json().catch(async () => ({ error: await aiResponse.text() }))

    if (!aiResponse.ok && [400, 404].includes(aiResponse.status)) {
      aiResponse = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model,
          max_tokens: 220,
          messages: [
            {
              role: 'system',
              content: systemPrompt,
            },
            {
              role: 'user',
              content: question,
            },
          ],
        }),
      })

      data = await aiResponse.json().catch(async () => ({ error: await aiResponse.text() }))
    }

    if (!aiResponse.ok) {
      return response.status(aiResponse.status).json({
        error: data.error?.message || data.error || 'OpenAI request failed',
        model,
      })
    }

    const responseText =
      data.output_text ||
      data.output?.flatMap((item) => item.content || [])
        ?.map((content) => content.text || content.value)
        ?.filter(Boolean)
        ?.join('\n') ||
      data.choices?.[0]?.message?.content ||
      ''

    const answer = responseText.trim()

    if (!answer) {
      return response.status(502).json({
        error: 'AI service returned no answer',
        model,
      })
    }

    return response.status(200).json({ answer })
  } catch (error) {
    return response.status(500).json({
      error: error instanceof Error ? error.message : 'AI server error',
      model,
    })
  }
}
