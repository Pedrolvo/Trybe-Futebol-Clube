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
}

export default new MatchControllers();