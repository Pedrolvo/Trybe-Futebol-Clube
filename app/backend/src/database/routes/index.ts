import * as express from 'express';

import routerLogin from './login';
import routerTeam from './teams';
import routerMatch from './matches';

const router = express.Router();

router.use('/login', routerLogin);
router.use('/teams', routerTeam);
router.use('/matches', routerMatch);

export default router;