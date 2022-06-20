import matches from '../models/matches';
import Teams from '../models/teams';
import IMatch from '../interfaces/matches';

class MatchServices {
  constructor( private models = matches) {}

  async getAllMatches(): Promise<IMatch[]> {
    const games = await this.models.findAll({
      include: [
        {
          model: Teams,
          as: 'teamHome',
          attributes: { exclude: ['id'] },
        },
        {
          model: Teams,
          as: 'teamAway',
          attributes: { exclude: ['id'] },
        },
      ],
    });
    return games;
  }

  async getByProgress(inProgress: boolean | undefined): Promise<IMatch[]> {
    if (inProgress === undefined) {
      const all = await this.getAllMatches();

      return all;
    }

    const games = await this.models.findAll({
      where: { inProgress },
      include: [
        {
          model:Teams,
          as: 'teamHome',
          attributes: { exclude: ['id'] },
        },
        {
          model: Teams,
          as: 'teamAway',
          attributes: { exclude: ['id'] },
        },
      ],
    });
    return games;
  }
}

export default new MatchServices();