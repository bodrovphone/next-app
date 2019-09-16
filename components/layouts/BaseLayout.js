import React, { Fragment } from "react";
import Header from "../shared/Header";

export default function BaseLayout(props) {
  return (
    <Fragment>
      <Header />
      {props.children}
    </Fragment>
  );
}
