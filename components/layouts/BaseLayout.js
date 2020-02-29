import React, { Fragment } from "react";
import Header from "../shared/Header";
import Head from "next/head";

const BaseLayout = props => {
  const { children, className, isAuthenticated } = props;
  const headerType = props.headerType || "default";
  return (
    <>
      <Head>
        <title>Oleksandr Bodrov Blog</title>
        <script
          src="https://kit.fontawesome.com/d8626bf45c.js"
          crossOrigin="anonymous"
        ></script>
        <link
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
          rel="stylesheet"
        ></link>
      </Head>
      <div className="layout-container">
        <Header
          className={`port-nav-${headerType}`}
          isAuthenticated={isAuthenticated}
        />
        <main className={`cover ${className}`}>
          <div className="wrapper">{children}</div>
        </main>
      </div>
    </>
  );
};

export default BaseLayout;
