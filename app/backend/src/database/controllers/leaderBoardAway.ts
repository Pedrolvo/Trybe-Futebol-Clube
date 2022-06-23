import { Request, Response, NextFunction } from 'express';
import LeaderBoardAwayServices from '../services/leaderBoardAway';

class LeaderBoardContollers {
  getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const leaderBoard = await LeaderBoardAwayServices.boardAway();
      return res.status(200).json(leaderBoard);
    } catch (err) {
      next(err);
    }
  };
}

export default new LeaderBoardContollers();
