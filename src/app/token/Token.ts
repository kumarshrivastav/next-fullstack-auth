// import jwt from "jsonwebtoken";
import * as jose from "jose";
class TokenService {
  async generateToken(payload: any) {
    const accessTokenSecret = new TextEncoder().encode(
      process.env.ACCESS_TOKEN_SECRET_KEY
    );
    const refreshTokenSecret = new TextEncoder().encode(
      process.env.REFRESH_TOKEN_SECRET_KEY
    );
    const accessToken = await new jose.SignJWT(payload)
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("1h")
      .sign(accessTokenSecret);
    const refreshToken = await new jose.SignJWT(payload)
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("10h")
      .sign(refreshTokenSecret);
    // const accessToken=await jwt.sign(payload,process.env.ACCESS_TOKEN_SECRET_KEY!,{expiresIn:'1h'})
    // const refreshToken=await jwt.sign(payload,process.env.REFRESH_TOKEN_SECRET_KEY!,{expiresIn:'1y'})
    return { accessToken, refreshToken };
  }
}
// eslint-disable-next-line
export default new TokenService();