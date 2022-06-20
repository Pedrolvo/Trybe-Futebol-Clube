import express from 'express';

import TeamControllers from '../controllers/teams';

const routerTeam = express.Router();

routerTeam.get('/', TeamControllers.getAllTeams);
routerTeam.get('/:id', TeamControllers.getTeamById);

export default routerTeam;