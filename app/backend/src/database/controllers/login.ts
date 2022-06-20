import { Request, Response, NextFunction } from 'express';
import loginService from '../services/login';

class LoginController {
  login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password } = req.body;
      const sign = await loginService.login(email, password);

      if (!sign) {
        return res.status(401).json({ message: 'Incorrect email or password' });
      }

      return res.status(200).json(sign);
    } catch (err) {
      next (err);
    }
  };
}

export default new LoginController();