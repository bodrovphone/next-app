import React, { Component, Fragment } from "react";
import Link from "next/link";
import { Link as NextLink } from "../../routes";

export default class Header extends Component {
  render() {
    return (
      <Fragment>
        <Link href="/">
          <a>Home</a>
        </Link>
        <Link href="/about">
          <a>About</a>
        </Link>
        <Link href="/blogs">
          <a>Blogs</a>
        </Link>
        <Link href="/portfolios">
          <a>Porfolio</a>
        </Link>
        <Link href="/cv">
          <a>CV</a>
        </Link>
        <NextLink route="/test/2" params={{ id: "2" }}>
          <a>Test 2</a>
        </NextLink>
        <NextLink route="/test/5" params={{ id: "5" }}>
          <a>Test 5</a>
        </NextLink>
        <style jsx>
          {`
            a {
              font-size: 20px;
              margin: 0 5px;
            }
          `}
        </style>
      </Fragment>
    );
  }
}
