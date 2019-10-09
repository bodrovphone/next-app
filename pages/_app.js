import React from 'react';
import App, { Container } from 'next/app';

import auth0Client from '../services/auth0';

// Stylings
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/main.scss';

class MyApp extends App {
  static async getInitialProps({ Component, router, ctx }) {
    let pageProps = {};
    // calls page's `getInitialProps` and fills `appProps.pageProps`

    const isAuthenticated = process.browser
      ? auth0Client.clientAuth()
      : auth0Client.serverAuth(ctx.req);

    console.log(isAuthenticated);
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }
    return { pageProps };
  }

  render() {
    const { Component, pageProps } = this.props;
    return <Component {...pageProps} />;
  }
}

export default MyApp;
