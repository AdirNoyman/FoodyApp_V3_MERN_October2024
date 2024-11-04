import { Request, Response, NextFunction } from 'express';
import { auth } from 'express-oauth2-jwt-bearer';
import jwt from 'jsonwebtoken';
import User from '../models/user';

declare global {
  namespace Express {
    interface Request {
      userId: string;
      auth0Id: string;
    }
  }
}

// Middleware //////////////////////////////////

// This handler function will invoke a token bearer check via Auth0 service. This will validate that the token the user provided, really came from Auth0
export const jwtCheck = auth({
  audience: process.env.AUTH0_AUDIENCE,
  issuerBaseURL: process.env.AUTH0_ISSUER_BASE_URL,
  tokenSigningAlg: 'RS256',
});

export const jwtParse = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { authorization } = req.headers;

  // Check if user authorized
  if (!authorization || !authorization.startsWith('Bearer')) {
    return res.sendStatus(401);
  }

  // Get the user's access token
  const token = authorization.split(' ')[1];

  try {
    const tokenDecoded = jwt.decode(token) as jwt.JwtPayload;

    // Get the users Auth0 Id from the access token
    const auth0Id = tokenDecoded.sub;

    // Find the user in our mongoDb, based on the Auth0Id
    const user = await User.findOne({ auth0Id });

    if (!user) {
      console.log('User was not found in our DB');
      return res.sendStatus(401);
    }

    // Add the user Auth0Id and the MongoDb user Id to the request object
    req.auth0Id = auth0Id as string;
    req.userId = user._id.toString();
    next();
  } catch (error) {
    console.log("Error decoding user's token 😫");
    return res.sendStatus(401);
  }
};
