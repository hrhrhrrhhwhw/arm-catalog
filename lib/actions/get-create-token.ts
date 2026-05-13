import { cookies } from 'next/headers'
import { randomUUID } from 'crypto'

export async function getToken() {
  const cookieStore = await cookies()
  return cookieStore.get('user_token')?.value ?? null
}

export async function createToken() {
  const cookieStore = await cookies()
  const token = randomUUID()

  cookieStore.set('user_token', token, {
    path: '/',
    sameSite: 'lax',
    httpOnly: true,
    maxAge: 60 * 60 * 24 * 365,
  })

  return token
}
