import React from "react";
import App, { Container } from "next/app";

import Auth0Client from "../services/auth0";

// Stylings
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/main.scss";

class MyApp extends App {
  static async getInitialProps({ Component, router, ctx }) {
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }
    let pageProps = {};

    const user = process.browser
      ? await Auth0Client.clientAuth()
      : await Auth0Client.serverAuth(ctx.req);

    console.log("user: ", user);
    const auth = { user, isAuthenticated: !!user };

    return { pageProps, auth };
  }

  render() {
    console.log("process", process);
    const { Component, pageProps, auth } = this.props;
    return <Component {...pageProps} auth={auth} />;
  }
}

export default MyApp;
