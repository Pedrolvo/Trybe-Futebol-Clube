import { Request, Response, NextFunction } from 'express';
import teams from '../services/teams';
import TeamServices from '../services/teams';

class TeamControllers {
  getAllTeams = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const teams = await TeamServices.getAllTeams();

      return res.status(200).json(teams);
    } catch (err) {
      next(err);
    }
  };

  getTeamById = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    try {
      const team = await TeamServices.getTeamById(Number(id));

      return res.status(200).json(team);
    } catch (err) {
      next(err);
    }
  };
}

export default new TeamControllers();