import auth0 from 'auth0-js';
import Cookie from 'js-cookie';

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
        if (authResult && authResult.accessToken && authResult.idToken) {
          this.setSession(authResult);
          resolve();
        } else if (err) {
          reject();
          console.log(err);
        }
      });
    });
  };

  setSession = authResult => {
    const expiresAt = JSON.stringify(
      authResult.expiresIn * 1000 + new Date().getTime()
    );

    Cookie.set('user', authResult.idTokenPayload);
    Cookie.set('jwt', authResult.idToken);
    Cookie.set('expiresAt', expiresAt);
  };

  logout = () => {
    Cookie.remove('user');
    Cookie.remove('jwt');
    Cookie.remove('expiresAt');

    this.auth0.logout({
      returnTo: '',
      clientID: 'Yp4oRNsPjRxBSVyZRzTm8B6sefH382Zx'
    });
  };

  isAuthenticated = () => {
    const expiresAt = Cookie.getJSON('expiresAt');
    return new Date().getTime() < expiresAt;
  };

  clientAuth = () => this.isAuthenticated();

  serverAuth = req => {
    let expiresAtCookie;
    if (req.headers && req.headers.cookie) {
      expiresAtCookie = req.headers.cookie
        .split(';')
        .find(c => c.trim().startsWith('expiresAt='));
    }
    if (!expiresAtCookie) {
      return undefined;
    }
    const expiresAt = expiresAtCookie.split('=')[1];
    return new Date().getTime() < expiresAt;
  };
}

const auth0Client = new Auth0();

export default auth0Client;
