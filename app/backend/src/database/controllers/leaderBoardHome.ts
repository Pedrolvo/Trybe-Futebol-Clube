import { Request, Response, NextFunction } from 'express';
import LeaderBoardHomeServices from '../services/leaderBoardHome';

class LeaderBoardContollers {
  getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const leaderBoard = await LeaderBoardHomeServices.boardHome();
      return res.status(200).json(leaderBoard);
    } catch (err) {
      next(err);
    }
  };
}

export default new LeaderBoardContollers();
