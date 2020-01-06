import React from "react";
import App from "next/app";
import Auth0Client from "../services/auth0";

import "../styles/main.scss";
import "bootstrap/dist/css/bootstrap.min.css";

class MyApp extends App {
  static async getInitialProps({ Component, router, ctx }) {
    let pageProps = {};
    const isAuthenticated = await (process.browser
      ? Auth0Client.clientAuth()
      : Auth0Client.serverAuth(ctx.req));

    console.log("isAuthenticated: ", isAuthenticated);

    if (Component.getInitialProps) pageProps = await App.getInitialProps(ctx);

    const auth = { isAuthenticated };
    return { pageProps, auth };
  }

  render() {
    const { Component } = this.props;
    return <Component auth={this.props.auth} />;
  }
}

export default MyApp;
