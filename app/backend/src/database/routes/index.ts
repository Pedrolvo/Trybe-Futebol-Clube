import * as express from 'express';

import routerLogin from './login';
import routerTeam from './teams';
import routerMatch from './matches';
import routerLeaderBoard from './leaderBoards';

const router = express.Router();

router.use('/login', routerLogin);
router.use('/teams', routerTeam);
router.use('/matches', routerMatch);
router.use('/leaderboard', routerLeaderBoard);

export default router;
