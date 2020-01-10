import auth0 from "auth0-js";
import Cookie from "js-cookie";
import jwt from "jsonwebtoken";
import axios from "axios";
import { getCookieFromRequest } from "../helpers/utils";

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

  // verifying JWT token with certificate (signature)
  // read more on this here: https://auth0.com/blog/navigating-rs256-and-jwks/
  verifyToken = async token => {
    if (token) {
      // decoding the token. complete true means that I also want headers in decoded form
      const decodedToken = jwt.decode(token, { complete: true });
      if (!decodedToken) return undefined;
      // requesting jeys set
      const jwks = await this.getJWKS();
      // the key is always at position 0
      const jwk = jwks.keys[0];
      // build certificate
      let cert = jwk.x5c[0];
      cert = cert.match(/.{1,64}/g).join("\n");
      cert = `-----BEGIN CERTIFICATE-----\n${cert}\n-----END CERTIFICATE-----\n`;

      // comparing server jwt with our cookie token? they must match
      if (jwk.kid === decodedToken.header.kid) {
        try {
          // performing a mission of this method, finally
          const verifiedToken = jwt.verify(token, cert);
          const expiresAt = verifiedToken.exp * 1000;
          // checking if jwt expires or not, phew...
          return verifiedToken && new Date().getTime() < expiresAt
            ? verifiedToken
            : undefined;
        } catch (er) {
          console.log("verifyToken error: ", er);
          return undefined;
        }
      }
    }
    return undefined;
  };

  clientAuth = async () => {
    const token = Cookie.getJSON("jwt");
    const verifiedToken = await this.verifyToken(token);

    return verifiedToken;
  };

  serverAuth = async req => {
    let token = getCookieFromRequest(req, "jwt");
    let verifiedToken = await this.verifyToken(token);
    return verifiedToken;
  };

  // getting JavaScritp Web Token Keys Set
  // details: https://auth0.com/blog/navigating-rs256-and-jwks/
  getJWKS = async () => {
    const res = await axios.get(
      "https://dev-4vh4q7if.eu.auth0.com/.well-known/jwks.json"
    );
    const jwks = res.data;
    return jwks;
  };
}

const Auth0Client = new auth0Client();

export default Auth0Client;
