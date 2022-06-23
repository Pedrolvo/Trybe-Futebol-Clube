class MockLogin {
  public userModel: [
    {
      id: 1,
      username: 'Xablau',
      role: 'admin2',
      email: 'xablau@xablau.com',
      password: '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW',
    },
    {
      id: 2,
      username: 'Cleiton',
      role: 'admin',
      email: 'cleitin@ig.com'
      password: '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW',
    },
  ]

  public login = {
    email: 'cleitin@ig.com',
    password: 'secret_admin',
  }

  public loginValidate = 'admin';
}

export default new MockLogin();
