import * as express from 'express';

import loginController from '../controllers/login';
import loginValidation from '../middlewares/login';

const routerLogin = express.Router();

routerLogin.post('/', loginValidation, loginController.login);
routerLogin.get('/validate', loginController.validation);
export default routerLogin;