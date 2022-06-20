import * as bcrypt from 'bcryptjs';

const crypto = (password: string, hash: string): boolean => {
  const response = bcrypt.compareSync(password, hash);
  return response;
}

export default crypto;