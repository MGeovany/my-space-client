import { getAccessToken, withApiAuthRequired } from '@auth0/nextjs-auth0'
import { NextResponse } from 'next/server'

export const GET = withApiAuthRequired(async (req) => {
  const res = new NextResponse()

  try {
    const { accessToken } = await getAccessToken(req, res, {
      authorizationParams: {
        audience: 'https://my-space.com',
        scope: 'openid profile email',
      },
    })
    return NextResponse.json({ accessToken })
  } catch (error) {
    return NextResponse.json({
      error:
        'Failed to obtain access token, session may have expired please log in again',
    })
  }
})
