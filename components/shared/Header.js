import React, { Component, Fragment } from "react";
import Link from "next/link";

export default class Header extends Component {
  render() {
    return (
      <Fragment>
        <Link href="/about">
          <a>About</a>
        </Link>
        <br />
        <Link href="/blogs">
          <a>Blogs</a>
        </Link>
        <br />
        <Link href="/portfolios">
          <a>Porfolio</a>
        </Link>
        <br />
        <Link href="/cv">
          <a>CV</a>
        </Link>
      </Fragment>
    );
  }
}
