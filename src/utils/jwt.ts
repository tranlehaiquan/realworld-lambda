import jwt, { TokenExpiredError } from "jsonwebtoken";
import addMilliseconds from "date-fns/addMilliseconds";
import { UserExport } from "../entity/User";

const millisecondsInDay = 86400000;
const secondsOfDay = millisecondsInDay / 1000;

const options = {
  expiresIn: secondsOfDay,
};

export interface Token {
  token: string;
  exp: number;
}

/**
 * Sign jwt to get user access token
 * @param payload user info
 */
export const signJWT = async (payload: UserExport): Promise<Token> => {
  return new Promise((res, rej) => {
    jwt.sign(payload, process.env.JWT_TOKEN_KEY, options, (err, token) => {
      if (err) rej(err);
      res({
        token,
        exp: addMilliseconds(new Date(), millisecondsInDay).getTime(),
      });
    });
  });
};

export const verifyJWT = (token: string): Promise<UserExport> => {
  return new Promise((res, rej) => {
    jwt.verify(token, process.env.JWT_TOKEN_KEY, (err, decoded: UserExport) => {
      if (err) {
        let { message } = err;
        if (err instanceof TokenExpiredError)
          message = `Token expired at ${new Date(err.expiredAt).toUTCString()}`;
        const error = new Error(message);
        rej(error);
      }

      res(decoded);
    });
  });
};
