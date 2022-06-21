import matches from '../models/matches';
import Teams from '../models/teams';
import { ICreateMatch, IMatch } from '../interfaces/matches';
import LoginServices from './login';
import TeamServices from './teams';

class MatchServices {
  constructor(private models = matches) {}

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

    const games = await this.models.findAll({ where: { inProgress },
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
        }],
    });
    return games;
  }

  async createMatch(macthInfo: ICreateMatch, token: string):
  Promise<ICreateMatch | null | boolean> {
    const validate = await LoginServices.validation(token);

    if (!validate) return null;

    const { homeTeam, homeTeamGoals, awayTeam, awayTeamGoals, inProgress } = macthInfo;

    if (homeTeam === awayTeam) return false;

    const nullIdTeam = [homeTeam, awayTeam]
      .map((id) => TeamServices.getTeamById(id));
    const resultNullId = await Promise.all(nullIdTeam);
    if (resultNullId.includes(null)) return true;
    const newMatch = await this.models.create({
      homeTeam,
      homeTeamGoals,
      awayTeam,
      awayTeamGoals,
      inProgress });

    return newMatch;
  }

  async patchMatch(id: number): Promise<boolean> {
    const pkPatch = await this.models.findByPk(id);
    if (!pkPatch) return false;

    await this.models.update({ inProgress: false }, { where: { id } });
    return true;
  }

  async patchById(homeTeamGoals: number, awayTeamGoals: number, id: number): Promise<boolean> {
    const pkPatch = await this.models.findByPk(id);
    if (!pkPatch) return false;

    await this.models.update({ homeTeamGoals, awayTeamGoals }, { where: { id } });

    return true;
  }
}

export default new MatchServices();
