import { auth } from "express-oauth2-jwt-bearer";

// This handler function will invoke a token bearer check via Auth0 service
export const jwtCheck = auth({
  audience: process.env.AUTH0_AUDIENCE,
  issuerBaseURL: process.env.AUTH0_ISSUER_BASE_URL,
  tokenSigningAlg: 'RS256'
});
