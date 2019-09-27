import auth0 from 'auth0-js';

class Auth0 {
  constructor() {
    this.auth0 = new auth0.WebAuth({
      domain: 'dev-4vh4q7if.eu.auth0.com',
      clientID: 'Yp4oRNsPjRxBSVyZRzTm8B6sefH382Zx',
      redirectUri: 'http://localhost:3000/callback',
      responseType: 'token id_token',
      scope: 'openid profile'
    });
  }

  Login = () => {
    this.auth0.authorize();
  };
}

const auth0Client = new Auth0();

export default auth0Client;
