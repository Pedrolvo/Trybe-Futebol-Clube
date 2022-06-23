import express from 'express';

import LeaderBoardContollers from '../controllers/leaderBoardHome';
import LeaderBoardControllers from '../controllers/leaderBoardAway';

const routerLeaderBoard = express.Router();

routerLeaderBoard.get('/home', LeaderBoardContollers.getAll);
routerLeaderBoard.get('/away', LeaderBoardControllers.getAll);

export default routerLeaderBoard;
