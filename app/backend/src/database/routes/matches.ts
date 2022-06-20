import express from 'express';

import MatchControllers from '../controllers/matches';

const routerMatch = express.Router();

routerMatch.get('/', MatchControllers.getByProgress);

export default routerMatch;