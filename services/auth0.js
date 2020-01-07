import auth0 from "auth0-js";
import Cookie from "js-cookie";
import jwt from "jsonwebtoken";

class auth0Client {
  constructor() {
    this.auth0 = new auth0.WebAuth({
      domain: "dev-4vh4q7if.eu.auth0.com",
      clientID: "Yp4oRNsPjRxBSVyZRzTm8B6sefH382Zx",
      redirectUri: "http://localhost:3000/callback",
      responseType: "token id_token",
      scope: "openid profile"
    });
  }

  Login = () => {
    this.auth0.authorize();
  };

  handleAuthentication = () => {
    return new Promise((resolve, reject) => {
      this.auth0.parseHash((err, authResult) => {
        if (authResult && authResult.accessToken && authResult.idToken) {
          this.setSession(authResult);
          resolve();
        } else if (err) {
          reject(err);
          console.log(err);
        }
      });
    });
  };

  setSession = authResult => {
    const expiresAt = JSON.stringify(
      authResult.expiresIn * 1000 + new Date().getTime()
    );

    Cookie.set("user", authResult.idTokenPayload);
    Cookie.set("jwt", authResult.idToken);
    Cookie.set("expiresAt", expiresAt);
  };

  logout = () => {
    Cookie.remove("user");
    Cookie.remove("jwt");
    Cookie.remove("expiresAt");

    this.auth0.logout({
      returnTo: "",
      clientID: "Yp4oRNsPjRxBSVyZRzTm8B6sefH382Zx"
    });
  };

  verifyToken = token => {
    let decodedToken;
    let expiresAt;
    if (token) {
      decodedToken = jwt.decode(token);
      expiresAt = decodedToken.exp * 1000;
    }

    return decodedToken && new Date().getTime() < expiresAt
      ? decodedToken
      : undefined;
  };

  clientAuth = () => {
    const token = Cookie.getJSON("jwt");
    const verifiedToken = this.verifyToken(token);

    return verifiedToken;
  };

  serverAuth = req => {
    let tokenCookie;
    let verifiedToken;
    if (req.headers && req.headers.cookie) {
      tokenCookie = req.headers.cookie
        .split(";")
        .find(c => c.trim().startsWith("jwt="));

      const token = tokenCookie && tokenCookie.split("=")[1];

      verifiedToken = this.verifyToken(token);
    }
    return verifiedToken;
  };
}

const Auth0Client = new auth0Client();

export default Auth0Client;
