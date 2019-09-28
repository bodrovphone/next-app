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

  HandleAuthentication = () => {
    return new Promise((resolve, reject) => {
      this.auth0.parseHash((err, authResult) => {
        if (authResult && authResult.successToken && authResult.idToken) {
          this.setSession(authResult);
          resolve();
        } else if (err) {
          reject();
          console.log(err);
        }
      });
    });
  };

  setSession = () => {
    // Save Tokens
  };
}

const auth0Client = new Auth0();

export default auth0Client;
