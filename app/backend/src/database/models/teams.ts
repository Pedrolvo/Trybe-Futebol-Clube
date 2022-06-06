import { Model, DataTypes } from 'sequelize';
import db from '.';
import matches from './matches';

class teams extends Model {
  teamName: string;
}
teams.init({
  teamName: DataTypes.STRING,
}, {
  sequelize: db,
  underscored: true,
  modelName: 'teams',
  timestamps: false,
});

matches.belongsTo(teams, {
  foreignKey: 'id',
  as: 'teams_home_team' 
});
matches.belongsTo(teams, {
  foreignKey: 'id',
  as: 'teams_away_team'
});

teams.hasMany(matches, {
  foreignKey: 'home_team',
  as: 'matches_home_team'
});
teams.hasMany(matches, {
  foreignKey: 'away_team',
  as: 'matches_away_team'
});

export default teams;