import React, { Component } from "react";
import BaseLayout from "../components/layouts/BaseLayout";
import BasePage from "../components/BasePage";

export default class CV extends Component {
  render() {
    return (
      <BaseLayout>
        <BasePage>
          <h1>I am CV Page</h1>
        </BasePage>
      </BaseLayout>
    );
  }
}
