import { Model, DataTypes } from 'sequelize';
import db from '.';
import matches from './matches';

class teams extends Model {
  id: number;
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
  foreignKey: 'home_team',
  as: 'teamHome' 
});
matches.belongsTo(teams, {
  foreignKey: 'away_team',
  as: 'teamAway'
});

teams.hasMany(matches, {
  foreignKey: 'home_team',
  as: 'teamhome'
});
teams.hasMany(matches, {
  foreignKey: 'away_team',
  as: 'teamAway'
});

export default teams;