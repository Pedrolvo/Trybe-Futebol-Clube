import * as chai from 'chai';
import * as sinon from 'sinon';
import { Response } from 'superagent';
import { app } from '../app';
import Matches from '../database/models/matches';
// @ts-ignore
import chaiHttp = require('chai-http');

const mockedMatch = [
	{
		"id": 1,
		"homeTeam": 18,
		"homeTeamGoals": 3,
		"awayTeam": 7,
		"awayTeamGoals": 4,
		"inProgress": false,
		"teamHome": {
			"teamName": "Flamengo"
		},
		"teamAway": {
			"teamName": "Grêmio"
		}
	}
]

chai.use(chaiHttp);

const { expect } = chai;

describe('Rota /matches', () => {

  let chaiHttpResponse: Response;

  beforeEach(async () => {
    sinon
      .stub(Matches, "findAll")
      .resolves(
        mockedMatch as unknown as Matches[]);
  });

  afterEach(()=>{
    (Matches.findAll as sinon.SinonStub).restore();
  })

  it('Retorna o status correto', async () => {
    chaiHttpResponse = await chai.request(app).get('/matches');
    expect(chaiHttpResponse).to.have.status(200);
  });
});