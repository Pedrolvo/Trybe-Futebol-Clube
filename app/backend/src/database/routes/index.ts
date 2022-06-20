import * as express from 'express';

import routerLogin from './login';
import routerTeam from './teams';

const router = express.Router();

router.use('/login', routerLogin);
router.use('/teams', routerTeam);

export default router;