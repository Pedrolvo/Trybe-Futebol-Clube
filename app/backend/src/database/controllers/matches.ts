import { Request, Response, NextFunction } from 'express';
import MatchServices from '../services/matches';

class MatchControllers {
  getByProgress = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { inProgress } = req.query;
      const boolean = inProgress === 'true';
      const result = inProgress ? boolean : undefined;
      const games = await MatchServices.getByProgress(result);

      return res.status(200).json(games);
    } catch (err) {
      next(err);
    }
  };

  createMatch = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { authorization } = req.headers;
      const { homeTeam, homeTeamGoals, awayTeam, awayTeamGoals, inProgress } = req.body;

      const newMatch = await MatchServices.createMatch({
        homeTeam, homeTeamGoals, awayTeam, awayTeamGoals, inProgress }, authorization as string);
      if (!newMatch) {
        return res.status(401)
          .json({ message: 'It is not possible to create a match with two equal teams' });
      }
      if (newMatch === true) {
        return res.status(404)
          .json({ message: 'There is no team with such id!' });
      }
      return res.status(201).json(newMatch);
    } catch (err) {
      next(err);
    }
  };

  patchMatch = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;

      const pkPatch = await MatchServices.patchMatch(Number(id));
      if (!pkPatch) {
        return res.status(404).json({ message: 'ERROR' });
      }

      return res.status(200).json({ message: 'Finished' });
    } catch (err) {
      next(err);
    }
  };

  patchById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const { homeTeamGoals, awayTeamGoals } = req.body;

      const pkPatch = await MatchServices
        .patchById(Number(homeTeamGoals), Number(awayTeamGoals), Number(id));
      if (!pkPatch) return res.status(404).json({ message: 'ERROR' });

      return res.status(200).json({ message: 'Finished' });
    } catch (err) {
      next(err);
    }
  };
}

export default new MatchControllers();
