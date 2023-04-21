import { jwtVerify, SignJWT } from "jose";

interface UserJwtPayload {
  jti: string;
  iat: number;
}

export const getJwtSecretkey = () => {
  const secret = process.env.NEXTAUTH_JWT_SECRET;

  if (!secret || secret.length === 0) {
    throw new Error("The enviroment  variable NEXTAUTH_JWT_SECRET is not set");
  }
  return secret;
};
export const verifyAuth = async (token: string) => {
  try {
    const verified = await jwtVerify(
      token,
      new TextEncoder().encode(getJwtSecretkey())
    );
    return verified.payload as UserJwtPayload;
  } catch (err) {
    throw new Error("Your token has expired");
  }
};

export default verifyAuth;
