import React from "react";
import App from "next/app";

import "../styles/main.scss";
import "bootstrap/dist/css/bootstrap.min.css";

class MyApp extends App {
  static async getInitialProps(appContext) {
    const appProps = await App.getInitialProps(appContext);

    return { ...appProps };
  }

  render() {
    const { Component, pageProps } = this.props;
    return <Component {...pageProps} />;
  }
}

export default MyApp;
