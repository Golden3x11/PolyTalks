import { OAuth2Client } from 'google-auth-library';
import { ForbiddenException } from '@nestjs/common';

export async function decodeToken(token: string): Promise<DecodedToken> {
  // TODO: extract client id
  const client = new OAuth2Client('407712005402-sumiqjgamkhccs0flh9o6p26gijrmepn.apps.googleusercontent.com');

  return await client.verifyIdToken({
    idToken: token,
    audience: '407712005402-sumiqjgamkhccs0flh9o6p26gijrmepn.apps.googleusercontent.com',
  }).then((ticket) => {
      const payload = ticket.getPayload()
      return {
        "email": payload["email"],
        "name": payload["name"]
      }
  }).catch(() => {
    throw new ForbiddenException("Token is invalid!");
  });
}

interface DecodedToken {
  email: string,
  name: string
}