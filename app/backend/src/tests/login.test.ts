import sinon from 'sinon';
import chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import User from '../database/models/users';

import { app } from '../app';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Rota /login  ', () => {
  let chaiHttpResponse: Response;

  beforeEach(async () => {
    sinon
      .stub(User, 'findOne')
      .resolves( undefined );
  });

  afterEach(()=>{
    (User.findOne as sinon.SinonStub).restore();
  });

  it('email vazio', async () => {
    chaiHttpResponse = await chai
       .request(app)
       .post('/login')
       .send({
        email: '',
        password: 'secret_admin',
      }); 

    expect(chaiHttpResponse).to.have.status(400);
  });

  it('password vazio', async () => {
    chaiHttpResponse = await chai
       .request(app)
       .post('/login')
       .send({
        email: 'admin@admin.com',
        password: '',
      }); 

    expect(chaiHttpResponse).to.have.status(400);
  });

  it('email incorreto', async () => {
    chaiHttpResponse = await chai
       .request(app)
       .post('/login')
       .send({
        email: 'adminsssss@admin.com',
        password: 'secret_admin',
      }); 

    expect(chaiHttpResponse).to.have.status(401);
  });

  it('password incorreto', async () => {
    chaiHttpResponse = await chai
       .request(app)
       .post('/login')
       .send({
        email: 'admin@admin.com',
        password: 'secrssssset_admin',
      }); 

    expect(chaiHttpResponse).to.have.status(401);
  });
});