import React, { Component } from "react";
import BaseLayout from "../components/layouts/BaseLayout";

export default class SuperComponent extends Component {
  constructor() {
    super();

    this.someVariable = "Just a test";
  }

  alertName(title) {
    alert(title);
  }
  render() {
    return (
      <BaseLayout>
        <h1>Hello I am a Blogs Page!</h1>
      </BaseLayout>
    );
  }
}
