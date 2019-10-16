import React from "react";
import App, { Container } from "next/app";

import Auth0Client from "../services/auth0";

// Stylings
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/main.scss";

class MyApp extends App {
  static async getInitialProps({ Component, router, ctx }) {
    let pageProps = {};
    // calls page's `getInitialProps` and fills `appProps.pageProps`

    const user = process.browser
      ? Auth0Client.clientAuth()
      : Auth0Client.serverAuth(ctx.req);

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps, isAuthenticated: !!user };
  }

  render() {
    const { Component, pageProps, isAuthenticated } = this.props;
    return <Component {...pageProps} isAuthenticated={isAuthenticated} />;
  }
}

export default MyApp;
