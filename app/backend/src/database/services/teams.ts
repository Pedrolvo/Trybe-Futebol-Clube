import ITeam from '../interfaces/teams';
import teams from '../models/teams';

class TeamServices {
  constructor(private models = teams) {}

  getAllTeams = async () => teams.findAll();

  getTeamById = async (id: number): Promise<ITeam | null> => {
    const team = teams.findOne({ where: { id } });

    return team;
  };
}

export default new TeamServices();