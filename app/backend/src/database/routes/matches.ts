import express from 'express';

import MatchControllers from '../controllers/matches';

const routerMatch = express.Router();

routerMatch.get('/', MatchControllers.getByProgress);
routerMatch.post('/', MatchControllers.createMatch);
routerMatch.patch('/:id/finish', MatchControllers.patchMatch);
routerMatch.patch('/:id', MatchControllers.patchById);

export default routerMatch;
