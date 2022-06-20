import * as jwt from 'jsonwebtoken';
import * as fs from 'fs';
import { IToken } from '../interfaces/users';

const newToken = (payload: IToken): string => {
  const jwtConfig: jwt.SignOptions = {
    algorithm: 'HS256',
    expiresIn: '7d',
  };

  const key = fs.readFileSync('jwt.evaluation.key', 'utf8');
  
  const token = jwt.sign(payload, key, jwtConfig);

  return token;
};

const validateToken = async (token: string) => {
  const key = fs.readFileSync('jwt.evaluation.key', 'utf8');

  const decode = jwt.verify(token, key);

  return decode;
};

export { newToken, validateToken };
