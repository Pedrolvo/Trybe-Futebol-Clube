import sortArray = require('sort-array');
import Matches from '../models/matches';
import Teams from '../models/teams';

class LeaderBoardHomeServices {
  constructor(
    private matchesModel = Matches,
    private teamsModel = Teams,
  ) {}

  static victories = (matches: Matches[]) => matches
    .reduce((acc, curr) => (curr.homeTeamGoals > curr.awayTeamGoals ? acc + 1 : acc), 0);

  static losses = (matches: Matches[]) => matches
    .reduce((acc, curr) => (curr.homeTeamGoals < curr.awayTeamGoals ? acc + 1 : acc), 0);

  static draws = (matches: Matches[]) => matches
    .reduce((acc, curr) => (curr.homeTeamGoals === curr.awayTeamGoals ? acc + 1 : acc), 0);

  static totalPoints = (matches: Matches[]) => {
    const victories = this.victories(matches) * 3;
    const draws = this.draws(matches);

    return victories + draws;
  };

  static goalsFavor = (matches: Matches[]) => matches
    .reduce((acc, curr) => (acc + curr.homeTeamGoals), 0);

  static goalsOwn = (matches: Matches[]) => matches
    .reduce((acc, curr) => (acc + curr.awayTeamGoals), 0);

  static goalsBalance = (matches: Matches[]) => {
    const goalsF = this.goalsFavor(matches);
    const goalsO = this.goalsOwn(matches);
    return goalsF - goalsO;
  };

  static efficiency = (matches: Matches[]) => {
    const totalP = this.totalPoints(matches);
    return ((totalP / (matches.length * 3)) * 100).toFixed(2);
  };

  static leaderBoard(matches: Matches[]) {
    return {
      totalPoints: this.totalPoints(matches),
      totaGames: matches.length,
      totalVictories: this.victories(matches),
      totalDraws: this.draws(matches),
      totalLosses: this.losses(matches),
      goalsFavor: this.goalsFavor(matches),
      goalsOwn: this.goalsOwn(matches),
      goalsBalance: this.goalsBalance(matches),
      efficiency: this.efficiency(matches),
    };
  }

  boardHome = async () => {
    const allTeams = await this.teamsModel.findAll();
    const putInBoard = allTeams.map(async (t) => {
      const matches = await this.matchesModel
        .findAll({ where: { homeTeam: t.id, inProgress: false } });
      const board = LeaderBoardHomeServices.leaderBoard(matches);

      return {
        name: t.teamName,
        ...board,
      };
    });

    const finalBoard = await Promise.all(putInBoard);
    const keys = ['totalPoints', 'totalVictories', 'goalsBalance', 'goalsFavor', 'goalsOwn'];
    const order = ['desc', 'desc', 'desc', 'desc', 'desc'];

    return sortArray(finalBoard, { by: keys, order });
  };
}

export default new LeaderBoardHomeServices();
