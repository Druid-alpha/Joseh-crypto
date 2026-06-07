import { defineConfig, loadEnv } from 'vite'
import type { Plugin, ViteDevServer } from 'vite'
import react from '@vitejs/plugin-react'
import type { IncomingMessage, ServerResponse } from 'node:http'
// @ts-expect-error The Vercel API route is authored as JavaScript.
import rawAiHandler from './api/ai.js'

type DevApiRequest = IncomingMessage & {
  body?: unknown
}

type DevApiResponse = {
  setHeader: (name: string, value: number | string | readonly string[]) => void
  status: (statusCode: number) => DevApiResponse
  json: (data: unknown) => void
}

type AiHandler = (request: DevApiRequest, response: DevApiResponse) => Promise<void> | void

const aiHandler = rawAiHandler as AiHandler

function apiAiDevMiddleware(): Plugin {
  return {
    name: 'api-ai-dev-middleware',
    configureServer(server: ViteDevServer) {
      server.middlewares.use('/api/ai', async (request: DevApiRequest, response: ServerResponse) => {
        const chunks = []

        for await (const chunk of request) {
          chunks.push(Buffer.from(chunk))
        }

        const rawBody = Buffer.concat(chunks).toString('utf8')
        request.body = rawBody ? JSON.parse(rawBody) : {}

        const apiResponse: DevApiResponse = {
          setHeader(name, value) {
            response.setHeader(name, value)
          },
          status(statusCode) {
            response.statusCode = statusCode
            return apiResponse
          },
          json(data) {
            if (!response.hasHeader('Content-Type')) {
              response.setHeader('Content-Type', 'application/json')
            }

            response.end(JSON.stringify(data))
          },
        }

        try {
          await aiHandler(request, apiResponse)
        } catch (error) {
          response.statusCode = 500
          response.setHeader('Content-Type', 'application/json')
          response.end(
            JSON.stringify({
              error: error instanceof Error ? error.message : 'AI dev middleware error',
            }),
          )
        }
      })
    },
  }
}

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  for (const [key, value] of Object.entries(env)) {
    process.env[key] ??= value
  }

  return {
    plugins: [react(), apiAiDevMiddleware()],
  }
})
