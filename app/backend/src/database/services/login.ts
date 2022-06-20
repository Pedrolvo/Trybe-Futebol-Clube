import users from '../models/users';
import { IUser } from '../interfaces/users';
import { newToken } from '../helpers/token';
import crypto from '../helpers/cryptPassword';


class LoginService {
  constructor(private models = users) {}

  login = async (email: string, password: string): Promise<IUser | null> => {
    const user = await users.findOne({ where: { email } });
    if (!user) return null;

    const test = crypto(password, user.password);
    if (!test) return null;

    const token = newToken({ data: {role: user.role, id: user.id } });

    return {
      user: {
        id: user.id,
        username: user.username,
        role: user.role,
        email: user.email,
      },
      token,
    };
  };
}

export default new LoginService();