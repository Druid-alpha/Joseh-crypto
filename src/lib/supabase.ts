type SupabaseRecord = Record<string, string | null>

const supabaseUrl = (import.meta.env.VITE_SUPABASE_URL as string | undefined)?.replace(/\/$/, '')
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined

const isConfigured = Boolean(supabaseUrl && supabaseAnonKey)

async function insertRecord(table: string, payload: SupabaseRecord) {
  if (!isConfigured) {
    throw new Error('Supabase is not configured yet. Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.')
  }

  const response = await fetch(`${supabaseUrl}/rest/v1/${table}`, {
    method: 'POST',
    headers: {
      apikey: supabaseAnonKey!,
      Authorization: `Bearer ${supabaseAnonKey}`,
      'Content-Type': 'application/json',
      Prefer: 'return=minimal',
    },
    body: JSON.stringify(payload),
  })

  if (response.status === 409 && table === 'newsletter_subscribers') {
    throw new Error('This email is already subscribed.')
  }

  if (!response.ok) {
    let message = `Could not save ${table}. Please try again.`

    try {
      const error = (await response.json()) as { message?: string; details?: string; hint?: string }
      message = error.message || error.details || error.hint || message
    } catch {
      // Keep the readable fallback above if Supabase returns a non-JSON error.
    }

    throw new Error(message)
  }
}

export async function subscribeToNewsletter(email: string) {
  await insertRecord('newsletter_subscribers', {
    email,
    source: 'website_footer',
  })
}

export async function submitContactInquiry(payload: {
  name?: string | null
  email?: string | null
  projectName?: string | null
  targetService?: string | null
  contactHandle?: string | null
  message?: string | null
  source: string
}) {
  await insertRecord('contact_inquiries', {
    name: payload.name || null,
    email: payload.email || null,
    project_name: payload.projectName || null,
    target_service: payload.targetService || null,
    contact_handle: payload.contactHandle || null,
    message: payload.message || null,
    source: payload.source,
  })
}
