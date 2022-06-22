import express from 'express';

import LeaderBoardContollers from '../controllers/leaderBoardHome';

const routerLeaderBoard = express.Router();

routerLeaderBoard.get('/home', LeaderBoardContollers.getAll);

export default routerLeaderBoard;
