import React from "react";
import App from "next/app";
import Auth0Client from "../services/auth0";

import "../styles/main.scss";
import "bootstrap/dist/css/bootstrap.min.css";

const nameSpace = "http://localhost:3000";

class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};
    const user = await (process.browser
      ? Auth0Client.clientAuth()
      : Auth0Client.serverAuth(ctx.req));

    if (Component.getInitialProps)
      pageProps = await Component.getInitialProps(ctx);

    const isSiteOwner = user
      ? user[nameSpace + "/role"] === "siteOwner"
      : false;
    const auth = { user, isAuthenticated: !!user, isSiteOwner };
    return { pageProps, auth };
  }

  render() {
    const { Component, pageProps, auth } = this.props;
    return <Component auth={auth} {...pageProps} />;
  }
}

export default MyApp;
