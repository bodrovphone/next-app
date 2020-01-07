import React from "react";
import App from "next/app";
import Auth0Client from "../services/auth0";

import "../styles/main.scss";
import "bootstrap/dist/css/bootstrap.min.css";

class MyApp extends App {
  static async getInitialProps({ Component, router, ctx }) {
    let pageProps = {};
    const user = await (process.browser
      ? Auth0Client.clientAuth()
      : Auth0Client.serverAuth(ctx.req));

    if (Component.getInitialProps)
      pageProps = await Component.getInitialProps(ctx);

    const auth = { user, isAuthenticated: !!user };
    return { pageProps, auth };
  }

  render() {
    const { Component, pageProps, auth } = this.props;
    return <Component auth={auth} {...pageProps} />;
  }
}

export default MyApp;
