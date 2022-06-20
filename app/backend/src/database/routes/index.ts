import * as express from 'express';

import routerLogin from './login';

const router - express.Router();

router.use('/login', routerLogin);

export default router;