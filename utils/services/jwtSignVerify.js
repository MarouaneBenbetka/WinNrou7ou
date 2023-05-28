import { SignJWT, jwtVerify } from 'jose'

const secret = process.env.JWT_SECRET
export async function sign (payload, secret) {
  const iat = Math.floor(Date.now() / 1000)
  const exp = iat + 60 * 60 // one hour

  return new SignJWT({ payload })
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime(exp)
    .setIssuedAt(iat)
    .setNotBefore(iat)
    .sign(new TextEncoder().encode(secret))
}

export async function verify (token, secret) {
  const { payload } = await jwtVerify(token, secret)
  return payload
}
