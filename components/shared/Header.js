import React, { Component, Fragment } from "react";
import Link from "next/link";
import "../../styles/main.scss";

export default class Header extends Component {
  render() {
    return (
      <Fragment>
        <p className="custom">I am styled p element</p>
        <p className="customClassFromFile">I am styled p element</p>
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
        <style jsx>
          {`
            a {
              font-size: 20px;
            }
          `}
        </style>
      </Fragment>
    );
  }
}
