import * as jose from 'jose';

const SECRET = new TextEncoder().encode(process.env.JWT_SECRET);

export const signJWT = async (payload: jose.JWTPayload) => {
  const jwt = await new jose.SignJWT(payload)
    .setProtectedHeader({
      alg: 'HS256',
    })
    .sign(SECRET);

  return jwt;
};

export const verifyJWT = async (token: string) => {
  const jwt = await jose.jwtVerify(token, SECRET);

  return jwt.payload;
};
